import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject, interval, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneService } from "../../scene/services/scene.service";
import { 
  IDynamicTerrainService, 
  IDynamicTerrainConfig, 
  ITerrainChunk, 
  ITerrainField, 
  ITerrainEvent,
  ITerrainGenerationContext,
  TerrainChunkState, 
  TerrainEventType,
  TerrainType,
  BiomeType
} from '../interfaces/dynamic-terrain.interface';
import { TerrainGeneratorService } from './terrain-generator.service';
import { mapCubeCoordsTo3dCoords } from '../../scene/misc/coords-mappings';
import { HexagonHelper } from '../../scene/misc/hexagon.helper';
import { HEXAGON_RADIUS } from '../../scene/constants/hexagon.constants';

@Injectable({
  providedIn: 'root'
})
export class DynamicTerrainService implements IDynamicTerrainService {
  
  private readonly _config$ = new BehaviorSubject<IDynamicTerrainConfig | null>(null);
  private readonly _loadedChunks$ = new BehaviorSubject<Map<string, ITerrainChunk>>(new Map());
  private readonly _events$ = new Subject<ITerrainEvent>();
  private readonly _destroy$ = new Subject<void>();
  private readonly _currentPlayerPosition$ = new BehaviorSubject<ICubeCoordinates | null>(null);
  
  private _updateTimer: any;
  private _isInitialized = false;
  private _loadingPromises = new Map<string, Promise<ITerrainChunk>>();

  public readonly config$ = this._config$.asObservable().pipe(filter(config => !!config));
  public readonly loadedChunks$ = this._loadedChunks$.asObservable();
  public readonly events$ = this._events$.asObservable();

  constructor(
    private readonly sceneService: SceneService,
    private readonly terrainGenerator: TerrainGeneratorService,
    private readonly ngZone: NgZone
  ) {
    this.setupPlayerPositionTracking();
  }

  public async initialize(config: IDynamicTerrainConfig): Promise<void> {
    console.log('Initializing Dynamic Terrain Service', config);
    
    this._config$.next(config);
    this._isInitialized = true;
    
    // Start periodic updates
    this.startPeriodicUpdates(config.updateInterval);
    
    this._events$.next({
      type: TerrainEventType.PlayerMoved,
      chunk: undefined
    });
  }

  public async updatePlayerPosition(position: ICubeCoordinates): Promise<void> {
    if (!this._isInitialized) {
      console.warn('Dynamic terrain service not initialized');
      return;
    }

    const currentPosition = this._currentPlayerPosition$.value;
    
    // Only update if position actually changed
    if (currentPosition && CubeCoordsHelper.isCoordsEqual(currentPosition, position)) {
      return;
    }

    console.log('Player position updated:', position);
    this._currentPlayerPosition$.next(position);
    this._events$.next({
      type: TerrainEventType.PlayerMoved
    });

    // Trigger immediate terrain update
    await this.processTerrainUpdate(position);
  }

  public async loadChunk(centerPosition: ICubeCoordinates): Promise<ITerrainChunk> {
    const chunkId = this.generateChunkId(centerPosition);
    const config = this._config$.value;
    
    if (!config) {
      throw new Error('Terrain service not initialized');
    }

    // Check if already loaded or loading
    const existingChunk = this._loadedChunks$.value.get(chunkId);
    if (existingChunk && existingChunk.loadingState === TerrainChunkState.Loaded) {
      return existingChunk;
    }

    // Check if already loading
    const existingPromise = this._loadingPromises.get(chunkId);
    if (existingPromise) {
      return existingPromise;
    }

    console.log(`Loading terrain chunk: ${chunkId} at`, centerPosition);
    
    // Create loading promise
    const loadingPromise = this.performChunkLoad(centerPosition, config);
    this._loadingPromises.set(chunkId, loadingPromise);
    
    this._events$.next({
      type: TerrainEventType.ChunkLoadStarted,
      chunkId
    });

    try {
      const chunk = await loadingPromise;
      this._loadingPromises.delete(chunkId);
      
      // Add to loaded chunks
      const currentChunks = new Map(this._loadedChunks$.value);
      currentChunks.set(chunkId, chunk);
      this._loadedChunks$.next(currentChunks);
      
      // Compose scene objects
      await this.composeChunkScene(chunk);
      
      this._events$.next({
        type: TerrainEventType.ChunkLoaded,
        chunkId,
        chunk
      });
      
      return chunk;
    } catch (error) {
      this._loadingPromises.delete(chunkId);
      console.error(`Failed to load chunk ${chunkId}:`, error);
      
      this._events$.next({
        type: TerrainEventType.ChunkError,
        chunkId,
        error: error as Error
      });
      
      throw error;
    }
  }

  public async unloadChunk(chunkId: string): Promise<void> {
    const currentChunks = new Map(this._loadedChunks$.value);
    const chunk = currentChunks.get(chunkId);
    
    if (!chunk) {
      console.warn(`Chunk ${chunkId} not found for unloading`);
      return;
    }

    console.log(`Unloading terrain chunk: ${chunkId}`);
    
    this._events$.next({
      type: TerrainEventType.ChunkUnloadStarted,
      chunkId
    });

    try {
      // Update chunk state
      chunk.loadingState = TerrainChunkState.Unloading;
      
      // Remove scene objects
      await this.removeChunkScene(chunk);
      
      // Remove from loaded chunks
      currentChunks.delete(chunkId);
      this._loadedChunks$.next(currentChunks);
      
      this._events$.next({
        type: TerrainEventType.ChunkUnloaded,
        chunkId
      });
      
    } catch (error) {
      console.error(`Failed to unload chunk ${chunkId}:`, error);
      this._events$.next({
        type: TerrainEventType.ChunkError,
        chunkId,
        error: error as Error
      });
    }
  }

  public async getFieldAt(position: ICubeCoordinates): Promise<ITerrainField | null> {
    const chunkId = this.getChunkIdForPosition(position);
    const chunk = this._loadedChunks$.value.get(chunkId);
    
    if (!chunk) {
      return null;
    }
    
    return chunk.fields.find(field => 
      CubeCoordsHelper.isCoordsEqual(field.position, position)
    ) || null;
  }

  public async generateTerrain(centerPosition: ICubeCoordinates, radius: number): Promise<ITerrainField[]> {
    const config = this._config$.value;
    if (!config) {
      throw new Error('Terrain service not initialized');
    }

    const context: ITerrainGenerationContext = {
      playerPosition: this._currentPlayerPosition$.value || centerPosition,
      loadedChunks: this._loadedChunks$.value,
      config,
      sessionSeed: Date.now() // Simple seed for now
    };

    const fields = await this.terrainGenerator.generateFields(centerPosition, radius, context);
    
    this._events$.next({
      type: TerrainEventType.TerrainGenerated,
      fields
    });
    
    return fields;
  }

  public dispose(): void {
    console.log('Disposing Dynamic Terrain Service');
    
    this._destroy$.next();
    this._destroy$.complete();
    
    if (this._updateTimer) {
      clearInterval(this._updateTimer);
    }
    
    // Unload all chunks
    const loadedChunks = this._loadedChunks$.value;
    for (const chunkId of loadedChunks.keys()) {
      this.unloadChunk(chunkId).catch(console.error);
    }
    
    this._isInitialized = false;
  }

  private setupPlayerPositionTracking(): void {
    // Listen for player position changes and automatically trigger terrain updates
    this._currentPlayerPosition$.pipe(
      takeUntil(this._destroy$),
      filter(position => !!position),
      debounceTime(100), // Debounce rapid position changes
      distinctUntilChanged((a, b) => a && b ? CubeCoordsHelper.isCoordsEqual(a, b) : a === b)
    ).subscribe(position => {
      if (position) {
        this.processTerrainUpdate(position).catch(console.error);
      }
    });
  }

  private startPeriodicUpdates(interval: number): void {
    if (this._updateTimer) {
      clearInterval(this._updateTimer);
    }
    
    this._updateTimer = setInterval(() => {
      const position = this._currentPlayerPosition$.value;
      if (position) {
        this.processTerrainUpdate(position).catch(console.error);
      }
    }, interval);
  }

  private async processTerrainUpdate(playerPosition: ICubeCoordinates): Promise<void> {
    const config = this._config$.value;
    if (!config) return;

    console.log('Processing terrain update for position:', playerPosition);
    
    // Calculate which chunks need to be loaded/unloaded
    const requiredChunks = this.calculateRequiredChunks(playerPosition, config);
    const currentChunks = this._loadedChunks$.value;
    
    // Load new chunks
    const loadPromises: Promise<void>[] = [];
    for (const chunkCenter of requiredChunks) {
      const chunkId = this.generateChunkId(chunkCenter);
      if (!currentChunks.has(chunkId) && !this._loadingPromises.has(chunkId)) {
        loadPromises.push(
          this.loadChunk(chunkCenter).then(() => {}).catch(console.error)
        );
      }
    }
    
    // Unload distant chunks
    const unloadPromises: Promise<void>[] = [];
    for (const [chunkId, chunk] of currentChunks.entries()) {
      const distance = CubeCoordsHelper.getDistanceBetweenBoardCoordinates(playerPosition, chunk.centerPosition);
      if (distance > config.unloadDistance) {
        unloadPromises.push(this.unloadChunk(chunkId));
      }
    }
    
    // Execute all operations
    await Promise.all([...loadPromises, ...unloadPromises]);
  }

  private calculateRequiredChunks(playerPosition: ICubeCoordinates, config: IDynamicTerrainConfig): ICubeCoordinates[] {
    const chunks: ICubeCoordinates[] = [];
    const chunkRadius = config.chunkRadius;
    const loadRadius = Math.ceil(config.loadDistance / (chunkRadius * 2));
    
    // Generate chunk centers in a hexagonal pattern around player
    for (let q = -loadRadius; q <= loadRadius; q++) {
      for (let r = -loadRadius; r <= loadRadius; r++) {
        if (Math.abs(q + r) <= loadRadius) {
          const chunkCenter: ICubeCoordinates = {
            q: playerPosition.q + q * chunkRadius * 2,
            r: playerPosition.r + r * chunkRadius * 2,
            s: playerPosition.s - (q + r) * chunkRadius * 2
          };
          chunks.push(chunkCenter);
        }
      }
    }
    
    return chunks;
  }

  private async performChunkLoad(centerPosition: ICubeCoordinates, config: IDynamicTerrainConfig): Promise<ITerrainChunk> {
    const chunkId = this.generateChunkId(centerPosition);
    
    // Generate terrain fields for this chunk
    const fields = await this.generateTerrain(centerPosition, config.chunkRadius);
    
    // Create scene definitions
    const sceneDefinitions = this.createSceneDefinitions(fields);
    
    const chunk: ITerrainChunk = {
      id: chunkId,
      centerPosition,
      radius: config.chunkRadius,
      loadingState: TerrainChunkState.Loaded,
      fields,
      sceneDefinitions
    };
    
    return chunk;
  }

  private createSceneDefinitions(fields: ITerrainField[]): ISceneComposerDefinition<any>[] {
    return fields.map(field => ({
      definitionName: field.visual.definitionName,
      auxId: field.id,
      auxCoords: CubeCoordsHelper.createKeyFromCoordinates(field.position),
      position: HexagonHelper.calculatePositionInGrid(
        mapCubeCoordsTo3dCoords(field.position), 
        HEXAGON_RADIUS
      ),
      primaryColor: field.visual.primaryColor,
      secondaryColor: field.visual.secondaryColor,
      offsetY: field.visual.offsetY || 0,
      scale: field.visual.scale || 1,
      rotation: field.visual.rotation || 0
    }));
  }

  private async composeChunkScene(chunk: ITerrainChunk): Promise<void> {
    try {
      await this.sceneService.composeScene(chunk.sceneDefinitions);
      console.log(`Scene composed for chunk ${chunk.id} with ${chunk.sceneDefinitions.length} objects`);
    } catch (error) {
      console.error(`Failed to compose scene for chunk ${chunk.id}:`, error);
      throw error;
    }
  }

  private async removeChunkScene(chunk: ITerrainChunk): Promise<void> {
    // Mark all scene mediums for removal by setting toRemove flag
    // The scene service will handle the actual removal
    const sceneMediaForRemoval = chunk.fields.map(field => ({
      id: field.id,
      toRemove: true,
      isSceneObjectsCreated: true,
      removeSceneObjects: async () => {
        // Implementation would mark Three.js objects for disposal
        console.log(`Removing scene objects for field ${field.id}`);
      }
    }));
    
    // Process the removal through scene service
    await this.sceneService.processSceneUpdate(sceneMediaForRemoval as any);
    console.log(`Scene objects removed for chunk ${chunk.id}`);
  }

  private generateChunkId(centerPosition: ICubeCoordinates): string {
    return `chunk_${centerPosition.q}_${centerPosition.r}_${centerPosition.s}`;
  }

  private getChunkIdForPosition(position: ICubeCoordinates): string {
    const config = this._config$.value;
    if (!config) return '';
    
    // Calculate which chunk this position belongs to
    const chunkRadius = config.chunkRadius;
    const chunkQ = Math.floor(position.q / (chunkRadius * 2)) * chunkRadius * 2;
    const chunkR = Math.floor(position.r / (chunkRadius * 2)) * chunkRadius * 2;
    const chunkS = -chunkQ - chunkR;
    
    return this.generateChunkId({ q: chunkQ, r: chunkR, s: chunkS });
  }
}