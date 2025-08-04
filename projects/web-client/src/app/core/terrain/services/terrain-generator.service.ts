import { Injectable } from '@angular/core';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { 
  ITerrainField, 
  ITerrainGenerationContext, 
  TerrainType, 
  BiomeType, 
  IBiome,
  ITerrainVisual
} from '../interfaces/dynamic-terrain.interface';

/**
 * Service responsible for procedural terrain generation
 */
@Injectable({
  providedIn: 'root'
})
export class TerrainGeneratorService {

  private readonly biomeConfigs = new Map<BiomeType, IBiome>([
    [BiomeType.Plains, {
      type: BiomeType.Plains,
      decorationDensity: 0.3,
      decorationTypes: ['grass', 'small_rocks'],
      heightVariation: {
        baseHeight: 0,
        maxVariation: 0.2,
        noiseScale: 0.1
      }
    }],
    [BiomeType.Forest, {
      type: BiomeType.Forest,
      decorationDensity: 0.7,
      decorationTypes: ['trees', 'bushes', 'rocks'],
      heightVariation: {
        baseHeight: 0.1,
        maxVariation: 0.4,
        noiseScale: 0.15
      }
    }],
    [BiomeType.Mountains, {
      type: BiomeType.Mountains,
      decorationDensity: 0.5,
      decorationTypes: ['boulders', 'rocks', 'cliff_faces'],
      heightVariation: {
        baseHeight: 0.5,
        maxVariation: 1.0,
        noiseScale: 0.05
      }
    }],
    [BiomeType.Desert, {
      type: BiomeType.Desert,
      decorationDensity: 0.1,
      decorationTypes: ['sand_dunes', 'cacti', 'dry_bones'],
      heightVariation: {
        baseHeight: -0.1,
        maxVariation: 0.3,
        noiseScale: 0.2
      }
    }]
  ]);

  /**
   * Generate terrain fields for a given area
   */
  public async generateFields(
    centerPosition: ICubeCoordinates, 
    radius: number, 
    context: ITerrainGenerationContext
  ): Promise<ITerrainField[]> {
    
    console.log(`Generating terrain fields around ${JSON.stringify(centerPosition)} with radius ${radius}`);
    
    const fields: ITerrainField[] = [];
    const positions = this.generateHexagonalPositions(centerPosition, radius);
    
    for (const position of positions) {
      const field = await this.generateField(position, context);
      fields.push(field);
    }
    
    console.log(`Generated ${fields.length} terrain fields`);
    return fields;
  }

  /**
   * Generate a single terrain field
   */
  private async generateField(
    position: ICubeCoordinates, 
    context: ITerrainGenerationContext
  ): Promise<ITerrainField> {
    
    // Determine biome for this position
    const biome = this.determineBiome(position, context);
    
    // Determine terrain type based on biome and noise
    const terrainType = this.determineTerrainType(position, biome, context);
    
    // Generate visual properties
    const visual = this.generateVisual(position, terrainType, biome, context);
    
    // Create field
    const field: ITerrainField = {
      id: `field_${CubeCoordsHelper.createKeyFromCoordinates(position)}`,
      position,
      terrainType,
      visual,
      isWalkable: this.isTerrainWalkable(terrainType),
      biome
    };
    
    return field;
  }

  /**
   * Generate hexagonal positions around a center point
   */
  private generateHexagonalPositions(center: ICubeCoordinates, radius: number): ICubeCoordinates[] {
    const positions: ICubeCoordinates[] = [];
    
    for (let q = -radius; q <= radius; q++) {
      const r1 = Math.max(-radius, -q - radius);
      const r2 = Math.min(radius, -q + radius);
      
      for (let r = r1; r <= r2; r++) {
        const s = -q - r;
        positions.push({
          q: center.q + q,
          r: center.r + r,
          s: center.s + s
        });
      }
    }
    
    return positions;
  }

  /**
   * Determine biome for a position using noise and distance from player
   */
  private determineBiome(position: ICubeCoordinates, context: ITerrainGenerationContext): IBiome {
    // Simple biome determination based on distance from origin and noise
    const distanceFromOrigin = Math.sqrt(position.q * position.q + position.r * position.r);
    const noise = this.simpleNoise(position.q * 0.1, position.r * 0.1, context.sessionSeed);
    
    // Determine biome based on distance and noise
    let biomeType: BiomeType;
    
    if (distanceFromOrigin < 5) {
      biomeType = BiomeType.Plains; // Starting area is always plains
    } else if (distanceFromOrigin > 20 && noise > 0.5) {
      biomeType = BiomeType.Mountains;
    } else if (noise > 0.7) {
      biomeType = BiomeType.Forest;
    } else if (noise < -0.7) {
      biomeType = BiomeType.Desert;
    } else {
      biomeType = BiomeType.Plains;
    }
    
    return this.biomeConfigs.get(biomeType) || this.biomeConfigs.get(BiomeType.Plains)!;
  }

  /**
   * Determine terrain type based on biome and local conditions
   */
  private determineTerrainType(
    position: ICubeCoordinates, 
    biome: IBiome, 
    context: ITerrainGenerationContext
  ): TerrainType {
    
    const localNoise = this.simpleNoise(position.q * 0.3, position.r * 0.3, context.sessionSeed + 1000);
    
    switch (biome.type) {
      case BiomeType.Plains:
        return localNoise > 0.8 ? TerrainType.Stone : TerrainType.Grass;
      
      case BiomeType.Forest:
        return localNoise > 0.6 ? TerrainType.Stone : TerrainType.Grass;
      
      case BiomeType.Mountains:
        return localNoise > 0.3 ? TerrainType.Rock : TerrainType.Stone;
      
      case BiomeType.Desert:
        return localNoise > 0.7 ? TerrainType.Rock : TerrainType.Sand;
      
      default:
        return TerrainType.Grass;
    }
  }

  /**
   * Generate visual properties for a terrain field
   */
  private generateVisual(
    position: ICubeCoordinates, 
    terrainType: TerrainType, 
    biome: IBiome,
    context: ITerrainGenerationContext
  ): ITerrainVisual {
    
    const heightNoise = this.simpleNoise(
      position.q * biome.heightVariation.noiseScale, 
      position.r * biome.heightVariation.noiseScale, 
      context.sessionSeed + 2000
    );
    
    const offsetY = biome.heightVariation.baseHeight + 
                   (heightNoise * biome.heightVariation.maxVariation);
    
    // Determine scene definition name and colors based on terrain type
    let definitionName: string;
    let primaryColor: number;
    let secondaryColor: number | undefined;
    
    switch (terrainType) {
      case TerrainType.Grass:
        definitionName = 'hexagonal-plains-field';
        primaryColor = this.interpolateColor(0x3f7f3f, 0x5f9f5f, Math.abs(heightNoise));
        break;
        
      case TerrainType.Stone:
        definitionName = 'stone-field';
        primaryColor = this.interpolateColor(0x808080, 0xa0a0a0, Math.abs(heightNoise));
        break;
        
      case TerrainType.Rock:
        definitionName = 'stone-field';
        primaryColor = this.interpolateColor(0x606060, 0x404040, Math.abs(heightNoise));
        break;
        
      case TerrainType.Sand:
        definitionName = 'hexagonal-plains-field';
        primaryColor = this.interpolateColor(0xd4a574, 0xe4b584, Math.abs(heightNoise));
        break;
        
      case TerrainType.Water:
        definitionName = 'hexagonal-plains-field';
        primaryColor = this.interpolateColor(0x4080c0, 0x6090d0, Math.abs(heightNoise));
        break;
        
      default:
        definitionName = 'hexagonal-plains-field';
        primaryColor = 0x808080;
    }
    
    // Add some rotation variation
    const rotationNoise = this.simpleNoise(position.q * 0.5, position.r * 0.5, context.sessionSeed + 3000);
    const rotation = rotationNoise * Math.PI * 0.1; // Small rotation variation
    
    return {
      definitionName,
      primaryColor,
      secondaryColor,
      offsetY,
      scale: 1.0,
      rotation
    };
  }

  /**
   * Check if terrain type is walkable
   */
  private isTerrainWalkable(terrainType: TerrainType): boolean {
    switch (terrainType) {
      case TerrainType.Water:
      case TerrainType.Void:
        return false;
      default:
        return true;
    }
  }

  /**
   * Simple noise function for procedural generation
   */
  private simpleNoise(x: number, y: number, seed: number): number {
    // Simple pseudorandom noise function
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 0.001) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1; // Normalize to [-1, 1]
  }

  /**
   * Interpolate between two colors
   */
  private interpolateColor(color1: number, color2: number, factor: number): number {
    const r1 = (color1 >> 16) & 0xff;
    const g1 = (color1 >> 8) & 0xff;
    const b1 = color1 & 0xff;
    
    const r2 = (color2 >> 16) & 0xff;
    const g2 = (color2 >> 8) & 0xff;
    const b2 = color2 & 0xff;
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return (r << 16) | (g << 8) | b;
  }
}