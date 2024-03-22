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
import { GamePersistence } from './core/game-persistence/game-persistence.routing';
import { NotFoundViewComponent } from './core/commons/components/not-found-view/not-found-view.component';
import { AdventureGuard } from './core/adventure/api';
import { DungeonGuard } from './core/dungeon/guard/dungeon.guard';
import { DungeonDev } from './core/dungeon-dev/dungeon-dev.routing';
import { Development } from './core/development/development.routing';
import { GameBuilder } from './core/game-builder/game-builder.routing';


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
        canActivate: [DungeonGuard],
      },
    ]
  },
  {
    path: Development.ROOT_PATH,
    resolve: { MainResolver },
    children: [
      {
        path: "",
        loadChildren: () => import('./core/development/development.module').then(m => m.DevelopmentModule),
      },
      {
        path: DungeonDev.ROOT_PATH,
        loadChildren: () => import('./core/dungeon-dev/dungeon-dev.module').then(m => m.DungeonDevModule),
      },
    ]
  },
  {
    path: GamePersistence.ROOT_PATH,
    loadChildren: () => import('./core/game-persistence/game-persistence.module').then(m => m.GamePersistenceModule),
    resolve: { MainResolver }
  },
  {
    path: GameBuilder.ROOT_PATH,
    loadChildren: () => import('./core/game-builder/game-builder.module').then(m => m.GameBuilderModule),
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