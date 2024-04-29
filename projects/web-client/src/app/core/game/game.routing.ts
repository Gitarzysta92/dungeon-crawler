import { MenuLocation } from "src/app/aspects/navigation/api";
import { RoutesAdapter } from "src/app/aspects/navigation/services/system-routes";
import { ICONS } from "src/app/shared/icons/api";
import { Adventure } from "../adventure/adventure.routing";
import { Dungeon } from "../dungeon/dungeon.routing";
import { GameResolver } from "./resolvers/game.resolver";
import { gameSavesState } from "../game-persistence/stores/game-saves.store";

export namespace Game {
  export const ROOT_PATH = 'game';
  export const routes = new RoutesAdapter({
    game: {
      path: '',
      pathMatch: 'full',
      children: {
        adventure: {
          path: Adventure.ROOT_PATH,
          loadChildren: () => import('../adventure/adventure.module').then(m => m.AdventureModule),
        },
        dungeon: {
          path: Dungeon.ROOT_PATH,
          loadChildren: () => import('../dungeon/dungeon.module').then(m => m.DungeonModule),
        },
      },
      resolve: { GameResolver },
      data: {
        menu: { location: MenuLocation.MainMenu, label: 'game.continue-menu-label', icon: ICONS.profile },
      },
      validators: {
        isDisabled: store => !store.getStore(gameSavesState).currentState.selectedGameSaveId
      }
    },
  });
}