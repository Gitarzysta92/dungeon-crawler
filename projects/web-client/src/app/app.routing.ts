import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { MenuService } from './aspects/navigation/api';
import { Menus } from './core/menus/menus.routing';
import { GamePersistence } from './core/game-persistence/game-persistence.routing';
import { NotFoundViewComponent } from './core/commons/components/not-found-view/not-found-view.component';
import { DungeonDev } from './development/dungeon-dev/dungeon-dev.routing';
import { Development } from './development/development/development.routing';
import { GameBuilder } from './core/game-builder/game-builder.routing';
import { Game } from './core/game/game.routing';
import { Settings } from './core/settings/settings.routing';
import { StoreService } from './infrastructure/data-storage/api';
import { InitializationGuard } from './infrastructure/configuration/guards/initialization.guard';
import { BASIC_LOADING_SCREEN } from './core/commons/constants/loader.constants';
import { GameUiDev } from './development/game-ui-dev/game-ui-dev.routing';
import { TerrainDev } from './development/terrain-dev/terrain-dev.routing';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Menus.ROOT_PATH,
  },
  {
    path: Game.ROOT_PATH,
    loadChildren: () => import('./core/game/game.module').then(m => m.GameModule),
    canActivate: [ InitializationGuard],
    data: { extras: { skipNavigationChange: true }, loaderName: BASIC_LOADING_SCREEN }
  },
  {
    path: Development.ROOT_PATH,
    //canDeactivate: [ComponentAnimationGuard],
    loadChildren: () => import('./development/development/development.module').then(m => m.DevelopmentModule),
    canActivate: [ InitializationGuard ],
    data: { extras: { skipNavigationChange: true }, loaderName: BASIC_LOADING_SCREEN }
  },
  {
    path: Menus.ROOT_PATH,
    //canDeactivate: [ComponentAnimationGuard],
    loadChildren: () => import('./core/menus/menus.module').then(m => m.MenusModule),
    canActivate: [ InitializationGuard ],
    data: { loaderName: BASIC_LOADING_SCREEN }
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
      { routes: GameBuilder.routes.toDefaultFormat(), path: `${Menus.ROOT_PATH}/${GameBuilder.ROOT_PATH}` },
      { routes: GamePersistence.routes.toDefaultFormat(), path: `${Menus.ROOT_PATH}/${GamePersistence.ROOT_PATH}` },
      { routes: Settings.routes.toDefaultFormat(), path: `${Menus.ROOT_PATH}/${Settings.ROOT_PATH}` },
      { routes: Development.routes.toDefaultFormat(), path: Development.ROOT_PATH },
      { routes: DungeonDev.routes.toDefaultFormat(), path: `${Development.ROOT_PATH}/${DungeonDev.ROOT_PATH}` },
      { routes: GameUiDev.routes.toDefaultFormat(), path: `${Development.ROOT_PATH}/${GameUiDev.ROOT_PATH}` },
      { routes: TerrainDev.routes.toDefaultFormat(), path: `${Development.ROOT_PATH}/${TerrainDev.ROOT_PATH}` }
    ], this._storeService)
  }
} 