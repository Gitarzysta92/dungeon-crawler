import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export const ROOT_PATH = 'lobby';
export const routes = new RoutesAdapter({
  root: { path: '',  pathMatch: 'full',  data: { menu: { location: MenuLocation.MainMenu , label: 'Lobby' } }}
})



