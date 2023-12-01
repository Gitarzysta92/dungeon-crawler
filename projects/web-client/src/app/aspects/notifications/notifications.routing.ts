import { map } from 'rxjs/operators';
import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { Notification } from './models/notification';
import { notificationsStore } from './stores/notifications.store';


export namespace Notifications {
  export const ROOT_PATH = 'notifications';
  export const routes = new RoutesAdapter({
    root: { path: '', pathMatch: 'full', redirectTo: 'me' },
    me: {
      path: 'me', data: {
        menu: { location: MenuLocation.MainMenu, label: 'Notifications' },
        appendix: { data: (store => store.getStore<Notification[]>(notificationsStore).state.pipe(map(ns => ns.filter(n => !n.readed).length))) }
      }
    }
  });
}