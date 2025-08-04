import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";
import { MenuLocation } from "src/app/aspects/navigation/api";
import { ICONS } from "src/app/shared/icons/api";

export namespace TerrainDev {
  export const ROOT_PATH = 'terrain';
  export const routes = new RoutesAdapter({
    terrain: {
      path: '',
      redirectTo: 'playground',
      pathMatch: 'full'
    },
    playground: {
      path: 'playground',
      data: {
        menu: { 
          location: MenuLocation.DevelopmentPrimaryMenu, 
          label: '🌍 Terrain Playground', 
          icon: ICONS.profile 
        },
        animation: 'terrain-playground'
      }
    },
    performance: {
      path: 'performance',
      data: {
        menu: { 
          location: MenuLocation.DevelopmentPrimaryMenu, 
          label: '⚡ Performance Monitor', 
          icon: ICONS.profile 
        },
        animation: 'terrain-performance'
      }
    },
    integration: {
      path: 'integration',
      data: {
        menu: { 
          location: MenuLocation.DevelopmentPrimaryMenu, 
          label: '🔧 Integration Example', 
          icon: ICONS.profile 
        },
        animation: 'terrain-integration'
      }
    },
    visualization: {
      path: 'visualization',
      data: {
        menu: { 
          location: MenuLocation.DevelopmentPrimaryMenu, 
          label: '🗺️ Terrain Visualization', 
          icon: ICONS.profile 
        },
        animation: 'terrain-visualization'
      }
    }
  });
}