import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace Menus {
  export const ROOT_PATH = 'main-menu';
  export const routes = new RoutesAdapter({
    mainMenu: { path: '',  pathMatch: 'full' }
  });
}