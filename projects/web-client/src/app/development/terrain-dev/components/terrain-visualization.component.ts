import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { DynamicTerrainService, TerrainGeneratorService } from '../../../core/terrain/api';
import { ITerrainField, BiomeType, TerrainType } from '../../../core/terrain/interfaces/dynamic-terrain.interface';
import { mapCubeCoordsTo3dCoords } from '../../../core/scene/misc/coords-mappings';
import { HexagonHelper } from '../../../core/scene/misc/hexagon.helper';
import { HEXAGON_RADIUS } from '../../../core/scene/constants/hexagon.constants';

@Component({
  selector: 'app-terrain-visualization',
  template: `
    <div class="terrain-visualization">
      <h2>🗺️ Terrain Visualization</h2>
      
      <!-- Controls Panel -->
      <div class="controls-panel">
        <div class="control-group">
          <h3>Generation Controls</h3>
          <div class="input-row">
            <label>Center Position:</label>
            <input type="number" [(ngModel)]="centerPosition.q" placeholder="Q">
            <input type="number" [(ngModel)]="centerPosition.r" placeholder="R">
            <input type="number" [(ngModel)]="centerPosition.s" placeholder="S">
          </div>
          
          <div class="input-row">
            <label>Radius:</label>
            <input type="number" [(ngModel)]="generationRadius" min="1" max="20">
            <button (click)="generateTerrain()">Generate</button>
          </div>
          
          <div class="input-row">
            <label>Seed:</label>
            <input type="number" [(ngModel)]="seed">
            <button (click)="randomizeSeed()">Random</button>
          </div>
        </div>

        <div class="control-group">
          <h3>View Options</h3>
          <div class="checkbox-row">
            <label><input type="checkbox" [(ngModel)]="viewOptions.showCoordinates">Show Coordinates</label>
            <label><input type="checkbox" [(ngModel)]="viewOptions.showBiomes">Show Biomes</label>
            <label><input type="checkbox" [(ngModel)]="viewOptions.showHeights">Show Heights</label>
            <label><input type="checkbox" [(ngModel)]="viewOptions.showWalkable">Show Walkable</label>
          </div>
          
          <div class="input-row">
            <label>Visualization Mode:</label>
            <select [(ngModel)]="visualizationMode" (change)="updateVisualization()">
              <option value="terrain">Terrain Type</option>
              <option value="biome">Biome</option>
              <option value="height">Height Map</option>
              <option value="walkable">Walkability</option>
            </select>
          </div>
        </div>

        <div class="control-group">
          <h3>Export</h3>
          <button (click)="exportTerrainData()">📄 Export Data</button>
          <button (click)="exportVisualization()">🖼️ Export Image</button>
          <button (click)="clearVisualization()">🧹 Clear</button>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend-panel">
        <h3>Legend</h3>
        <div class="legend-content" [ngSwitch]="visualizationMode">
          
          <!-- Terrain Type Legend -->
          <div *ngSwitchCase="'terrain'" class="legend-items">
            <div class="legend-item" *ngFor="let type of terrainTypes">
              <div class="legend-color" [style.background-color]="getTerrainTypeColor(type)"></div>
              <span>{{ type }}</span>
            </div>
          </div>
          
          <!-- Biome Legend -->
          <div *ngSwitchCase="'biome'" class="legend-items">
            <div class="legend-item" *ngFor="let biome of biomeTypes">
              <div class="legend-color" [style.background-color]="getBiomeColor(biome)"></div>
              <span>{{ biome }}</span>
            </div>
          </div>
          
          <!-- Height Legend -->
          <div *ngSwitchCase="'height'" class="legend-items">
            <div class="height-gradient"></div>
            <div class="height-labels">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          <!-- Walkable Legend -->
          <div *ngSwitchCase="'walkable'" class="legend-items">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #28a745;"></div>
              <span>Walkable</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #dc3545;"></div>
              <span>Non-walkable</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Visualization Canvas -->
      <div class="visualization-container">
        <div class="canvas-wrapper">
          <canvas #visualizationCanvas 
                  width="800" 
                  height="600"
                  (mousemove)="onCanvasMouseMove($event)"
                  (click)="onCanvasClick($event)">
          </canvas>
          
          <!-- Overlay Info -->
          <div class="canvas-overlay" *ngIf="hoveredField">
            <div class="field-info">
              <div><strong>Position:</strong> ({{ hoveredField.position.q }}, {{ hoveredField.position.r }}, {{ hoveredField.position.s }})</div>
              <div><strong>Terrain:</strong> {{ hoveredField.terrainType }}</div>
              <div><strong>Biome:</strong> {{ hoveredField.biome?.type }}</div>
              <div><strong>Height:</strong> {{ hoveredField.visual.offsetY | number:'1.2-2' }}</div>
              <div><strong>Walkable:</strong> {{ hoveredField.isWalkable ? 'Yes' : 'No' }}</div>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="stats-panel">
          <h4>Generation Statistics</h4>
          <div class="stat-row">
            <span>Total Fields:</span>
            <span>{{ generatedFields.length }}</span>
          </div>
          <div class="stat-row">
            <span>Walkable Fields:</span>
            <span>{{ walkableFieldCount }}</span>
          </div>
          <div class="stat-row">
            <span>Average Height:</span>
            <span>{{ averageHeight | number:'1.2-2' }}</span>
          </div>
          
          <h5>Terrain Distribution</h5>
          <div class="distribution-chart">
            <div class="distribution-item" *ngFor="let item of terrainDistribution">
              <div class="distribution-bar" 
                   [style.width.%]="item.percentage"
                   [style.background-color]="getTerrainTypeColor(item.type)">
              </div>
              <span class="distribution-label">{{ item.type }} ({{ item.count }})</span>
            </div>
          </div>
          
          <h5>Biome Distribution</h5>
          <div class="distribution-chart">
            <div class="distribution-item" *ngFor="let item of biomeDistribution">
              <div class="distribution-bar" 
                   [style.width.%]="item.percentage"
                   [style.background-color]="getBiomeColor(item.biome)">
              </div>
              <span class="distribution-label">{{ item.biome }} ({{ item.count }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terrain-visualization {
      padding: 20px;
      display: grid;
      grid-template-columns: 300px 200px 1fr;
      grid-template-rows: auto 1fr;
      gap: 20px;
      height: 100vh;
      overflow: hidden;
    }

    .controls-panel {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      overflow-y: auto;
    }

    .legend-panel {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      overflow-y: auto;
    }

    .visualization-container {
      grid-column: 3;
      grid-row: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .canvas-wrapper {
      position: relative;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      flex: 1;
    }

    canvas {
      width: 100%;
      height: 100%;
      cursor: crosshair;
    }

    .canvas-overlay {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
    }

    .field-info div {
      margin-bottom: 4px;
    }

    .control-group {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #dee2e6;
    }

    .control-group:last-child {
      border-bottom: none;
    }

    .control-group h3 {
      margin: 0 0 10px 0;
      color: #495057;
      font-size: 16px;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .input-row label {
      min-width: 80px;
      font-weight: 500;
      color: #495057;
    }

    .input-row input, .input-row select {
      padding: 4px 8px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    .input-row input[type="number"] {
      width: 60px;
    }

    .input-row button {
      padding: 4px 12px;
      border: 1px solid #007bff;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .checkbox-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .checkbox-row label {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #495057;
    }

    .checkbox-row input[type="checkbox"] {
      margin-right: 8px;
    }

    .legend-items {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }

    .height-gradient {
      height: 20px;
      background: linear-gradient(to right, #000080, #0000ff, #00ffff, #00ff00, #ffff00, #ff8000, #ff0000);
      border-radius: 4px;
      border: 1px solid #dee2e6;
      margin-bottom: 5px;
    }

    .height-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6c757d;
    }

    .stats-panel {
      background: white;
      border-radius: 8px;
      padding: 15px;
      max-height: 300px;
      overflow-y: auto;
    }

    .stats-panel h4, .stats-panel h5 {
      margin: 0 0 10px 0;
      color: #495057;
    }

    .stats-panel h5 {
      margin-top: 15px;
      font-size: 14px;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 14px;
    }

    .distribution-chart {
      margin-bottom: 15px;
    }

    .distribution-item {
      margin-bottom: 8px;
    }

    .distribution-bar {
      height: 16px;
      border-radius: 2px;
      margin-bottom: 2px;
    }

    .distribution-label {
      font-size: 12px;
      color: #6c757d;
    }
  `]
})
export class TerrainVisualizationComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild('visualizationCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  public centerPosition: ICubeCoordinates = { q: 0, r: 0, s: 0 };
  public generationRadius = 8;
  public seed = 42;
  
  public visualizationMode: 'terrain' | 'biome' | 'height' | 'walkable' = 'terrain';
  public viewOptions = {
    showCoordinates: false,
    showBiomes: true,
    showHeights: false,
    showWalkable: false
  };

  public generatedFields: ITerrainField[] = [];
  public hoveredField: ITerrainField | null = null;
  
  public terrainTypes = Object.values(TerrainType);
  public biomeTypes = Object.values(BiomeType);

  public get walkableFieldCount(): number {
    return this.generatedFields.filter(f => f.isWalkable).length;
  }

  public get averageHeight(): number {
    if (this.generatedFields.length === 0) return 0;
    const totalHeight = this.generatedFields.reduce((sum, f) => sum + (f.visual.offsetY || 0), 0);
    return totalHeight / this.generatedFields.length;
  }

  public get terrainDistribution(): Array<{ type: TerrainType; count: number; percentage: number }> {
    const counts = new Map<TerrainType, number>();
    this.generatedFields.forEach(field => {
      counts.set(field.terrainType, (counts.get(field.terrainType) || 0) + 1);
    });

    return Array.from(counts.entries()).map(([type, count]) => ({
      type,
      count,
      percentage: (count / this.generatedFields.length) * 100
    }));
  }

  public get biomeDistribution(): Array<{ biome: BiomeType; count: number; percentage: number }> {
    const counts = new Map<BiomeType, number>();
    this.generatedFields.forEach(field => {
      if (field.biome) {
        counts.set(field.biome.type, (counts.get(field.biome.type) || 0) + 1);
      }
    });

    return Array.from(counts.entries()).map(([biome, count]) => ({
      biome,
      count,
      percentage: (count / this.generatedFields.length) * 100
    }));
  }

  private readonly destroy$ = new Subject<void>();
  private canvasContext: CanvasRenderingContext2D | null = null;
  private hexRadius = 20;
  private canvasOffset = { x: 0, y: 0 };

  constructor(
    private readonly terrainGenerator: TerrainGeneratorService
  ) {}

  ngOnInit(): void {
    // Initial terrain generation
    this.generateTerrain();
  }

  ngAfterViewInit(): void {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
    this.updateVisualization();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async generateTerrain(): Promise<void> {
    try {
      const context = {
        playerPosition: this.centerPosition,
        loadedChunks: new Map(),
        config: {
          enableProceduralGeneration: true,
          proceduralConfig: {
            seed: this.seed,
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
        } as any,
        sessionSeed: this.seed
      };

      this.generatedFields = await this.terrainGenerator.generateFields(
        this.centerPosition,
        this.generationRadius,
        context
      );

      this.updateVisualization();
    } catch (error) {
      console.error('Terrain generation failed:', error);
    }
  }

  public randomizeSeed(): void {
    this.seed = Math.floor(Math.random() * 1000000);
  }

  public updateVisualization(): void {
    if (!this.canvasContext) return;

    this.clearCanvas();
    this.drawTerrain();
  }

  public onCanvasMouseMove(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    // Convert canvas coordinates to hex coordinates
    this.hoveredField = this.getFieldAtCanvasPosition(canvasX, canvasY);
  }

  public onCanvasClick(event: MouseEvent): void {
    if (this.hoveredField) {
      console.log('Clicked field:', this.hoveredField);
    }
  }

  public exportTerrainData(): void {
    const data = {
      centerPosition: this.centerPosition,
      radius: this.generationRadius,
      seed: this.seed,
      fields: this.generatedFields,
      statistics: {
        totalFields: this.generatedFields.length,
        walkableFields: this.walkableFieldCount,
        averageHeight: this.averageHeight,
        terrainDistribution: this.terrainDistribution,
        biomeDistribution: this.biomeDistribution
      },
      exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `terrain-data-${new Date().toISOString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  public exportVisualization(): void {
    if (!this.canvas) return;

    const link = document.createElement('a');
    link.download = `terrain-visualization-${new Date().toISOString()}.png`;
    link.href = this.canvas.nativeElement.toDataURL();
    link.click();
  }

  public clearVisualization(): void {
    this.generatedFields = [];
    this.hoveredField = null;
    this.clearCanvas();
  }

  public getTerrainTypeColor(type: TerrainType): string {
    const colors = {
      [TerrainType.Grass]: '#7cb342',
      [TerrainType.Stone]: '#9e9e9e',
      [TerrainType.Water]: '#2196f3',
      [TerrainType.Sand]: '#fdd835',
      [TerrainType.Rock]: '#5d4037',
      [TerrainType.Void]: '#212121'
    };
    return colors[type] || '#666666';
  }

  public getBiomeColor(biome: BiomeType): string {
    const colors = {
      [BiomeType.Plains]: '#8bc34a',
      [BiomeType.Forest]: '#4caf50',
      [BiomeType.Mountains]: '#795548',
      [BiomeType.Desert]: '#ff9800',
      [BiomeType.Swamp]: '#689f38',
      [BiomeType.Volcanic]: '#f44336'
    };
    return colors[biome] || '#666666';
  }

  private clearCanvas(): void {
    if (!this.canvasContext) return;

    const canvas = this.canvas.nativeElement;
    this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill with background color
    this.canvasContext.fillStyle = '#f5f5f5';
    this.canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }

  private drawTerrain(): void {
    if (!this.canvasContext) return;

    const canvas = this.canvas.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculate canvas offset to center the terrain
    this.canvasOffset = { x: centerX, y: centerY };

    // Draw each terrain field
    this.generatedFields.forEach(field => {
      this.drawHexagon(field);
    });

    // Draw grid lines if needed
    if (this.viewOptions.showCoordinates) {
      this.drawGrid();
    }
  }

  private drawHexagon(field: ITerrainField): void {
    if (!this.canvasContext) return;

    // Convert cube coordinates to pixel position
    const worldPos = mapCubeCoordsTo3dCoords(field.position);
    const hexPos = HexagonHelper.calculatePositionInGrid(worldPos, HEXAGON_RADIUS);
    
    const pixelX = this.canvasOffset.x + hexPos.x * 2;
    const pixelY = this.canvasOffset.y + hexPos.z * 2;

    // Generate hexagon points
    const points = this.generateHexagonPoints(pixelX, pixelY, this.hexRadius);

    // Determine fill color based on visualization mode
    let fillColor = '#ffffff';
    switch (this.visualizationMode) {
      case 'terrain':
        fillColor = this.getTerrainTypeColor(field.terrainType);
        break;
      case 'biome':
        fillColor = field.biome ? this.getBiomeColor(field.biome.type) : '#cccccc';
        break;
      case 'height':
        fillColor = this.getHeightColor(field.visual.offsetY || 0);
        break;
      case 'walkable':
        fillColor = field.isWalkable ? '#28a745' : '#dc3545';
        break;
    }

    // Draw hexagon
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.canvasContext.lineTo(points[i].x, points[i].y);
    }
    this.canvasContext.closePath();

    // Fill
    this.canvasContext.fillStyle = fillColor;
    this.canvasContext.fill();

    // Stroke
    this.canvasContext.strokeStyle = '#333333';
    this.canvasContext.lineWidth = 1;
    this.canvasContext.stroke();

    // Draw coordinates if enabled
    if (this.viewOptions.showCoordinates) {
      this.canvasContext.fillStyle = '#000000';
      this.canvasContext.font = '10px Arial';
      this.canvasContext.textAlign = 'center';
      this.canvasContext.fillText(
        `${field.position.q},${field.position.r}`,
        pixelX,
        pixelY
      );
    }
  }

  private generateHexagonPoints(centerX: number, centerY: number, radius: number): Array<{ x: number; y: number }> {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }
    return points;
  }

  private getHeightColor(height: number): string {
    // Normalize height to 0-1 range (assuming heights are between -1 and 1)
    const normalizedHeight = Math.max(0, Math.min(1, (height + 1) / 2));
    
    // Create color gradient from blue (low) to red (high)
    const red = Math.floor(255 * normalizedHeight);
    const blue = Math.floor(255 * (1 - normalizedHeight));
    const green = Math.floor(128 * Math.sin(normalizedHeight * Math.PI));
    
    return `rgb(${red}, ${green}, ${blue})`;
  }

  private getFieldAtCanvasPosition(canvasX: number, canvasY: number): ITerrainField | null {
    // Convert canvas position to hex coordinates and find matching field
    for (const field of this.generatedFields) {
      const worldPos = mapCubeCoordsTo3dCoords(field.position);
      const hexPos = HexagonHelper.calculatePositionInGrid(worldPos, HEXAGON_RADIUS);
      
      const pixelX = this.canvasOffset.x + hexPos.x * 2;
      const pixelY = this.canvasOffset.y + hexPos.z * 2;

      // Check if point is inside hexagon
      const distance = Math.sqrt(
        Math.pow(canvasX - pixelX, 2) + Math.pow(canvasY - pixelY, 2)
      );

      if (distance <= this.hexRadius) {
        return field;
      }
    }

    return null;
  }

  private drawGrid(): void {
    // Implementation for drawing coordinate grid
    // This would draw lines and coordinate labels
  }
}