
import { ICONS } from 'src/app/shared/icons/constants/icons';
import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace MyProfile {
  export const ROOT_PATH = 'profile';
  export const routes = new RoutesAdapter({
    root: { path: '', pathMatch: 'full', redirectTo: 'me' },
    me: { path: 'me', data: { menu: { location: MenuLocation.SecondaryMenu, label: 'My profile', icon: ICONS.profile } } },
    //friends: { path: 'friends', component: ProfileComponent, data: { menu: { location: MenuLocations.SecondaryMenu, label: 'Friends', icon: ICONS.profiles } } }
  });
}



