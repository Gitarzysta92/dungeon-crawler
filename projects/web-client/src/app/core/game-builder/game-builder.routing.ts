import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { GameBuilderResolver } from './resolvers/game-builder.resolver';


export namespace GameBuilder {
  export const ROOT_PATH = 'game-builder';
  export const routes = new RoutesAdapter({
    builder: { path: '', resolve: { dungeonData: GameBuilderResolver } },
  });
}