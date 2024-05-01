import { MenuLocation } from 'src/app/aspects/navigation/api';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { ICONS } from 'src/app/shared/icons/api';


export namespace GamePersistence {
  export const ROOT_PATH = 'game-persistence';
  export const routes = new RoutesAdapter({
    loader: {
      path: '',
      pathMatch: 'full',
      data: {
        menu: { location: MenuLocation.MainMenu, label: 'game-persistance.menu-label', icon: ICONS.profile },
        animation: "game-persistence"
      }
    },
  });
}