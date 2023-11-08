import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace GameCreator {
  export const ROOT_PATH = 'game-creator';
  export const routes = new RoutesAdapter({
    creator: { path: 'creator' },
    loader: { path: 'loader' }
  });
}