import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTerrainService } from './services/dynamic-terrain.service';
import { TerrainGeneratorService } from './services/terrain-generator.service';
import { TerrainExpansionService } from './services/terrain-expansion.service';
import { TerrainIntegrationService } from './services/terrain-integration.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DynamicTerrainService,
    TerrainGeneratorService,
    TerrainExpansionService,
    TerrainIntegrationService
  ]
})
export class TerrainModule { }