# Dynamic Terrain System

A comprehensive system for dynamically loading and expanding terrain in the Dungeon Crawler game based on player movement and distance thresholds.

## Overview

The Dynamic Terrain System provides seamless terrain loading and unloading as players explore the game world. It uses a chunk-based approach with procedural generation to create infinite terrain without performance issues.

## Key Features

- **Distance-based Loading**: Automatically loads terrain chunks when player approaches
- **Chunk Management**: Efficient loading/unloading of terrain chunks based on distance thresholds
- **Procedural Generation**: Dynamic terrain generation with multiple biomes
- **Vertex Expansion**: Dynamic geometry expansion for seamless terrain growth
- **Scene Integration**: Seamless integration with existing 3D scene system
- **Performance Optimization**: Instanced rendering and geometry merging for optimal performance

## Architecture

### Core Services

1. **DynamicTerrainService**: Main orchestrator for terrain loading/unloading
2. **TerrainGeneratorService**: Procedural terrain generation with biomes
3. **TerrainExpansionService**: Dynamic vertex expansion and geometry management
4. **TerrainIntegrationService**: Integration with existing adventure system

### Data Flow

```
Player Movement → Position Tracking → Distance Calculation → Chunk Loading/Unloading → Scene Composition
```

## Usage

### Basic Setup

```typescript
import { TerrainIntegrationService } from './core/terrain/api';

// Inject the service
constructor(private terrainIntegration: TerrainIntegrationService) {}

// Initialize with default settings
await this.terrainIntegration.initialize();

// OR with custom configuration
await this.terrainIntegration.initialize({
  loadDistance: 10,
  unloadDistance: 20,
  chunkRadius: 6,
  enableProceduralGeneration: true
});
```

### Custom Configuration

```typescript
const config: Partial<IDynamicTerrainConfig> = {
  loadDistance: 8,        // Load terrain within 8 hexes of player
  unloadDistance: 15,     // Unload terrain beyond 15 hexes
  chunkRadius: 5,         // Each chunk covers 5 hex radius
  maxLoadedChunks: 25,    // Maximum chunks in memory
  updateInterval: 500,    // Check every 500ms
  enableProceduralGeneration: true,
  proceduralConfig: {
    seed: 12345,
    biomeWeights: new Map([
      ['plains', 0.5],
      ['forest', 0.3],
      ['mountains', 0.2]
    ])
  }
};

await terrainIntegration.initialize(config);
```

### Manual Terrain Updates

```typescript
// Force terrain update around specific position
const position: ICubeCoordinates = { q: 0, r: 0, s: 0 };
await terrainIntegration.updateTerrainAroundPosition(position);

// Get terrain statistics
terrainIntegration.getTerrainStats().subscribe(stats => {
  console.log(`Loaded chunks: ${stats.loadedChunks}`);
  console.log(`Total fields: ${stats.totalFields}`);
});
```

## Terrain Generation

### Biome System

Supports multiple biome types with different characteristics:

- **Plains**: Flat terrain with grass, occasional rocks
- **Forest**: Dense vegetation with height variation
- **Mountains**: Rocky terrain with significant elevation changes
- **Desert**: Sandy terrain with sparse decorations

### Procedural Parameters

```typescript
interface IProceduralConfig {
  seed: number;                    // Random seed for generation
  biomeWeights: Map<string, number>; // Biome distribution weights
  noiseSettings: {
    frequency: number;             // Noise frequency
    octaves: number;              // Detail levels
    persistence: number;          // Amplitude reduction
    lacunarity: number;           // Frequency increase
  };
  featureSpacing: number;         // Minimum distance between features
}
```

## Performance Features

### Chunk-based Loading

- Terrain divided into hexagonal chunks
- Only loads chunks within player's vicinity
- Automatic unloading of distant chunks
- Configurable chunk size and loading distance

### Vertex Expansion

```typescript
// Expand terrain geometry dynamically
await terrainExpansion.expandTerrain('main_terrain', newFields);

// Create merged geometry for better performance
const mergedGeometry = await terrainExpansion.createMergedGeometry(fields);

// Get performance statistics
const stats = terrainExpansion.getTerrainStats();
console.log(`Total vertices: ${stats.totalVertices}`);
```

### Instanced Rendering

- Uses THREE.InstancedMesh for repeated terrain elements
- Dynamic instance matrix updates
- Color per instance support
- Automatic geometry batching

## Integration Points

### Adventure System Integration

The system automatically integrates with the existing adventure system:

```typescript
// Automatic player position tracking
terrainIntegration.getCurrentPlayerPosition().subscribe(position => {
  // Position updates trigger terrain loading automatically
});

// Adventure state integration
const humanPlayer = adventure.humanPlayer;
const pawn = adventure.getSelectedPawn<IBoardTraveler>(humanPlayer);
// System tracks pawn.position automatically
```

### Scene Composer Integration

```typescript
// Terrain fields automatically create scene definitions
const sceneDefinitions = fields.map(field => ({
  definitionName: field.visual.definitionName,
  position: HexagonHelper.calculatePositionInGrid(/*...*/),
  primaryColor: field.visual.primaryColor,
  // ... other visual properties
}));

// Integrated with existing scene composition
await sceneService.composeScene(sceneDefinitions);
```

## Events

The system emits various events for monitoring and debugging:

```typescript
terrainService.events$.subscribe(event => {
  switch (event.type) {
    case TerrainEventType.ChunkLoaded:
      console.log(`Loaded chunk: ${event.chunkId}`);
      break;
    case TerrainEventType.PlayerMoved:
      console.log('Player moved, updating terrain');
      break;
    case TerrainEventType.TerrainGenerated:
      console.log(`Generated ${event.fields?.length} fields`);
      break;
  }
});
```

## Configuration Options

### Distance Thresholds

- `loadDistance`: Distance threshold to start loading new chunks
- `unloadDistance`: Distance threshold to unload far chunks
- Measured in hexagonal grid units

### Performance Tuning

- `maxLoadedChunks`: Limits memory usage
- `updateInterval`: Balance between responsiveness and performance
- `chunkRadius`: Larger chunks = fewer loading operations, more memory per chunk

### Visual Quality

- `enableProceduralGeneration`: Toggle between static and procedural terrain
- Biome weights control terrain variety
- Noise settings affect terrain detail and variation

## Development Notes

### Adding New Biomes

1. Add biome type to `BiomeType` enum
2. Configure biome in `TerrainGeneratorService.biomeConfigs`
3. Add terrain type mapping in `determineTerrainType()`
4. Configure visual properties in `generateVisual()`

### Custom Terrain Types

1. Add terrain type to `TerrainType` enum
2. Add visual mapping in `generateVisual()`
3. Configure walkability in `isTerrainWalkable()`
4. Ensure corresponding scene definitions exist

### Performance Monitoring

```typescript
// Monitor chunk loading
terrainService.loadedChunks$.subscribe(chunks => {
  console.log(`Active chunks: ${chunks.size}`);
});

// Monitor expansion performance
terrainExpansion.expansionEvents$.subscribe(event => {
  if (event.type === 'expansion_completed') {
    console.log(`Expanded to ${event.instanceCount} instances`);
  }
});
```

This system provides a robust foundation for infinite terrain generation while maintaining optimal performance through intelligent loading and modern 3D rendering techniques.