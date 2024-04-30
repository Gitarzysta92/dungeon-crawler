import { MenuLocation } from "src/app/aspects/navigation/api";
import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";

export namespace DungeonDev {
  export const ROOT_PATH = 'dungeon';
  export const routes = new RoutesAdapter({
    root: { path: "", redirectTo: "playground", pathMatch: "full" },
    playground: {
      path: "playground",
      data: { menu: { location: MenuLocation.DevelopmentPrimaryMenu, label: 'Playground' } }
    },
    tileRotationDev: {
      path: "tile-rotation-dev",
      data: { menu: { location: MenuLocation.DevelopmentPrimaryMenu, label: 'Rotation' } }
    },
    boardSelectorDev: {
      path: "board-selector-dev",
      data: { menu: { location: MenuLocation.DevelopmentPrimaryMenu, label: 'Selector' } }
    }
  });
}