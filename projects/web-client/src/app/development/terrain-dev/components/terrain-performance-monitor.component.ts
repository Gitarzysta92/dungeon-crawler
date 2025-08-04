import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { DynamicTerrainService, TerrainExpansionService } from '../../../core/terrain/api';

interface IPerformanceMetrics {
  timestamp: number;
  fps: number;
  memoryUsed: number;
  loadedChunks: number;
  totalFields: number;
  totalVertices: number;
  renderTime: number;
  chunkLoadTime: number;
}

@Component({
  selector: 'app-terrain-performance-monitor',
  template: `
    <div class="performance-monitor">
      <h3>⚡ Performance Monitor</h3>
      
      <!-- Real-time Metrics -->
      <div class="metrics-grid">
        <div class="metric-card" [class.warning]="currentMetrics?.fps && currentMetrics.fps < 30">
          <div class="metric-value">{{ currentMetrics?.fps || 0 | number:'1.0-0' }}</div>
          <div class="metric-label">FPS</div>
        </div>
        
        <div class="metric-card" [class.warning]="currentMetrics?.memoryUsed && currentMetrics.memoryUsed > 100">
          <div class="metric-value">{{ (currentMetrics?.memoryUsed || 0) | number:'1.1-1' }}</div>
          <div class="metric-label">Memory (MB)</div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ currentMetrics?.loadedChunks || 0 }}</div>
          <div class="metric-label">Chunks</div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ currentMetrics?.totalFields || 0 }}</div>
          <div class="metric-label">Fields</div>
        </div>
        
        <div class="metric-card" [class.warning]="currentMetrics?.totalVertices && currentMetrics.totalVertices > 50000">
          <div class="metric-value">{{ (currentMetrics?.totalVertices || 0) | number:'1.0-0' }}</div>
          <div class="metric-label">Vertices</div>
        </div>
        
        <div class="metric-card">
          <div class="metric-value">{{ (currentMetrics?.renderTime || 0) | number:'1.1-1' }}</div>
          <div class="metric-label">Render (ms)</div>
        </div>
      </div>

      <!-- Performance Chart -->
      <div class="chart-container">
        <h4>Performance History</h4>
        <div class="chart-controls">
          <button (click)="clearHistory()">Clear History</button>
          <button (click)="exportMetrics()">Export Data</button>
          <select [(ngModel)]="chartMetric" (change)="updateChart()">
            <option value="fps">FPS</option>
            <option value="memoryUsed">Memory Usage</option>
            <option value="totalVertices">Vertex Count</option>
            <option value="renderTime">Render Time</option>
          </select>
        </div>
        
        <div class="chart" #chartCanvas>
          <canvas #performanceChart width="600" height="200"></canvas>
        </div>
      </div>

      <!-- Performance Warnings -->
      <div class="warnings-panel" *ngIf="performanceWarnings.length > 0">
        <h4>⚠️ Performance Warnings</h4>
        <div class="warning-item" *ngFor="let warning of performanceWarnings">
          <span class="warning-type">{{ warning.type }}</span>
          <span class="warning-message">{{ warning.message }}</span>
          <span class="warning-time">{{ warning.timestamp | date:'HH:mm:ss' }}</span>
        </div>
      </div>

      <!-- Optimization Suggestions -->
      <div class="suggestions-panel">
        <h4>💡 Optimization Suggestions</h4>
        <div class="suggestion-item" *ngFor="let suggestion of optimizationSuggestions">
          <div class="suggestion-title">{{ suggestion.title }}</div>
          <div class="suggestion-description">{{ suggestion.description }}</div>
          <button *ngIf="suggestion.action" (click)="applySuggestion(suggestion)">
            Apply
          </button>
        </div>
      </div>

      <!-- Memory Profiler -->
      <div class="memory-profiler">
        <h4>🧠 Memory Profile</h4>
        <div class="memory-breakdown">
          <div class="memory-item">
            <span class="memory-label">Terrain Geometries:</span>
            <span class="memory-value">{{ memoryProfile.geometries | number:'1.1-1' }} MB</span>
          </div>
          <div class="memory-item">
            <span class="memory-label">Textures:</span>
            <span class="memory-value">{{ memoryProfile.textures | number:'1.1-1' }} MB</span>
          </div>
          <div class="memory-item">
            <span class="memory-label">Instance Matrices:</span>
            <span class="memory-value">{{ memoryProfile.instances | number:'1.1-1' }} MB</span>
          </div>
          <div class="memory-item">
            <span class="memory-label">Scene Objects:</span>
            <span class="memory-value">{{ memoryProfile.sceneObjects | number:'1.1-1' }} MB</span>
          </div>
        </div>
        
        <button (click)="forceGarbageCollection()">🗑️ Force GC</button>
        <button (click)="profileMemory()">📊 Profile Memory</button>
      </div>

      <!-- Settings -->
      <div class="monitor-settings">
        <h4>⚙️ Monitor Settings</h4>
        <div class="setting-row">
          <label>
            <input type="checkbox" [(ngModel)]="settings.enableMonitoring">
            Enable Performance Monitoring
          </label>
        </div>
        <div class="setting-row">
          <label>Update Interval (ms):</label>
          <input type="number" [(ngModel)]="settings.updateInterval" 
                 min="100" max="5000" (change)="updateMonitoringInterval()">
        </div>
        <div class="setting-row">
          <label>History Length:</label>
          <input type="number" [(ngModel)]="settings.historyLength" 
                 min="10" max="1000" (change)="trimHistory()">
        </div>
        <div class="setting-row">
          <label>
            <input type="checkbox" [(ngModel)]="settings.showWarnings">
            Show Performance Warnings
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .performance-monitor {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      max-height: 100vh;
      overflow-y: auto;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .metric-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #e9ecef;
      transition: border-color 0.3s;
    }

    .metric-card.warning {
      border-color: #ffc107;
      background: #fff3cd;
    }

    .metric-value {
      font-size: 24px;
      font-weight: bold;
      color: #495057;
    }

    .metric-label {
      font-size: 12px;
      color: #6c757d;
      margin-top: 5px;
    }

    .chart-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .chart-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      align-items: center;
    }

    .chart-controls button {
      padding: 6px 12px;
      border: 1px solid #007bff;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .chart-controls select {
      padding: 6px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    .chart {
      position: relative;
      width: 100%;
      height: 200px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
    }

    .warnings-panel {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .warning-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #ffeaa7;
    }

    .warning-item:last-child {
      border-bottom: none;
    }

    .warning-type {
      font-weight: bold;
      color: #856404;
    }

    .warning-message {
      flex: 1;
      margin: 0 10px;
      color: #856404;
    }

    .warning-time {
      font-size: 12px;
      color: #856404;
    }

    .suggestions-panel {
      background: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .suggestion-item {
      padding: 10px;
      border: 1px solid #e9ecef;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .suggestion-title {
      font-weight: bold;
      color: #495057;
      margin-bottom: 5px;
    }

    .suggestion-description {
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 10px;
    }

    .suggestion-item button {
      padding: 4px 8px;
      border: 1px solid #28a745;
      background: #28a745;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .memory-profiler {
      background: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .memory-breakdown {
      margin-bottom: 15px;
    }

    .memory-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #e9ecef;
    }

    .memory-item:last-child {
      border-bottom: none;
    }

    .memory-label {
      color: #495057;
    }

    .memory-value {
      font-weight: bold;
      color: #007bff;
    }

    .memory-profiler button {
      margin-right: 10px;
      padding: 6px 12px;
      border: 1px solid #6c757d;
      background: #6c757d;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .monitor-settings {
      background: white;
      border-radius: 8px;
      padding: 15px;
    }

    .setting-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      gap: 10px;
    }

    .setting-row label {
      color: #495057;
      font-weight: 500;
    }

    .setting-row input[type="number"] {
      width: 80px;
      padding: 4px 8px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    .setting-row input[type="checkbox"] {
      margin-right: 8px;
    }
  `]
})
export class TerrainPerformanceMonitorComponent implements OnInit, OnDestroy {
  
  public currentMetrics: IPerformanceMetrics | null = null;
  public chartMetric: keyof IPerformanceMetrics = 'fps';
  public performanceWarnings: Array<{
    type: string;
    message: string;
    timestamp: Date;
  }> = [];
  
  public optimizationSuggestions: Array<{
    title: string;
    description: string;
    action?: string;
  }> = [];

  public memoryProfile = {
    geometries: 0,
    textures: 0,
    instances: 0,
    sceneObjects: 0
  };

  public settings = {
    enableMonitoring: true,
    updateInterval: 1000,
    historyLength: 100,
    showWarnings: true
  };

  private readonly destroy$ = new Subject<void>();
  private metricsHistory: IPerformanceMetrics[] = [];
  private lastFrameTime = performance.now();
  private frameCount = 0;
  private monitoringTimer: any;

  constructor(
    private readonly dynamicTerrain: DynamicTerrainService,
    private readonly terrainExpansion: TerrainExpansionService
  ) {}

  ngOnInit(): void {
    this.initializeMonitoring();
    this.generateOptimizationSuggestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopMonitoring();
  }

  public clearHistory(): void {
    this.metricsHistory = [];
    this.performanceWarnings = [];
    this.updateChart();
  }

  public exportMetrics(): void {
    const data = {
      metrics: this.metricsHistory,
      warnings: this.performanceWarnings,
      settings: this.settings,
      exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `terrain-performance-${new Date().toISOString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  public updateChart(): void {
    // Implementation would draw performance chart using Canvas API
    // This is a placeholder for the actual chart rendering logic
    console.log(`Updating chart for metric: ${this.chartMetric}`);
  }

  public applySuggestion(suggestion: any): void {
    console.log(`Applying suggestion: ${suggestion.title}`);
    
    // Implement specific optimization actions
    switch (suggestion.action) {
      case 'reduce_chunk_size':
        this.applyChunkSizeReduction();
        break;
      case 'increase_unload_distance':
        this.increaseUnloadDistance();
        break;
      case 'optimize_geometry':
        this.optimizeGeometry();
        break;
    }
  }

  public forceGarbageCollection(): void {
    // Force garbage collection if available (development only)
    if ('gc' in window) {
      (window as any).gc();
    }
    
    // Manually clean up any unused resources
    this.profileMemory();
  }

  public profileMemory(): void {
    // Estimate memory usage of different components
    const stats = this.terrainExpansion.getTerrainStats();
    
    this.memoryProfile = {
      geometries: this.estimateGeometryMemory(stats),
      textures: this.estimateTextureMemory(),
      instances: this.estimateInstanceMemory(stats),
      sceneObjects: this.estimateSceneObjectMemory()
    };
  }

  public updateMonitoringInterval(): void {
    this.stopMonitoring();
    this.startMonitoring();
  }

  public trimHistory(): void {
    if (this.metricsHistory.length > this.settings.historyLength) {
      this.metricsHistory = this.metricsHistory.slice(-this.settings.historyLength);
    }
  }

  private initializeMonitoring(): void {
    this.startMonitoring();
    this.setupWarningDetection();
  }

  private startMonitoring(): void {
    if (!this.settings.enableMonitoring || this.monitoringTimer) return;

    this.monitoringTimer = setInterval(() => {
      this.collectMetrics();
    }, this.settings.updateInterval);
  }

  private stopMonitoring(): void {
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
      this.monitoringTimer = null;
    }
  }

  private collectMetrics(): void {
    const now = performance.now();
    
    // Calculate FPS
    this.frameCount++;
    const deltaTime = now - this.lastFrameTime;
    const fps = deltaTime > 0 ? 1000 / deltaTime : 0;
    
    if (this.frameCount % 10 === 0) { // Update FPS every 10 frames
      this.lastFrameTime = now;
    }

    // Get terrain statistics
    const terrainStats = this.terrainExpansion.getTerrainStats();
    
    // Estimate memory usage
    const memoryUsed = this.estimateMemoryUsage();
    
    const metrics: IPerformanceMetrics = {
      timestamp: now,
      fps: Math.round(fps),
      memoryUsed,
      loadedChunks: 0, // Would be populated from terrain service
      totalFields: 0,  // Would be populated from terrain service
      totalVertices: terrainStats.totalVertices,
      renderTime: this.measureRenderTime(),
      chunkLoadTime: 0 // Would be measured during actual chunk loading
    };

    this.currentMetrics = metrics;
    this.metricsHistory.push(metrics);
    
    // Trim history to configured length
    this.trimHistory();
    
    // Check for performance warnings
    this.checkPerformanceWarnings(metrics);
  }

  private estimateMemoryUsage(): number {
    // Estimate memory usage in MB
    // This is a rough approximation
    const stats = this.terrainExpansion.getTerrainStats();
    
    // Rough estimates based on typical 3D data sizes
    const vertexMemory = stats.totalVertices * 32; // bytes per vertex (position + normal + uv + color)
    const instanceMemory = stats.totalInstances * 64; // bytes per instance matrix
    const textureMemory = 4 * 1024 * 1024; // Assume 4MB of textures
    
    return (vertexMemory + instanceMemory + textureMemory) / (1024 * 1024);
  }

  private measureRenderTime(): number {
    // This would measure actual render time in a real implementation
    // For now, return a simulated value
    return Math.random() * 16.67; // Simulated render time up to 16.67ms (60fps budget)
  }

  private setupWarningDetection(): void {
    // Monitor metrics for performance issues
    interval(5000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (!this.settings.showWarnings || !this.currentMetrics) return;
      
      this.checkPerformanceWarnings(this.currentMetrics);
    });
  }

  private checkPerformanceWarnings(metrics: IPerformanceMetrics): void {
    const warnings: Array<{ type: string; message: string; timestamp: Date }> = [];

    // FPS warnings
    if (metrics.fps < 30) {
      warnings.push({
        type: 'LOW_FPS',
        message: `Low FPS detected: ${metrics.fps} (target: 60)`,
        timestamp: new Date()
      });
    }

    // Memory warnings
    if (metrics.memoryUsed > 100) {
      warnings.push({
        type: 'HIGH_MEMORY',
        message: `High memory usage: ${metrics.memoryUsed.toFixed(1)}MB`,
        timestamp: new Date()
      });
    }

    // Vertex count warnings
    if (metrics.totalVertices > 50000) {
      warnings.push({
        type: 'HIGH_VERTEX_COUNT',
        message: `High vertex count: ${metrics.totalVertices} (consider LOD)`,
        timestamp: new Date()
      });
    }

    // Render time warnings
    if (metrics.renderTime > 16.67) {
      warnings.push({
        type: 'SLOW_RENDER',
        message: `Slow render time: ${metrics.renderTime.toFixed(1)}ms (budget: 16.67ms)`,
        timestamp: new Date()
      });
    }

    // Add new warnings
    warnings.forEach(warning => {
      // Avoid duplicate warnings
      const isDuplicate = this.performanceWarnings.some(existing => 
        existing.type === warning.type && 
        Math.abs(existing.timestamp.getTime() - warning.timestamp.getTime()) < 30000
      );
      
      if (!isDuplicate) {
        this.performanceWarnings.unshift(warning);
      }
    });

    // Keep only recent warnings (last 50)
    this.performanceWarnings = this.performanceWarnings.slice(0, 50);
  }

  private generateOptimizationSuggestions(): void {
    this.optimizationSuggestions = [
      {
        title: 'Reduce Chunk Size',
        description: 'Smaller chunks reduce memory usage but increase loading frequency',
        action: 'reduce_chunk_size'
      },
      {
        title: 'Increase Unload Distance',
        description: 'Unload distant terrain more aggressively to save memory',
        action: 'increase_unload_distance'
      },
      {
        title: 'Optimize Geometry',
        description: 'Use instanced rendering and geometry merging for better performance',
        action: 'optimize_geometry'
      },
      {
        title: 'Enable Level of Detail (LOD)',
        description: 'Use simpler geometry for distant terrain to reduce vertex count'
      },
      {
        title: 'Texture Streaming',
        description: 'Load high-resolution textures only when needed'
      },
      {
        title: 'Occlusion Culling',
        description: 'Skip rendering terrain that is not visible to the camera'
      }
    ];
  }

  private applyChunkSizeReduction(): void {
    // Reduce chunk radius by 1 (minimum 3)
    console.log('Applying chunk size reduction optimization');
  }

  private increaseUnloadDistance(): void {
    // Reduce unload distance to be more aggressive
    console.log('Applying unload distance optimization');
  }

  private optimizeGeometry(): void {
    // Enable geometry optimization features
    console.log('Applying geometry optimization');
  }

  private estimateGeometryMemory(stats: any): number {
    // Estimate memory used by geometry buffers
    return (stats.totalVertices * 32) / (1024 * 1024); // 32 bytes per vertex average
  }

  private estimateTextureMemory(): number {
    // Estimate memory used by textures
    return 4; // Assume 4MB of textures
  }

  private estimateInstanceMemory(stats: any): number {
    // Estimate memory used by instance matrices
    return (stats.totalInstances * 64) / (1024 * 1024); // 64 bytes per instance matrix
  }

  private estimateSceneObjectMemory(): number {
    // Estimate memory used by scene objects and metadata
    return 2; // Assume 2MB for scene objects
  }
}