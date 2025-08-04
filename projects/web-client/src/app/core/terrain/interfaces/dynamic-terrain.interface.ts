import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { Observable } from "rxjs";

/**
 * Represents a chunk of terrain that can be loaded/unloaded dynamically
 */
export interface ITerrainChunk {
  /** Unique identifier for the chunk */
  readonly id: string;
  
  /** Center position of the chunk in cube coordinates */
  readonly centerPosition: ICubeCoordinates;
  
  /** Radius of the chunk (how many hexes from center) */
  readonly radius: number;
  
  /** Current loading state */
  loadingState: TerrainChunkState;
  
  /** Field definitions within this chunk */
  fields: ITerrainField[];
  
  /** 3D scene definitions for this chunk */
  sceneDefinitions: ISceneComposerDefinition<any>[];
  
  /** Distance from player when last checked */
  lastDistanceFromPlayer?: number;
}

/**
 * Individual terrain field within a chunk
 */
export interface ITerrainField {
  /** Unique field identifier */
  readonly id: string;
  
  /** Position in cube coordinates */
  readonly position: ICubeCoordinates;
  
  /** Terrain type (affects appearance and generation) */
  terrainType: TerrainType;
  
  /** Visual properties */
  visual: ITerrainVisual;
  
  /** Whether this field is walkable */
  isWalkable: boolean;
  
  /** Biome information for procedural generation */
  biome?: IBiome;
}

/**
 * Visual properties for terrain fields
 */
export interface ITerrainVisual {
  /** Scene composer definition name */
  definitionName: string;
  
  /** Primary color for the terrain */
  primaryColor: number;
  
  /** Secondary color (if applicable) */
  secondaryColor?: number;
  
  /** Height offset from base level */
  offsetY?: number;
  
  /** Scale multiplier */
  scale?: number;
  
  /** Rotation in radians */
  rotation?: number;
}

/**
 * Biome information for procedural generation
 */
export interface IBiome {
  /** Biome identifier */
  type: BiomeType;
  
  /** Density of decorative elements (0-1) */
  decorationDensity: number;
  
  /** Available decoration types */
  decorationTypes: string[];
  
  /** Height variation parameters */
  heightVariation: IHeightVariation;
}

/**
 * Height variation parameters for terrain generation
 */
export interface IHeightVariation {
  /** Base height offset */
  baseHeight: number;
  
  /** Maximum variation from base */
  maxVariation: number;
  
  /** Noise scale for height generation */
  noiseScale: number;
}

/**
 * Configuration for dynamic terrain loading
 */
export interface IDynamicTerrainConfig {
  /** Distance threshold to start loading new chunks */
  loadDistance: number;
  
  /** Distance threshold to unload far chunks */
  unloadDistance: number;
  
  /** Chunk size (radius in hex tiles) */
  chunkRadius: number;
  
  /** Maximum number of chunks to keep loaded */
  maxLoadedChunks: number;
  
  /** Update frequency in milliseconds */
  updateInterval: number;
  
  /** Enable procedural generation */
  enableProceduralGeneration: boolean;
  
  /** Procedural generation settings */
  proceduralConfig: IProceduralConfig;
}

/**
 * Procedural generation configuration
 */
export interface IProceduralConfig {
  /** Seed for random generation */
  seed: number;
  
  /** Available biomes and their weights */
  biomeWeights: Map<BiomeType, number>;
  
  /** Noise settings for terrain generation */
  noiseSettings: INoiseSettings;
  
  /** Minimum distance between special features */
  featureSpacing: number;
}

/**
 * Noise generation settings
 */
export interface INoiseSettings {
  /** Frequency of the noise */
  frequency: number;
  
  /** Number of octaves */
  octaves: number;
  
  /** Persistence factor */
  persistence: number;
  
  /** Lacunarity factor */
  lacunarity: number;
}

/**
 * Terrain generation context
 */
export interface ITerrainGenerationContext {
  /** Player's current position */
  playerPosition: ICubeCoordinates;
  
  /** Currently loaded chunks */
  loadedChunks: Map<string, ITerrainChunk>;
  
  /** Generation config */
  config: IDynamicTerrainConfig;
  
  /** Random seed for this session */
  sessionSeed: number;
}

/**
 * Events emitted by the dynamic terrain system
 */
export interface ITerrainEvent {
  type: TerrainEventType;
  chunkId?: string;
  chunk?: ITerrainChunk;
  fields?: ITerrainField[];
  error?: Error;
}

/**
 * Service interface for dynamic terrain management
 */
export interface IDynamicTerrainService {
  /** Current terrain configuration */
  readonly config$: Observable<IDynamicTerrainConfig>;
  
  /** Currently loaded chunks */
  readonly loadedChunks$: Observable<Map<string, ITerrainChunk>>;
  
  /** Terrain events stream */
  readonly events$: Observable<ITerrainEvent>;
  
  /** Initialize the service with configuration */
  initialize(config: IDynamicTerrainConfig): Promise<void>;
  
  /** Update player position and trigger loading/unloading */
  updatePlayerPosition(position: ICubeCoordinates): Promise<void>;
  
  /** Force load a specific chunk */
  loadChunk(centerPosition: ICubeCoordinates): Promise<ITerrainChunk>;
  
  /** Unload a specific chunk */
  unloadChunk(chunkId: string): Promise<void>;
  
  /** Get terrain field at specific position */
  getFieldAt(position: ICubeCoordinates): Promise<ITerrainField | null>;
  
  /** Generate new terrain around position */
  generateTerrain(centerPosition: ICubeCoordinates, radius: number): Promise<ITerrainField[]>;
  
  /** Dispose of the service */
  dispose(): void;
}

/**
 * Terrain chunk loading states
 */
export enum TerrainChunkState {
  Unloaded = 'unloaded',
  Loading = 'loading',
  Loaded = 'loaded',
  Unloading = 'unloading',
  Error = 'error'
}

/**
 * Available terrain types
 */
export enum TerrainType {
  Grass = 'grass',
  Stone = 'stone',
  Water = 'water',
  Sand = 'sand',
  Rock = 'rock',
  Void = 'void'
}

/**
 * Available biome types
 */
export enum BiomeType {
  Plains = 'plains',
  Forest = 'forest',
  Mountains = 'mountains',
  Desert = 'desert',
  Swamp = 'swamp',
  Volcanic = 'volcanic'
}

/**
 * Terrain event types
 */
export enum TerrainEventType {
  ChunkLoadStarted = 'chunk_load_started',
  ChunkLoaded = 'chunk_loaded',
  ChunkUnloadStarted = 'chunk_unload_started',
  ChunkUnloaded = 'chunk_unloaded',
  ChunkError = 'chunk_error',
  PlayerMoved = 'player_moved',
  TerrainGenerated = 'terrain_generated'
}