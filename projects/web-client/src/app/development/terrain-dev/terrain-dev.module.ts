import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TerrainDevRoutingModule } from './terrain-dev.routing-module';
import { TerrainModule } from '../../core/terrain/terrain.module';

import { TerrainIntegrationDevComponent } from './components/terrain-integration-dev.component';
import { TerrainPlaygroundViewComponent } from './components/terrain-playground-view.component';
import { TerrainPerformanceMonitorComponent } from './components/terrain-performance-monitor.component';
import { TerrainVisualizationComponent } from './components/terrain-visualization.component';
import { TerrainDebugService } from './services/terrain-debug.service';

@NgModule({
  declarations: [
    TerrainIntegrationDevComponent,
    TerrainPlaygroundViewComponent,
    TerrainPerformanceMonitorComponent,
    TerrainVisualizationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TerrainDevRoutingModule,
    TerrainModule
  ],
  providers: [
    TerrainDebugService
  ]
})
export class TerrainDevModule { }