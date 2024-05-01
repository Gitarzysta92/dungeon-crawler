
import { ICONS } from 'src/app/shared/icons/constants/icons';
import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace Settings {
  export const ROOT_PATH = 'settings';
  export const routes = new RoutesAdapter({
    settings: {
      path: '',
      pathMatch: 'full',
      data: {
        menu: { location: MenuLocation.MainMenu, label: 'settings.menu-label', icon: ICONS.profile },
        animation: "settings"
      }
    },
  });
}



