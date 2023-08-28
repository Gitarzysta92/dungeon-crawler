import { MenuLocation } from 'src/app/aspects/navigation/api';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace Adventure {
  export const ROOT_PATH = 'hall';
  export const routes = new RoutesAdapter({
    root: { path: '',  pathMatch: 'full',  data: { menu: { location: MenuLocation.MainMenu , label: 'hall' } }}
  });
}