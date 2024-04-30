import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";
import { DungeonDev } from "../dungeon-dev/dungeon-dev.routing";
import { MenuLocation } from "src/app/aspects/navigation/api";
import { ICONS } from "src/app/shared/icons/api";

export namespace Development {
  export const ROOT_PATH = 'development';
  export const routes = new RoutesAdapter({
    development: {
      path: '',
      children: {
        dungeon: {
          path: DungeonDev.ROOT_PATH,
          loadChildren: () => import('../dungeon-dev/dungeon-dev.module').then(m => m.DungeonDevModule),
        },
      },
      data: {
        menu: { location: MenuLocation.MainMenu, label: 'development.menu-label', icon: ICONS.profile },
      }
    },
  });
}