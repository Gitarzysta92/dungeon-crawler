import { Component, OnInit, OnDestroy } from '@angular/core';
import { TerrainIntegrationService } from '../../../core/terrain/services/terrain-integration.service';
import { IDynamicTerrainConfig, BiomeType } from '../../../core/terrain/interfaces/dynamic-terrain.interface';

/**
 * Example implementation showing how to integrate dynamic terrain 
 * with the adventure view component
 */
@Component({
  selector: 'app-terrain-integration-dev',
  template: `
    <div class="terrain-integration-example">
      <h3>Dynamic Terrain System</h3>
      
      <div class="terrain-controls">
        <button (click)="initializeTerrain()" [disabled]="isTerrainActive">
          Initialize Terrain
        </button>
        <button (click)="disposeTerrain()" [disabled]="!isTerrainActive">
          Dispose Terrain
        </button>
        <button (click)="updateConfiguration()">
          Update Config
        </button>
      </div>
      
      <div class="terrain-stats" *ngIf="terrainStats$ | async as stats">
        <h4>Terrain Statistics</h4>
        <p>Loaded Chunks: {{ stats.loadedChunks }}</p>
        <p>Total Fields: {{ stats.totalFields }}</p>
        <p>Last Event: {{ stats.lastEvent }}</p>
        <p>Mesh Count: {{ stats.meshStats.meshCount }}</p>
        <p>Total Vertices: {{ stats.meshStats.totalVertices }}</p>
      </div>
      
      <div class="terrain-log">
        <h4>Event Log</h4>
        <div class="log-entry" *ngFor="let entry of eventLog">
          <span class="timestamp">{{ entry.timestamp | date:'HH:mm:ss' }}</span>
          <span class="event-type">{{ entry.type }}</span>
          <span class="message">{{ entry.message }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terrain-integration-example {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .terrain-controls {
      margin-bottom: 20px;
    }
    
    .terrain-controls button {
      margin-right: 10px;
      padding: 8px 16px;
      border: 1px solid #007bff;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .terrain-controls button:disabled {
      background: #6c757d;
      border-color: #6c757d;
      cursor: not-allowed;
    }
    
    .terrain-stats {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    
    .terrain-log {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 10px;
    }
    
    .log-entry {
      display: flex;
      margin-bottom: 5px;
      font-family: monospace;
      font-size: 12px;
    }
    
    .timestamp {
      color: #6c757d;
      margin-right: 10px;
      min-width: 80px;
    }
    
    .event-type {
      color: #007bff;
      margin-right: 10px;
      min-width: 150px;
    }
    
    .message {
      color: #495057;
    }
  `]
})
export class TerrainIntegrationDevComponent implements OnInit, OnDestroy {
  
  public isTerrainActive = false;
  public terrainStats$ = this.terrainIntegration.getTerrainStats();
  public eventLog: Array<{ timestamp: Date; type: string; message: string }> = [];
  
  private maxLogEntries = 50;

  constructor(
    private readonly terrainIntegration: TerrainIntegrationService
  ) {}

  ngOnInit(): void {
    // Example of automatic initialization
    // this.initializeTerrain();
  }

  ngOnDestroy(): void {
    this.disposeTerrain();
  }

  /**
   * Initialize the dynamic terrain system with custom configuration
   */
  public async initializeTerrain(): Promise<void> {
    try {
      this.addLogEntry('INIT', 'Initializing dynamic terrain system...');

      const config: Partial<IDynamicTerrainConfig> = {
        loadDistance: 10,           // Load terrain within 10 hexes
        unloadDistance: 18,         // Unload terrain beyond 18 hexes  
        chunkRadius: 6,             // Each chunk covers 6 hex radius
        maxLoadedChunks: 15,        // Keep max 15 chunks loaded
        updateInterval: 800,        // Check every 800ms
        enableProceduralGeneration: true,
        proceduralConfig: {
          seed: Date.now(),
          biomeWeights: new Map([
            [BiomeType.Plains, 0.4],      // 40% plains
            [BiomeType.Forest, 0.3],      // 30% forest
            [BiomeType.Mountains, 0.2],   // 20% mountains
            [BiomeType.Desert, 0.1]       // 10% desert
          ]),
          noiseSettings: {
            frequency: 0.08,        // Lower frequency = larger features
            octaves: 5,             // More detail layers
            persistence: 0.6,       // More persistent details
            lacunarity: 2.2         // Frequency multiplier
          },
          featureSpacing: 12        // Minimum 12 hexes between special features
        }
      };

      await this.terrainIntegration.initialize(config);
      this.isTerrainActive = true;
      
      this.addLogEntry('SUCCESS', 'Dynamic terrain system initialized successfully');
      
      // Set up event monitoring
      this.setupEventMonitoring();
      
    } catch (error) {
      this.addLogEntry('ERROR', `Failed to initialize terrain: ${error}`);
      console.error('Terrain initialization failed:', error);
    }
  }

  /**
   * Dispose of the terrain system
   */
  public disposeTerrain(): void {
    if (this.isTerrainActive) {
      this.terrainIntegration.dispose();
      this.isTerrainActive = false;
      this.addLogEntry('DISPOSE', 'Dynamic terrain system disposed');
    }
  }

  /**
   * Update terrain configuration at runtime
   */
  public async updateConfiguration(): Promise<void> {
    if (!this.isTerrainActive) {
      this.addLogEntry('WARNING', 'Cannot update config - terrain not initialized');
      return;
    }

    try {
      this.addLogEntry('CONFIG', 'Updating terrain configuration...');
      
      const configUpdate: Partial<IDynamicTerrainConfig> = {
        loadDistance: 12,         // Increase load distance
        updateInterval: 500,      // Faster updates
        proceduralConfig: {
          seed: Date.now(),       // New seed for different terrain
          biomeWeights: new Map([
            [BiomeType.Plains, 0.2],      // Less plains
            [BiomeType.Forest, 0.4],      // More forest
            [BiomeType.Mountains, 0.3],   // More mountains
            [BiomeType.Desert, 0.1]       // Same desert
          ]),
          noiseSettings: {
            frequency: 0.12,      // Smaller features
            octaves: 6,           // More detail
            persistence: 0.5,     
            lacunarity: 2.0       
          },
          featureSpacing: 8       // Closer features
        }
      };

      await this.terrainIntegration.updateConfig(configUpdate);
      this.addLogEntry('SUCCESS', 'Terrain configuration updated');
      
    } catch (error) {
      this.addLogEntry('ERROR', `Failed to update config: ${error}`);
      console.error('Configuration update failed:', error);
    }
  }

  /**
   * Example of manually triggering terrain update
   */
  public async forceTerrainUpdate(): Promise<void> {
    if (!this.isTerrainActive) return;

    try {
      // Example position - in real usage, this would be the player's position
      const position = { q: 0, r: 0, s: 0 };
      
      this.addLogEntry('UPDATE', `Forcing terrain update at position (${position.q}, ${position.r}, ${position.s})`);
      
      await this.terrainIntegration.updateTerrainAroundPosition(position);
      
      this.addLogEntry('SUCCESS', 'Manual terrain update completed');
      
    } catch (error) {
      this.addLogEntry('ERROR', `Manual update failed: ${error}`);
    }
  }

  private setupEventMonitoring(): void {
    // Monitor player position changes
    this.terrainIntegration.getCurrentPlayerPosition().subscribe(position => {
      if (position) {
        this.addLogEntry('PLAYER', `Player at (${position.q}, ${position.r}, ${position.s})`);
      }
    });

    // Monitor terrain statistics
    this.terrainStats$.subscribe(stats => {
      if (stats.lastEvent !== 'none') {
        this.addLogEntry('STATS', `${stats.loadedChunks} chunks, ${stats.totalFields} fields`);
      }
    });
  }

  private addLogEntry(type: string, message: string): void {
    this.eventLog.unshift({
      timestamp: new Date(),
      type,
      message
    });

    // Keep log size manageable
    if (this.eventLog.length > this.maxLogEntries) {
      this.eventLog = this.eventLog.slice(0, this.maxLogEntries);
    }
  }
}

/**
 * Example service integration within Adventure module
 */
export class AdventureTerrainService {
  
  constructor(
    private readonly terrainIntegration: TerrainIntegrationService
  ) {}

  /**
   * Initialize terrain for adventure mode
   */
  public async initializeForAdventure(): Promise<void> {
    const adventureTerrainConfig: Partial<IDynamicTerrainConfig> = {
      loadDistance: 8,            // Smaller load distance for adventure
      unloadDistance: 15,         
      chunkRadius: 5,             
      maxLoadedChunks: 12,        
      updateInterval: 1000,       // Less frequent updates
      enableProceduralGeneration: true,
      proceduralConfig: {
        seed: 42,                 // Fixed seed for consistent world
        biomeWeights: new Map([
          [BiomeType.Plains, 0.5],        // More plains for easier exploration
          [BiomeType.Forest, 0.25],       
          [BiomeType.Mountains, 0.15],    
          [BiomeType.Desert, 0.1]         
        ]),
        noiseSettings: {
          frequency: 0.06,        // Larger terrain features
          octaves: 4,             // Less detail for better performance
          persistence: 0.5,       
          lacunarity: 2.0         
        },
        featureSpacing: 15        // More spaced out features
      }
    };

    await this.terrainIntegration.initialize(adventureTerrainConfig);
    console.log('Adventure terrain system initialized');
  }

  /**
   * Handle adventure-specific terrain events
   */
  public setupAdventureIntegration(): void {
    // Listen for player movement events from adventure system
    // This would integrate with existing adventure state management
    
    this.terrainIntegration.getTerrainStats().subscribe(stats => {
      // Could trigger UI updates, loading screens, etc.
      console.log(`Adventure terrain: ${stats.loadedChunks} chunks active`);
    });
  }
}