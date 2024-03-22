import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';


export namespace GameBuilder {
  export const ROOT_PATH = 'game-builder';
  export const routes = new RoutesAdapter({
    builder: { path: '' },
  });
}