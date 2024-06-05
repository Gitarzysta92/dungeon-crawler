import { MenuLocation } from "src/app/aspects/navigation/api";
import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";

export namespace GameUiDev {
  export const ROOT_PATH = 'game-ui';
  export const routes = new RoutesAdapter({
    root: { path: "", redirectTo: "hero-bar", pathMatch: "full" },
    heroBar: {
      path: "hero-bar",
      data: { menu: { location: MenuLocation.DevelopmentPrimaryMenu, label: 'Hero bar' } }
    }
  });
}