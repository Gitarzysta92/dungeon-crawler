import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { DungeonResolver } from './resolvers/dungeon.resolver';

export namespace Dungeon {
  export const ROOT_PATH = 'dungeon';
  export const routes = new RoutesAdapter({
    dungeon: { path: ':id', pathMatch: 'full', resolve: { dungeonData: DungeonResolver } } 
  });
}