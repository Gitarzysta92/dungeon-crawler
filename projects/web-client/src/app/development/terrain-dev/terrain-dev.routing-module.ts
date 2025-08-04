import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerrainPlaygroundViewComponent } from './components/terrain-playground-view.component';
import { TerrainPerformanceMonitorComponent } from './components/terrain-performance-monitor.component';
import { TerrainIntegrationDevComponent } from './components/terrain-integration-dev.component';
import { TerrainVisualizationComponent } from './components/terrain-visualization.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'playground',
    pathMatch: 'full'
  },
  {
    path: 'playground',
    component: TerrainPlaygroundViewComponent,
    data: { title: 'Terrain Playground' }
  },
  {
    path: 'performance',
    component: TerrainPerformanceMonitorComponent,
    data: { title: 'Performance Monitor' }
  },
  {
    path: 'integration',
    component: TerrainIntegrationDevComponent,
    data: { title: 'Integration Example' }
  },
  {
    path: 'visualization',
    component: TerrainVisualizationComponent,
    data: { title: 'Terrain Visualization' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerrainDevRoutingModule { }