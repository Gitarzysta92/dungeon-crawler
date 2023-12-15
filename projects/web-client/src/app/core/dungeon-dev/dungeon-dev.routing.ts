import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";

export namespace DungeonDev {
  export const ROOT_PATH = 'dungeon';
  export const routes = new RoutesAdapter({
    root: { path: "", redirectTo: "playground", pathMatch: "full" },
    playground: { path: "playground" },
    tileRotationDev: { path: "tile-rotation-dev" },
    boardSelectorDev: { path: "board-selector-dev" }
  });
}