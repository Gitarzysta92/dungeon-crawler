import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { AdventureStateStore } from '../../adventure/stores/adventure-state.store';
import { DynamicTerrainService } from './dynamic-terrain.service';
import { TerrainExpansionService } from './terrain-expansion.service';
import { IDynamicTerrainConfig, ITerrainEvent, TerrainEventType, BiomeType } from '../interfaces/dynamic-terrain.interface';
import { IBoardTraveler } from "@game-logic/gameplay/modules/board-areas/entities/board-traveler/board-traveler.interface";

/**
 * Service that integrates dynamic terrain with the existing adventure system
 * Automatically manages terrain loading based on player movement
 */
@Injectable({
  providedIn: 'root'
})
export class TerrainIntegrationService {
  
  private isInitialized = false;
  private defaultConfig: IDynamicTerrainConfig = {
    loadDistance: 8,        // Load terrain within 8 hexes
    unloadDistance: 15,     // Unload terrain beyond 15 hexes
    chunkRadius: 5,         // Each chunk is 5 hex radius
    maxLoadedChunks: 20,    // Keep max 20 chunks loaded
    updateInterval: 1000,   // Check every second
    enableProceduralGeneration: true,
    proceduralConfig: {
      seed: Date.now(),
      biomeWeights: new Map([
        [BiomeType.Plains, 0.4],
        [BiomeType.Forest, 0.3],
        [BiomeType.Mountains, 0.2],
        [BiomeType.Desert, 0.1]
      ]),
      noiseSettings: {
        frequency: 0.1,
        octaves: 4,
        persistence: 0.5,
        lacunarity: 2.0
      },
      featureSpacing: 10
    }
  };

  constructor(
    private readonly adventureStore: AdventureStateStore,
    private readonly dynamicTerrain: DynamicTerrainService,
    private readonly terrainExpansion: TerrainExpansionService
  ) {}

  /**
   * Initialize terrain integration with the adventure system
   */
  public async initialize(config?: Partial<IDynamicTerrainConfig>): Promise<void> {
    if (this.isInitialized) {
      console.warn('Terrain integration already initialized');
      return;
    }

    const finalConfig = { ...this.defaultConfig, ...config };
    console.log('Initializing terrain integration with config:', finalConfig);

    // Initialize dynamic terrain service
    await this.dynamicTerrain.initialize(finalConfig);
    
    // Set up player position tracking
    this.setupPlayerTracking();
    
    // Set up terrain event handling
    this.setupEventHandling();
    
    this.isInitialized = true;
    console.log('Terrain integration initialized successfully');
  }

  /**
   * Get current player position from adventure state
   */
  public getCurrentPlayerPosition(): Observable<ICubeCoordinates | null> {
    if (!this.adventureStore.isInitialized) {
      return new Observable(subscriber => subscriber.next(null));
    }

    return this.adventureStore.state$.pipe(
      map(adventure => {
        const humanPlayer = adventure.humanPlayer;
        if (!humanPlayer) return null;

        const pawn = adventure.getSelectedPawn<IBoardTraveler>(humanPlayer);
        if (!pawn || !pawn.position) return null;

        return pawn.position;
      }),
      distinctUntilChanged((a, b) => 
        a && b ? CubeCoordsHelper.isCoordsEqual(a, b) : a === b
      )
    );
  }

  /**
   * Manually trigger terrain update around specific position
   */
  public async updateTerrainAroundPosition(position: ICubeCoordinates): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Terrain integration not initialized');
    }

    console.log('Manually updating terrain around position:', position);
    await this.dynamicTerrain.updatePlayerPosition(position);
  }

  /**
   * Get terrain loading statistics
   */
  public getTerrainStats(): Observable<any> {
    return combineLatest([
      this.dynamicTerrain.loadedChunks$,
      this.terrainExpansion.expansionEvents$
    ]).pipe(
      map(([chunks, lastEvent]) => ({
        loadedChunks: chunks.size,
        totalFields: Array.from(chunks.values()).reduce((sum, chunk) => sum + chunk.fields.length, 0),
        lastEvent: lastEvent?.type || 'none',
        meshStats: this.terrainExpansion.getTerrainStats()
      }))
    );
  }

  /**
   * Configure terrain loading parameters at runtime
   */
  public async updateConfig(configUpdate: Partial<IDynamicTerrainConfig>): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Terrain integration not initialized');
    }

    const currentConfig = await this.dynamicTerrain.config$.pipe(
      filter(config => !!config),
      map(config => ({ ...this.defaultConfig, ...config, ...configUpdate }))
    ).toPromise();

    if (currentConfig) {
      await this.dynamicTerrain.initialize(currentConfig);
      console.log('Terrain configuration updated:', configUpdate);
    }
  }

  /**
   * Dispose of terrain integration
   */
  public dispose(): void {
    if (!this.isInitialized) return;

    console.log('Disposing terrain integration');
    
    this.dynamicTerrain.dispose();
    this.isInitialized = false;
  }

  private setupPlayerTracking(): void {
    // Track player position changes and update terrain accordingly
    this.getCurrentPlayerPosition().pipe(
      filter(position => !!position)
    ).subscribe(position => {
      if (position) {
        this.dynamicTerrain.updatePlayerPosition(position).catch(error => {
          console.error('Failed to update terrain for player position:', error);
        });
      }
    });

    console.log('Player position tracking setup complete');
  }

  private setupEventHandling(): void {
    // Handle terrain events and integrate with scene
    this.dynamicTerrain.events$.subscribe(event => {
      this.handleTerrainEvent(event);
    });

    // Handle terrain expansion events
    this.terrainExpansion.expansionEvents$.subscribe(event => {
      console.log('Terrain expansion event:', event);
    });

    console.log('Terrain event handling setup complete');
  }

  private handleTerrainEvent(event: ITerrainEvent): void {
    console.log('Handling terrain event:', event);

    switch (event.type) {
      case TerrainEventType.ChunkLoaded:
        this.onChunkLoaded(event);
        break;
        
      case TerrainEventType.ChunkUnloaded:
        this.onChunkUnloaded(event);
        break;
        
      case TerrainEventType.ChunkError:
        this.onChunkError(event);
        break;
        
      case TerrainEventType.PlayerMoved:
        this.onPlayerMoved(event);
        break;
        
      case TerrainEventType.TerrainGenerated:
        this.onTerrainGenerated(event);
        break;
    }
  }

  private onChunkLoaded(event: ITerrainEvent): void {
    console.log(`Chunk loaded: ${event.chunkId}`);
    
    // Optional: Trigger visual effects for new terrain
    if (event.chunk) {
      // Could add entrance animations here
      console.log(`Loaded chunk with ${event.chunk.fields.length} fields`);
    }
  }

  private onChunkUnloaded(event: ITerrainEvent): void {
    console.log(`Chunk unloaded: ${event.chunkId}`);
    
    // Optional: Trigger visual effects for removed terrain
    // Could add exit animations here
  }

  private onChunkError(event: ITerrainEvent): void {
    console.error(`Chunk error for ${event.chunkId}:`, event.error);
    
    // Could implement retry logic or fallback terrain here
  }

  private onPlayerMoved(event: ITerrainEvent): void {
    console.log('Player moved, terrain system active');
    
    // Optional: Update any player-specific terrain effects
  }

  private onTerrainGenerated(event: ITerrainEvent): void {
    if (event.fields) {
      console.log(`Generated ${event.fields.length} new terrain fields`);
      
      // Optional: Apply any post-generation effects
      // Could trigger terrain expansion service here
    }
  }
}