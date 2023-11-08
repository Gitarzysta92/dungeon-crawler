import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { Lobby } from './core/lobby';
import { Identity } from './core/identity/api';
import { Dungeon } from './core/dungeon/api';
import { MyProfile } from './core/my-profile/api';
import { Notifications } from './aspects/notifications/api';
import { MainResolver } from './infrastructure/configuration/api';
import { MenuService } from './aspects/navigation/api';
import { Menus } from './core/menus/menus.routing';
import { Adventure } from './core/adventure/adventure.routing';
import { GameCreator } from './core/game-progression/game-progression.routing';
import { NotFoundViewComponent } from './core/commons/components/not-found-view/not-found-view.component';
import { AdventureGuard } from './core/adventure/api';
import { DungeonGuard } from './core/dungeon/guard/dungeon.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Menus.ROOT_PATH
  },
  { 
    path: 'game',
    //pathMatch: "full",
    resolve: { MainResolver },
    children: [
      {
        path: Adventure.ROOT_PATH,
        loadChildren: () => import('./core/adventure/adventure.module').then(m => m.AdventureModule),
        canActivate: [AdventureGuard]
      },
      {
        path: Dungeon.ROOT_PATH,
        loadChildren: () => import('./core/dungeon/dungeon.module').then(m => m.DungeonModule),
        canActivate: [DungeonGuard]
      },
    ]
  },
  {
    path: GameCreator.ROOT_PATH,
    loadChildren: () => import('./core/game-progression/game-progression.module').then(m => m.GameCreatorModule),
    resolve: { MainResolver }
  },
  {
    path: Menus.ROOT_PATH,
    loadChildren: () => import('./core/menus/menus.module').then(m => m.MenusModule),
    resolve: { MainResolver }
  },
  { path: '**', component: NotFoundViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected',
    paramsInheritanceStrategy: 'always',
    preloadingStrategy: NoPreloading
  })],
  exports: [RouterModule],
  providers: [MenuService]
})
export class AppRoutingModule { 
  constructor(
    private readonly _menuService: MenuService
  ) {
    this._menuService.register([ 
      { routes: Lobby.routes.toDefaultFormat(), path: Lobby.ROOT_PATH },
      { routes: MyProfile.routes.toDefaultFormat(), path: MyProfile.ROOT_PATH },
      { routes: Notifications.routes.toDefaultFormat(), path: Notifications.ROOT_PATH },
      { routes: Identity.routes.toDefaultFormat(), path: Identity.ROOT_PATH }
    ])
  }
}