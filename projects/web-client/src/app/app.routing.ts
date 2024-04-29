import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { MainResolver } from './infrastructure/configuration/api';
import { MenuService } from './aspects/navigation/api';
import { Menus } from './core/menus/menus.routing';
import { GamePersistence } from './core/game-persistence/game-persistence.routing';
import { NotFoundViewComponent } from './core/commons/components/not-found-view/not-found-view.component';
import { DungeonDev } from './core/dungeon-dev/dungeon-dev.routing';
import { Development } from './core/development/development.routing';
import { GameBuilder } from './core/game-builder/game-builder.routing';
import { Game } from './core/game/game.routing';
import { Settings } from './core/settings/settings.routing';
import { GameLoaderGuard } from './core/game-persistence/guard/game-loader.guard';
import { StoreService } from './infrastructure/data-store/api';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    resolve: { MainResolver },
    redirectTo: Menus.ROOT_PATH
  },
  {
    path: Game.ROOT_PATH,
    loadChildren: () => import('./core/game/game.module').then(m => m.GameModule),
    resolve: { MainResolver },
    canActivate: [GameLoaderGuard],
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
    path: Settings.ROOT_PATH,
    loadChildren: () => import('./core/settings/settings.module').then(m => m.SettingsModule),
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
    private readonly _menuService: MenuService,
    private readonly _storeService: StoreService
  ) {
    this._menuService.register([
      { routes: Game.routes.toDefaultFormat(), path: Game.ROOT_PATH },
      { routes: GameBuilder.routes.toDefaultFormat(), path: GameBuilder.ROOT_PATH },
      { routes: GamePersistence.routes.toDefaultFormat(), path: GamePersistence.ROOT_PATH },
      { routes: Settings.routes.toDefaultFormat(), path: Settings.ROOT_PATH },
    ], this._storeService)
  }
}