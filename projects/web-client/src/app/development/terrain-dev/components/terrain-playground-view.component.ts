import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { SceneService } from '../../../core/scene/services/scene.service';
import { DynamicTerrainService, TerrainGeneratorService, TerrainExpansionService } from '../../../core/terrain/api';
import { 
  IDynamicTerrainConfig, 
  ITerrainField, 
  TerrainType, 
  BiomeType,
  ITerrainEvent,
  TerrainEventType
} from '../../../core/terrain/interfaces/dynamic-terrain.interface';
import { SceneAssetsLoaderService } from '../../../core/scene/services/scene-assets-loader.service';

@Component({
  selector: 'app-terrain-playground-view',
  template: `
    <div class="terrain-playground">
      <h2>🌍 Terrain Development Playground</h2>
      
      <!-- Configuration Panel -->
      <div class="config-panel">
        <h3>Terrain Configuration</h3>
        <form [formGroup]="configForm" class="config-form">
          
          <div class="form-section">
            <h4>Loading Parameters</h4>
            <div class="form-row">
              <label>Load Distance:</label>
              <input type="number" formControlName="loadDistance" min="1" max="50">
              <span class="help-text">Distance to start loading new chunks</span>
            </div>
            
            <div class="form-row">
              <label>Unload Distance:</label>
              <input type="number" formControlName="unloadDistance" min="1" max="100">
              <span class="help-text">Distance to unload far chunks</span>
            </div>
            
            <div class="form-row">
              <label>Chunk Radius:</label>
              <input type="number" formControlName="chunkRadius" min="1" max="20">
              <span class="help-text">Size of each terrain chunk</span>
            </div>
            
            <div class="form-row">
              <label>Max Chunks:</label>
              <input type="number" formControlName="maxLoadedChunks" min="1" max="100">
              <span class="help-text">Maximum chunks to keep in memory</span>
            </div>
          </div>

          <div class="form-section">
            <h4>Generation Parameters</h4>
            <div class="form-row">
              <label>
                <input type="checkbox" formControlName="enableProceduralGeneration">
                Enable Procedural Generation
              </label>
            </div>
            
            <div class="form-row">
              <label>Generation Seed:</label>
              <input type="number" formControlName="seed">
              <button type="button" (click)="randomizeSeed()">Random</button>
            </div>
            
            <div class="biome-weights" formGroupName="biomeWeights">
              <h5>Biome Distribution</h5>
              <div class="weight-row" *ngFor="let biome of biomeTypes">
                <label>{{ biome }}:</label>
                <input type="range" [formControlName]="biome" min="0" max="1" step="0.1">
                <span>{{ configForm.get('biomeWeights.' + biome)?.value | number:'1.1-1' }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" (click)="applyConfiguration()" [disabled]="!configForm.valid">
              Apply Configuration
            </button>
            <button type="button" (click)="resetConfiguration()">
              Reset to Defaults
            </button>
          </div>
        </form>
      </div>

      <!-- Control Panel -->
      <div class="control-panel">
        <h3>Terrain Controls</h3>
        
        <div class="control-group">
          <h4>System Controls</h4>
          <button (click)="initializeTerrain()" [disabled]="isTerrainActive">
            🚀 Initialize Terrain
          </button>
          <button (click)="disposeTerrain()" [disabled]="!isTerrainActive">
            🗑️ Dispose Terrain
          </button>
          <button (click)="clearAllTerrain()" [disabled]="!isTerrainActive">
            🧹 Clear All
          </button>
        </div>

        <div class="control-group">
          <h4>Generation Controls</h4>
          <div class="position-controls">
            <label>Center Position:</label>
            <input type="number" [(ngModel)]="testPosition.q" placeholder="Q">
            <input type="number" [(ngModel)]="testPosition.r" placeholder="R">
            <input type="number" [(ngModel)]="testPosition.s" placeholder="S">
          </div>
          
          <div class="generation-controls">
            <label>Radius:</label>
            <input type="number" [(ngModel)]="generationRadius" min="1" max="20">
            <button (click)="generateTerrainAtPosition()" [disabled]="!isTerrainActive">
              🌱 Generate Terrain
            </button>
          </div>
        </div>

        <div class="control-group">
          <h4>Player Simulation</h4>
          <div class="player-controls">
            <button (click)="simulatePlayerMovement()" [disabled]="!isTerrainActive">
              🚶 Simulate Movement
            </button>
            <button (click)="teleportPlayer()" [disabled]="!isTerrainActive">
              📍 Teleport to Position
            </button>
            <button (click)="startAutoMovement()" [disabled]="autoMovementActive">
              ▶️ Auto Movement
            </button>
            <button (click)="stopAutoMovement()" [disabled]="!autoMovementActive">
              ⏹️ Stop Movement
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Panel -->
      <div class="stats-panel">
        <h3>📊 Terrain Statistics</h3>
        <div class="stats-grid" *ngIf="terrainStats">
          <div class="stat-item">
            <label>Loaded Chunks:</label>
            <span>{{ terrainStats.loadedChunks }}</span>
          </div>
          <div class="stat-item">
            <label>Total Fields:</label>
            <span>{{ terrainStats.totalFields }}</span>
          </div>
          <div class="stat-item">
            <label>Mesh Count:</label>
            <span>{{ terrainStats.meshStats?.meshCount || 0 }}</span>
          </div>
          <div class="stat-item">
            <label>Total Vertices:</label>
            <span>{{ terrainStats.meshStats?.totalVertices || 0 }}</span>
          </div>
          <div class="stat-item">
            <label>Last Event:</label>
            <span>{{ terrainStats.lastEvent }}</span>
          </div>
          <div class="stat-item">
            <label>Performance:</label>
            <span class="performance-indicator" [class]="getPerformanceClass()">
              {{ getPerformanceStatus() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Biome Preview -->
      <div class="biome-preview">
        <h3>🎨 Biome Preview</h3>
        <div class="biome-samples">
          <div class="biome-sample" *ngFor="let biome of biomeTypes" (click)="previewBiome(biome)">
            <div class="biome-color" [style.background-color]="getBiomeColor(biome)"></div>
            <span>{{ biome }}</span>
          </div>
        </div>
      </div>

      <!-- Event Log -->
      <div class="event-log">
        <h3>📝 Event Log</h3>
        <div class="log-controls">
          <button (click)="clearEventLog()">Clear Log</button>
          <button (click)="exportEventLog()">Export Log</button>
          <label>
            <input type="checkbox" [(ngModel)]="autoScroll">
            Auto-scroll
          </label>
        </div>
        <div class="log-container" #logContainer>
          <div class="log-entry" 
               *ngFor="let entry of eventLog; trackBy: trackLogEntry"
               [class]="'log-' + entry.type.toLowerCase()">
            <span class="log-timestamp">{{ entry.timestamp | date:'HH:mm:ss.SSS' }}</span>
            <span class="log-type">{{ entry.type }}</span>
            <span class="log-message">{{ entry.message }}</span>
            <span class="log-data" *ngIf="entry.data">{{ entry.data | json }}</span>
          </div>
        </div>
      </div>

      <!-- Scene Container -->
      <div class="scene-container">
        <h3>🎮 3D Scene</h3>
        <div class="scene-wrapper" #sceneContainer></div>
        <div class="scene-controls">
          <button (click)="resetCamera()">Reset Camera</button>
          <button (click)="toggleWireframe()">Toggle Wireframe</button>
          <button (click)="captureScreenshot()">📸 Screenshot</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terrain-playground {
      padding: 20px;
      display: grid;
      grid-template-columns: 300px 300px 1fr;
      grid-template-rows: auto auto 1fr;
      gap: 20px;
      height: 100vh;
      overflow: hidden;
    }

    .config-panel, .control-panel, .stats-panel {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      overflow-y: auto;
    }

    .scene-container {
      grid-column: 3;
      grid-row: 1 / -1;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }

    .scene-wrapper {
      width: 100%;
      height: calc(100% - 60px);
    }

    .scene-controls {
      position: absolute;
      bottom: 10px;
      left: 10px;
      right: 10px;
      display: flex;
      gap: 10px;
    }

    .scene-controls button {
      flex: 1;
      padding: 8px;
      background: rgba(255,255,255,0.9);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .config-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-section {
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 15px;
    }

    .form-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }

    .form-row label {
      font-weight: 600;
      margin-bottom: 5px;
    }

    .form-row input, .form-row select {
      padding: 6px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    .help-text {
      font-size: 12px;
      color: #6c757d;
      margin-top: 2px;
    }

    .biome-weights {
      margin-top: 10px;
    }

    .weight-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .weight-row label {
      min-width: 80px;
      margin: 0;
    }

    .weight-row input[type="range"] {
      flex: 1;
    }

    .weight-row span {
      min-width: 40px;
      text-align: center;
      font-family: monospace;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .form-actions button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    .form-actions button:first-child {
      background: #007bff;
      color: white;
    }

    .form-actions button:last-child {
      background: #6c757d;
      color: white;
    }

    .form-actions button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .control-group {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
    }

    .control-group h4 {
      margin: 0 0 10px 0;
      color: #495057;
    }

    .control-group button {
      margin: 5px 5px 5px 0;
      padding: 8px 12px;
      border: 1px solid #007bff;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .control-group button:disabled {
      background: #6c757d;
      border-color: #6c757d;
      cursor: not-allowed;
    }

    .position-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .position-controls input {
      width: 60px;
      padding: 4px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    .generation-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .generation-controls input {
      width: 80px;
      padding: 4px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      background: white;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }

    .stat-item label {
      font-weight: 600;
      color: #495057;
    }

    .performance-indicator.good { color: #28a745; }
    .performance-indicator.warning { color: #ffc107; }
    .performance-indicator.critical { color: #dc3545; }

    .biome-preview {
      grid-column: 1 / 3;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
    }

    .biome-samples {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .biome-sample {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      padding: 10px;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .biome-sample:hover {
      background: #e9ecef;
    }

    .biome-color {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-bottom: 8px;
      border: 2px solid #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .event-log {
      grid-column: 1 / 3;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      flex-direction: column;
    }

    .log-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;
    }

    .log-controls button {
      padding: 6px 12px;
      border: 1px solid #007bff;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .log-container {
      flex: 1;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      max-height: 200px;
    }

    .log-entry {
      display: flex;
      margin-bottom: 4px;
      padding: 2px 0;
    }

    .log-timestamp {
      color: #6c757d;
      margin-right: 10px;
      min-width: 80px;
    }

    .log-type {
      margin-right: 10px;
      min-width: 120px;
      font-weight: 600;
    }

    .log-message {
      flex: 1;
      color: #495057;
    }

    .log-data {
      color: #6c757d;
      font-size: 10px;
      margin-left: 10px;
    }

    .log-info .log-type { color: #17a2b8; }
    .log-success .log-type { color: #28a745; }
    .log-warning .log-type { color: #ffc107; }
    .log-error .log-type { color: #dc3545; }
    .log-chunk_loaded .log-type { color: #007bff; }
    .log-player_moved .log-type { color: #6f42c1; }
  `]
})
export class TerrainPlaygroundViewComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild('sceneContainer', { static: false }) sceneContainer!: ElementRef;
  @ViewChild('logContainer', { static: false }) logContainer!: ElementRef;

  public configForm: FormGroup;
  public isTerrainActive = false;
  public autoMovementActive = false;
  public autoScroll = true;
  
  public testPosition: ICubeCoordinates = { q: 0, r: 0, s: 0 };
  public generationRadius = 5;
  
  public biomeTypes = Object.values(BiomeType);
  public terrainStats: any = null;
  public eventLog: Array<{
    timestamp: Date;
    type: string;
    message: string;
    data?: any;
  }> = [];

  private readonly destroy$ = new Subject<void>();
  private autoMovementTimer: any;
  private currentPlayerPosition: ICubeCoordinates = { q: 0, r: 0, s: 0 };

  constructor(
    private readonly fb: FormBuilder,
    private readonly sceneService: SceneService,
    private readonly dynamicTerrain: DynamicTerrainService,
    private readonly terrainGenerator: TerrainGeneratorService,
    private readonly terrainExpansion: TerrainExpansionService,
    private readonly sceneAssetsLoader: SceneAssetsLoaderService
  ) {
    this.configForm = this.createConfigForm();
  }

  ngOnInit(): void {
    this.setupFormWatchers();
    this.setupStatsMonitoring();
    this.setupEventMonitoring();
  }

  ngAfterViewInit(): void {
    this.initializeScene();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutoMovement();
    this.disposeTerrain();
  }

  public async initializeTerrain(): Promise<void> {
    try {
      this.addLogEntry('INFO', 'Initializing terrain system...');
      
      const config = this.buildConfigFromForm();
      await this.dynamicTerrain.initialize(config);
      
      this.isTerrainActive = true;
      this.addLogEntry('SUCCESS', 'Terrain system initialized successfully');
    } catch (error) {
      this.addLogEntry('ERROR', `Terrain initialization failed: ${error}`);
      console.error('Terrain initialization error:', error);
    }
  }

  public disposeTerrain(): void {
    if (this.isTerrainActive) {
      this.dynamicTerrain.dispose();
      this.isTerrainActive = false;
      this.stopAutoMovement();
      this.addLogEntry('INFO', 'Terrain system disposed');
    }
  }

  public async clearAllTerrain(): Promise<void> {
    if (!this.isTerrainActive) return;

    try {
      this.addLogEntry('INFO', 'Clearing all terrain...');
      
      // Get all loaded chunks and unload them
      const chunks = await this.dynamicTerrain.loadedChunks$.pipe(takeUntil(this.destroy$)).toPromise();
      if (chunks) {
        for (const chunkId of chunks.keys()) {
          await this.dynamicTerrain.unloadChunk(chunkId);
        }
      }
      
      this.addLogEntry('SUCCESS', 'All terrain cleared');
    } catch (error) {
      this.addLogEntry('ERROR', `Failed to clear terrain: ${error}`);
    }
  }

  public async generateTerrainAtPosition(): Promise<void> {
    if (!this.isTerrainActive) return;

    try {
      this.addLogEntry('INFO', `Generating terrain at (${this.testPosition.q}, ${this.testPosition.r}, ${this.testPosition.s}) with radius ${this.generationRadius}`);
      
      const fields = await this.terrainGenerator.generateFields(
        this.testPosition,
        this.generationRadius,
        {
          playerPosition: this.currentPlayerPosition,
          loadedChunks: new Map(),
          config: this.buildConfigFromForm(),
          sessionSeed: Date.now()
        }
      );
      
      this.addLogEntry('SUCCESS', `Generated ${fields.length} terrain fields`, { fieldCount: fields.length });
    } catch (error) {
      this.addLogEntry('ERROR', `Terrain generation failed: ${error}`);
    }
  }

  public async simulatePlayerMovement(): Promise<void> {
    if (!this.isTerrainActive) return;

    // Move player in a random direction
    const directions = [
      { q: 1, r: -1, s: 0 },
      { q: 1, r: 0, s: -1 },
      { q: 0, r: 1, s: -1 },
      { q: -1, r: 1, s: 0 },
      { q: -1, r: 0, s: 1 },
      { q: 0, r: -1, s: 1 }
    ];

    const direction = directions[Math.floor(Math.random() * directions.length)];
    this.currentPlayerPosition = {
      q: this.currentPlayerPosition.q + direction.q,
      r: this.currentPlayerPosition.r + direction.r,
      s: this.currentPlayerPosition.s + direction.s
    };

    try {
      await this.dynamicTerrain.updatePlayerPosition(this.currentPlayerPosition);
      this.addLogEntry('PLAYER_MOVED', `Player moved to (${this.currentPlayerPosition.q}, ${this.currentPlayerPosition.r}, ${this.currentPlayerPosition.s})`);
    } catch (error) {
      this.addLogEntry('ERROR', `Player movement failed: ${error}`);
    }
  }

  public async teleportPlayer(): Promise<void> {
    if (!this.isTerrainActive) return;

    this.currentPlayerPosition = { ...this.testPosition };
    
    try {
      await this.dynamicTerrain.updatePlayerPosition(this.currentPlayerPosition);
      this.addLogEntry('PLAYER_MOVED', `Player teleported to (${this.currentPlayerPosition.q}, ${this.currentPlayerPosition.r}, ${this.currentPlayerPosition.s})`);
    } catch (error) {
      this.addLogEntry('ERROR', `Player teleport failed: ${error}`);
    }
  }

  public startAutoMovement(): void {
    if (this.autoMovementActive || !this.isTerrainActive) return;

    this.autoMovementActive = true;
    this.autoMovementTimer = setInterval(() => {
      this.simulatePlayerMovement();
    }, 2000); // Move every 2 seconds

    this.addLogEntry('INFO', 'Auto movement started');
  }

  public stopAutoMovement(): void {
    if (this.autoMovementTimer) {
      clearInterval(this.autoMovementTimer);
      this.autoMovementTimer = null;
    }
    this.autoMovementActive = false;
    this.addLogEntry('INFO', 'Auto movement stopped');
  }

  public applyConfiguration(): void {
    if (!this.configForm.valid) return;

    const config = this.buildConfigFromForm();
    this.addLogEntry('CONFIG', 'Configuration applied', config);

    if (this.isTerrainActive) {
      // Reinitialize with new config
      this.disposeTerrain();
      setTimeout(() => this.initializeTerrain(), 100);
    }
  }

  public resetConfiguration(): void {
    this.configForm.reset();
    this.setDefaultFormValues();
    this.addLogEntry('CONFIG', 'Configuration reset to defaults');
  }

  public randomizeSeed(): void {
    this.configForm.patchValue({
      seed: Math.floor(Math.random() * 1000000)
    });
  }

  public previewBiome(biome: BiomeType): void {
    this.addLogEntry('INFO', `Previewing biome: ${biome}`);
    // Could generate a small preview of the biome
  }

  public getBiomeColor(biome: BiomeType): string {
    const colors = {
      [BiomeType.Plains]: '#7cb342',
      [BiomeType.Forest]: '#2e7d32',
      [BiomeType.Mountains]: '#5d4037',
      [BiomeType.Desert]: '#fdd835',
      [BiomeType.Swamp]: '#4a5d23',
      [BiomeType.Volcanic]: '#d32f2f'
    };
    return colors[biome] || '#666666';
  }

  public clearEventLog(): void {
    this.eventLog = [];
  }

  public exportEventLog(): void {
    const logData = JSON.stringify(this.eventLog, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `terrain-log-${new Date().toISOString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    this.addLogEntry('INFO', 'Event log exported');
  }

  public trackLogEntry(index: number, item: any): any {
    return item.timestamp;
  }

  public resetCamera(): void {
    // Reset 3D camera to default position
    this.addLogEntry('INFO', 'Camera reset');
  }

  public toggleWireframe(): void {
    // Toggle wireframe mode in 3D scene
    this.addLogEntry('INFO', 'Wireframe toggled');
  }

  public captureScreenshot(): void {
    // Capture screenshot of 3D scene
    this.addLogEntry('INFO', 'Screenshot captured');
  }

  public getPerformanceClass(): string {
    if (!this.terrainStats) return '';
    
    const vertices = this.terrainStats.meshStats?.totalVertices || 0;
    if (vertices < 10000) return 'good';
    if (vertices < 50000) return 'warning';
    return 'critical';
  }

  public getPerformanceStatus(): string {
    if (!this.terrainStats) return 'Unknown';
    
    const vertices = this.terrainStats.meshStats?.totalVertices || 0;
    if (vertices < 10000) return 'Good';
    if (vertices < 50000) return 'Warning';
    return 'Critical';
  }

  private createConfigForm(): FormGroup {
    return this.fb.group({
      loadDistance: [8, [Validators.required, Validators.min(1)]],
      unloadDistance: [15, [Validators.required, Validators.min(1)]],
      chunkRadius: [5, [Validators.required, Validators.min(1)]],
      maxLoadedChunks: [20, [Validators.required, Validators.min(1)]],
      updateInterval: [1000, [Validators.required, Validators.min(100)]],
      enableProceduralGeneration: [true],
      seed: [42, [Validators.required]],
      biomeWeights: this.fb.group({
        [BiomeType.Plains]: [0.4, [Validators.min(0), Validators.max(1)]],
        [BiomeType.Forest]: [0.3, [Validators.min(0), Validators.max(1)]],
        [BiomeType.Mountains]: [0.2, [Validators.min(0), Validators.max(1)]],
        [BiomeType.Desert]: [0.1, [Validators.min(0), Validators.max(1)]]
      })
    });
  }

  private setDefaultFormValues(): void {
    this.configForm.patchValue({
      loadDistance: 8,
      unloadDistance: 15,
      chunkRadius: 5,
      maxLoadedChunks: 20,
      updateInterval: 1000,
      enableProceduralGeneration: true,
      seed: 42,
      biomeWeights: {
        [BiomeType.Plains]: 0.4,
        [BiomeType.Forest]: 0.3,
        [BiomeType.Mountains]: 0.2,
        [BiomeType.Desert]: 0.1
      }
    });
  }

  private setupFormWatchers(): void {
    this.configForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300)
    ).subscribe(values => {
      // Auto-normalize biome weights
      this.normalizeBiomeWeights();
    });
  }

  private normalizeBiomeWeights(): void {
    const weights = this.configForm.get('biomeWeights')?.value;
    if (!weights) return;

    const total = Object.values(weights).reduce((sum: number, weight: any) => sum + (Number(weight) || 0), 0);
    const numericTotal = Number(total);
    
    if (Math.abs(numericTotal - 1.0) > 0.01) {
      // Normalize weights to sum to 1.0
      const normalized = {};
      Object.keys(weights).forEach(key => {
        (normalized as any)[key] = numericTotal > 0 ? (Number(weights[key]) || 0) / numericTotal : 0.25;
      });
      
      this.configForm.get('biomeWeights')?.patchValue(normalized, { emitEvent: false });
    }
  }

  private buildConfigFromForm(): IDynamicTerrainConfig {
    const formValue = this.configForm.value;
    
    return {
      loadDistance: formValue.loadDistance,
      unloadDistance: formValue.unloadDistance,
      chunkRadius: formValue.chunkRadius,
      maxLoadedChunks: formValue.maxLoadedChunks,
      updateInterval: formValue.updateInterval,
      enableProceduralGeneration: formValue.enableProceduralGeneration,
      proceduralConfig: {
        seed: formValue.seed,
        biomeWeights: new Map(Object.entries(formValue.biomeWeights).map(([key, value]) => [key as BiomeType, Number(value)])),
        noiseSettings: {
          frequency: 0.1,
          octaves: 4,
          persistence: 0.5,
          lacunarity: 2.0
        },
        featureSpacing: 10
      }
    };
  }

  private setupStatsMonitoring(): void {
    // Monitor terrain statistics
    combineLatest([
      this.dynamicTerrain.loadedChunks$,
      this.terrainExpansion.expansionEvents$
    ]).pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    ).subscribe(([chunks, lastEvent]) => {
      this.terrainStats = {
        loadedChunks: chunks.size,
        totalFields: Array.from(chunks.values()).reduce((sum, chunk) => sum + chunk.fields.length, 0),
        lastEvent: lastEvent?.type || 'none',
        meshStats: this.terrainExpansion.getTerrainStats()
      };
    });
  }

  private setupEventMonitoring(): void {
    // Monitor terrain events
    this.dynamicTerrain.events$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      this.handleTerrainEvent(event);
    });

    // Monitor expansion events
    this.terrainExpansion.expansionEvents$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      this.addLogEntry(event.type.toUpperCase(), `Mesh ${event.meshId}: ${this.formatExpansionEvent(event)}`);
    });
  }

  private handleTerrainEvent(event: ITerrainEvent): void {
    let message = '';
    let data: any = undefined;

    switch (event.type) {
      case TerrainEventType.ChunkLoaded:
        message = `Chunk ${event.chunkId} loaded with ${event.chunk?.fields.length || 0} fields`;
        data = { chunkId: event.chunkId, fieldCount: event.chunk?.fields.length };
        break;
      case TerrainEventType.ChunkUnloaded:
        message = `Chunk ${event.chunkId} unloaded`;
        data = { chunkId: event.chunkId };
        break;
      case TerrainEventType.ChunkError:
        message = `Chunk ${event.chunkId} error: ${event.error?.message}`;
        data = { chunkId: event.chunkId, error: event.error?.message };
        break;
      case TerrainEventType.PlayerMoved:
        message = 'Player position updated, terrain system active';
        break;
      case TerrainEventType.TerrainGenerated:
        message = `Generated ${event.fields?.length || 0} terrain fields`;
        data = { fieldCount: event.fields?.length };
        break;
      default:
        message = `Unknown event: ${event.type}`;
    }

    this.addLogEntry(event.type, message, data);
  }

  private formatExpansionEvent(event: any): string {
    switch (event.type) {
      case 'expansion_completed':
        return `expanded to ${event.instanceCount} instances`;
      case 'expansion_failed':
        return `expansion failed: ${event.error?.message}`;
      default:
        return event.type.replace('_', ' ');
    }
  }

  private addLogEntry(type: string, message: string, data?: any): void {
    this.eventLog.unshift({
      timestamp: new Date(),
      type,
      message,
      data
    });

    // Keep log size manageable
    if (this.eventLog.length > 1000) {
      this.eventLog = this.eventLog.slice(0, 1000);
    }

    // Auto-scroll to top if enabled
    if (this.autoScroll && this.logContainer) {
      setTimeout(() => {
        this.logContainer.nativeElement.scrollTop = 0;
      }, 10);
    }
  }

  private async initializeScene(): Promise<void> {
    try {
      // Initialize the 3D scene
      await this.sceneService.createScene(this.sceneAssetsLoader);
      this.sceneService.initializeScene(this.sceneContainer.nativeElement);
      
      this.addLogEntry('INFO', '3D Scene initialized');
    } catch (error) {
      this.addLogEntry('ERROR', `Scene initialization failed: ${error}`);
      console.error('Scene initialization error:', error);
    }
  }
}