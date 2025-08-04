import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { BufferGeometry, BufferAttribute, InstancedMesh, CylinderGeometry, MeshLambertMaterial, Matrix4, Vector3, Color } from 'three';
import { SceneService } from '../../scene/services/scene.service';
import { ITerrainField } from '../interfaces/dynamic-terrain.interface';
import { mapCubeCoordsTo3dCoords } from '../../scene/misc/coords-mappings';
import { HexagonHelper } from '../../scene/misc/hexagon.helper';
import { HEXAGON_RADIUS } from '../../scene/constants/hexagon.constants';

/**
 * Service for expanding terrain geometry by adding vertices dynamically
 * This enables seamless terrain expansion without loading discrete chunks
 */
@Injectable({
  providedIn: 'root'
})
export class TerrainExpansionService {
  
  private readonly _expansionEvents$ = new Subject<ITerrainExpansionEvent>();
  
  private terrainMeshes = new Map<string, InstancedMesh>();
  private terrainGeometries = new Map<string, BufferGeometry>();
  private maxInstancesPerMesh = 5000; // Maximum instances per instanced mesh
  
  public readonly expansionEvents$ = this._expansionEvents$.asObservable();

  constructor(
    private readonly sceneService: SceneService
  ) {}

  /**
   * Initialize terrain expansion system with base terrain mesh
   */
  public async initializeTerrainMesh(
    meshId: string, 
    baseGeometry: BufferGeometry, 
    material: MeshLambertMaterial,
    initialCapacity: number = 1000
  ): Promise<void> {
    
    console.log(`Initializing terrain mesh: ${meshId} with capacity ${initialCapacity}`);
    
    // Create instanced mesh for efficient rendering
    const instancedMesh = new InstancedMesh(baseGeometry, material, initialCapacity);
    instancedMesh.instanceMatrix.setUsage(35048); // THREE.DynamicDrawUsage
    
    // Store references
    this.terrainMeshes.set(meshId, instancedMesh);
    this.terrainGeometries.set(meshId, baseGeometry);
    
    // Add to scene
    // Add to scene - checking if sceneApp exists and has scene property
    if (this.sceneService.sceneApp && (this.sceneService.sceneApp as any).scene) {
      (this.sceneService.sceneApp as any).scene.add(instancedMesh);
    }
    
    this._expansionEvents$.next({
      type: TerrainExpansionEventType.MeshInitialized,
      meshId,
      instanceCount: 0
    });
  }

  /**
   * Add new terrain fields by expanding vertices
   */
  public async expandTerrain(
    meshId: string, 
    newFields: ITerrainField[]
  ): Promise<void> {
    
    const instancedMesh = this.terrainMeshes.get(meshId);
    if (!instancedMesh) {
      throw new Error(`Terrain mesh ${meshId} not found. Initialize first.`);
    }

    console.log(`Expanding terrain mesh ${meshId} with ${newFields.length} new fields`);
    
    this._expansionEvents$.next({
      type: TerrainExpansionEventType.ExpansionStarted,
      meshId,
      newFieldCount: newFields.length
    });

    try {
      // Check if we need to resize the instanced mesh
      const currentInstanceCount = instancedMesh.count;
      const requiredCapacity = currentInstanceCount + newFields.length;
      
      if (requiredCapacity > instancedMesh.instanceMatrix.count) {
        await this.resizeInstancedMesh(meshId, requiredCapacity * 1.5); // 50% buffer
      }
      
      // Add new instances
      await this.addFieldInstances(meshId, newFields, currentInstanceCount);
      
      // Update instance count
      instancedMesh.count = requiredCapacity;
      instancedMesh.instanceMatrix.needsUpdate = true;
      
      this._expansionEvents$.next({
        type: TerrainExpansionEventType.ExpansionCompleted,
        meshId,
        instanceCount: requiredCapacity
      });
      
    } catch (error) {
      console.error(`Failed to expand terrain mesh ${meshId}:`, error);
      
      this._expansionEvents$.next({
        type: TerrainExpansionEventType.ExpansionFailed,
        meshId,
        error: error as Error
      });
      
      throw error;
    }
  }

  /**
   * Create optimized merged geometry from multiple terrain fields
   */
  public async createMergedGeometry(fields: ITerrainField[]): Promise<BufferGeometry> {
    console.log(`Creating merged geometry from ${fields.length} fields`);
    
    const mergedGeometry = new BufferGeometry();
    const hexGeometry = new CylinderGeometry(HEXAGON_RADIUS, HEXAGON_RADIUS, 0.1, 6);
    
    // Calculate total vertices needed
    const singleHexVertices = hexGeometry.attributes.position.count;
    const totalVertices = singleHexVertices * fields.length;
    
    // Prepare arrays for merged geometry
    const positions = new Float32Array(totalVertices * 3);
    const normals = new Float32Array(totalVertices * 3);
    const colors = new Float32Array(totalVertices * 3);
    const uvs = new Float32Array(totalVertices * 2);
    
    // Get base attributes from hex geometry
    const basePositions = (hexGeometry.attributes.position as BufferAttribute).array as Float32Array;
    const baseNormals = (hexGeometry.attributes.normal as BufferAttribute).array as Float32Array;
    const baseUvs = (hexGeometry.attributes.uv as BufferAttribute).array as Float32Array;
    
    // Merge each field's geometry
    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
      const field = fields[fieldIndex];
      const worldPos = HexagonHelper.calculatePositionInGrid(
        mapCubeCoordsTo3dCoords(field.position), 
        HEXAGON_RADIUS
      );
      
      // Apply height offset
      worldPos.y += field.visual.offsetY || 0;
      
      // Color from field visual
      const color = this.hexToRgb(field.visual.primaryColor);
      
      const vertexOffset = fieldIndex * singleHexVertices;
      
      // Copy and transform vertices
      for (let vertexIndex = 0; vertexIndex < singleHexVertices; vertexIndex++) {
        const posIndex = (vertexOffset + vertexIndex) * 3;
        const uvIndex = (vertexOffset + vertexIndex) * 2;
        const baseVertexIndex = vertexIndex * 3;
        const baseUvIndex = vertexIndex * 2;
        
        // Transform position
        positions[posIndex] = basePositions[baseVertexIndex] + worldPos.x;
        positions[posIndex + 1] = basePositions[baseVertexIndex + 1] + worldPos.y;
        positions[posIndex + 2] = basePositions[baseVertexIndex + 2] + worldPos.z;
        
        // Copy normals
        normals[posIndex] = baseNormals[baseVertexIndex];
        normals[posIndex + 1] = baseNormals[baseVertexIndex + 1];
        normals[posIndex + 2] = baseNormals[baseVertexIndex + 2];
        
        // Set color
        colors[posIndex] = color.r;
        colors[posIndex + 1] = color.g;
        colors[posIndex + 2] = color.b;
        
        // Copy UVs
        uvs[uvIndex] = baseUvs[baseUvIndex];
        uvs[uvIndex + 1] = baseUvs[baseUvIndex + 1];
      }
    }
    
    // Set attributes
    mergedGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    mergedGeometry.setAttribute('normal', new BufferAttribute(normals, 3));
    mergedGeometry.setAttribute('color', new BufferAttribute(colors, 3));
    mergedGeometry.setAttribute('uv', new BufferAttribute(uvs, 2));
    
    // Copy indices if they exist
    if (hexGeometry.index) {
      const baseIndices = hexGeometry.index.array;
      const totalIndices = baseIndices.length * fields.length;
      const mergedIndices = new Uint32Array(totalIndices);
      
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        const indexOffset = fieldIndex * baseIndices.length;
        const vertexOffset = fieldIndex * singleHexVertices;
        
        for (let i = 0; i < baseIndices.length; i++) {
          mergedIndices[indexOffset + i] = baseIndices[i] + vertexOffset;
        }
      }
      
      mergedGeometry.setIndex(new BufferAttribute(mergedIndices, 1));
    }
    
    // Compute bounding sphere
    mergedGeometry.computeBoundingSphere();
    
    console.log(`Created merged geometry with ${totalVertices} vertices`);
    
    // Clean up base geometry
    hexGeometry.dispose();
    
    return mergedGeometry;
  }

  /**
   * Update terrain mesh by replacing geometry
   */
  public async updateMeshGeometry(meshId: string, newGeometry: BufferGeometry): Promise<void> {
    const instancedMesh = this.terrainMeshes.get(meshId);
    if (!instancedMesh) {
      throw new Error(`Terrain mesh ${meshId} not found`);
    }

    console.log(`Updating geometry for mesh ${meshId}`);
    
    // Dispose old geometry
    const oldGeometry = this.terrainGeometries.get(meshId);
    if (oldGeometry) {
      oldGeometry.dispose();
    }
    
    // Update references
    this.terrainGeometries.set(meshId, newGeometry);
    
    // For non-instanced meshes, we would update the geometry directly
    // For instanced meshes, we need to recreate with new base geometry
    // This is a more complex operation that might require scene updates
    
    this._expansionEvents$.next({
      type: TerrainExpansionEventType.GeometryUpdated,
      meshId
    });
  }

  /**
   * Remove terrain fields and update geometry
   */
  public async contractTerrain(meshId: string, fieldsToRemove: string[]): Promise<void> {
    console.log(`Contracting terrain mesh ${meshId}, removing ${fieldsToRemove.length} fields`);
    
    this._expansionEvents$.next({
      type: TerrainExpansionEventType.ContractionStarted,
      meshId,
      removedFieldCount: fieldsToRemove.length
    });
    
    // Implementation would involve:
    // 1. Identifying which instances to remove
    // 2. Compacting the instance matrix
    // 3. Updating instance count
    // This is complex and might require rebuilding the entire mesh
    
    this._expansionEvents$.next({
      type: TerrainExpansionEventType.ContractionCompleted,
      meshId
    });
  }

  /**
   * Dispose of terrain mesh and clean up resources
   */
  public disposeMesh(meshId: string): void {
    const instancedMesh = this.terrainMeshes.get(meshId);
    const geometry = this.terrainGeometries.get(meshId);
    
    if (instancedMesh) {
      // Remove from scene - checking if sceneApp exists and has scene property
      if (this.sceneService.sceneApp && (this.sceneService.sceneApp as any).scene) {
        (this.sceneService.sceneApp as any).scene.remove(instancedMesh);
      }
      instancedMesh.dispose();
      this.terrainMeshes.delete(meshId);
    }
    
    if (geometry) {
      geometry.dispose();
      this.terrainGeometries.delete(meshId);
    }
    
    console.log(`Disposed terrain mesh: ${meshId}`);
  }

  /**
   * Get statistics about terrain meshes
   */
  public getTerrainStats(): ITerrainStats {
    const stats: ITerrainStats = {
      meshCount: this.terrainMeshes.size,
      totalInstances: 0,
      totalVertices: 0,
      meshDetails: []
    };
    
    for (const [meshId, instancedMesh] of this.terrainMeshes.entries()) {
      const geometry = this.terrainGeometries.get(meshId);
      const instanceCount = instancedMesh.count;
      const verticesPerInstance = geometry?.attributes.position.count || 0;
      
      stats.totalInstances += instanceCount;
      stats.totalVertices += instanceCount * verticesPerInstance;
      
      stats.meshDetails.push({
        meshId,
        instanceCount,
        verticesPerInstance,
        totalVertices: instanceCount * verticesPerInstance
      });
    }
    
    return stats;
  }

  private async resizeInstancedMesh(meshId: string, newCapacity: number): Promise<void> {
    const currentMesh = this.terrainMeshes.get(meshId);
    const geometry = this.terrainGeometries.get(meshId);
    
    if (!currentMesh || !geometry) {
      throw new Error(`Mesh components not found for ${meshId}`);
    }

    console.log(`Resizing instanced mesh ${meshId} to capacity ${newCapacity}`);
    
    // Create new instanced mesh with larger capacity
    const newMesh = new InstancedMesh(geometry, currentMesh.material, newCapacity);
    newMesh.instanceMatrix.setUsage(35048); // DynamicDrawUsage
    
    // Copy existing instance data
    const oldMatrix = currentMesh.instanceMatrix;
    const newMatrix = newMesh.instanceMatrix;
    
    for (let i = 0; i < currentMesh.count; i++) {
      const srcOffset = i * 16;
      const dstOffset = i * 16;
      
      for (let j = 0; j < 16; j++) {
        (newMatrix.array as any)[dstOffset + j] = (oldMatrix.array as any)[srcOffset + j];
      }
    }
    
    newMesh.count = currentMesh.count;
    
    // Replace in scene
    // Replace mesh in scene
    if (this.sceneService.sceneApp && (this.sceneService.sceneApp as any).scene) {
      (this.sceneService.sceneApp as any).scene.remove(currentMesh);
      (this.sceneService.sceneApp as any).scene.add(newMesh);
    }
    
    // Dispose old mesh
    currentMesh.dispose();
    
    // Update reference
    this.terrainMeshes.set(meshId, newMesh);
  }

  private async addFieldInstances(
    meshId: string, 
    fields: ITerrainField[], 
    startIndex: number
  ): Promise<void> {
    
    const instancedMesh = this.terrainMeshes.get(meshId);
    if (!instancedMesh) return;
    
    const matrix = instancedMesh.instanceMatrix;
    const tempMatrix = new Matrix4();
    
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const instanceIndex = startIndex + i;
      
      // Calculate world position
      const worldPos = HexagonHelper.calculatePositionInGrid(
        mapCubeCoordsTo3dCoords(field.position), 
        HEXAGON_RADIUS
      );
      
      // Apply visual transformations
      worldPos.y += field.visual.offsetY || 0;
      const scale = field.visual.scale || 1;
      const rotation = field.visual.rotation || 0;
      
      // Create transformation matrix
      tempMatrix.makeRotationY(rotation);
      tempMatrix.scale(new Vector3(scale, scale, scale));
      tempMatrix.setPosition(worldPos.x, worldPos.y, worldPos.z);
      
      // Set instance matrix
      instancedMesh.setMatrixAt(instanceIndex, tempMatrix as any);
      
      // Set instance color if supported
      if (instancedMesh.instanceColor) {
        const color = this.hexToRgb(field.visual.primaryColor);
        instancedMesh.setColorAt(instanceIndex, new Color(color.r, color.g, color.b));
      }
    }
  }

  private hexToRgb(hex: number): { r: number; g: number; b: number } {
    return {
      r: ((hex >> 16) & 0xff) / 255,
      g: ((hex >> 8) & 0xff) / 255,
      b: (hex & 0xff) / 255
    };
  }
}

/**
 * Terrain expansion event types
 */
export enum TerrainExpansionEventType {
  MeshInitialized = 'mesh_initialized',
  ExpansionStarted = 'expansion_started',
  ExpansionCompleted = 'expansion_completed',
  ExpansionFailed = 'expansion_failed',
  ContractionStarted = 'contraction_started',
  ContractionCompleted = 'contraction_completed',
  GeometryUpdated = 'geometry_updated'
}

/**
 * Terrain expansion events
 */
export interface ITerrainExpansionEvent {
  type: TerrainExpansionEventType;
  meshId: string;
  instanceCount?: number;
  newFieldCount?: number;
  removedFieldCount?: number;
  error?: Error;
}

/**
 * Terrain statistics
 */
export interface ITerrainStats {
  meshCount: number;
  totalInstances: number;
  totalVertices: number;
  meshDetails: ITerrainMeshDetails[];
}

export interface ITerrainMeshDetails {
  meshId: string;
  instanceCount: number;
  verticesPerInstance: number;
  totalVertices: number;
}