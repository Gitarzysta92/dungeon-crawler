import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { GameBuilder } from '../game-builder/game-builder.routing';
import { GamePersistence } from '../game-persistence/game-persistence.routing';
import { Settings } from '../settings/settings.routing';


export namespace Menus {
  export const ROOT_PATH = 'menus';
  export const routes = new RoutesAdapter({
    menus: {
      path: '',
      data: { animation: 'menus' },
      children: {
        root: {
          path: "",
          pathMatch: "full",
          redirectTo: "main-menu"
        },
        mainMenu: {
          path: "main-menu"
        },
        persistance: {
          path: GamePersistence.ROOT_PATH,
          loadChildren: () => import('../game-persistence/game-persistence.module').then(m => m.GamePersistenceModule),
        },
        builder: {
          path: GameBuilder.ROOT_PATH,
          loadChildren: () => import('../game-builder/game-builder.module').then(m => m.GameBuilderModule),
        },
        settings: {
          path: Settings.ROOT_PATH,
          loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule),
        }
      },
    },
  });
}