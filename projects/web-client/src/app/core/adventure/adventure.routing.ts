import { MenuLocation } from 'src/app/aspects/navigation/api';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { AdventureResolver } from './resolvers/adventure.resolver';
import { AdventureGuard } from './guards/adventure.guard';


export namespace Adventure {
  export const ROOT_PATH = 'adventure';
  export const routes = new RoutesAdapter({
    root: {
      path: '',
      pathMatch: 'full', 
      redirectTo: 'town',
    },
    town: {
      path: 'town',
      resolve: { x: AdventureResolver },
      canDeactivate: [ AdventureGuard ],
      data: { menu: { location: MenuLocation.MainMenu, label: 'hall' } },
      children: {
        root: { path: '',  pathMatch: 'full', redirectTo: 'hall' },
        hall: { path: 'hall' },
        building: { path: 'building/:id' },
        character: { path: 'character/:id' }
      },
      //canActivate: [AdventureGuard]
    },
    dungeon: { path: 'dungeon/:id' }
  });
}