import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace GamePersistence {
  export const ROOT_PATH = 'game-persistence';
  export const routes = new RoutesAdapter({
    loader: { path: '' },
  });
}