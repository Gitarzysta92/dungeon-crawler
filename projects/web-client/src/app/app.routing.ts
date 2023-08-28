import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { Lobby } from './core/lobby';
import { Identity } from './core/identity/api';
import { Dungeon } from './core/dungeon/api';
import { MyProfile } from './core/my-profile/api';
import { Notifications } from './aspects/notifications/api';
import { MainResolver } from './infrastructure/configuration/api';
import { NotFoundViewComponent } from './core/main/api';
import { MenuService } from './aspects/navigation/api';
import { Main } from './core/main/main.routing';
import { AdventureViewComponent } from './core/adventure/api';
import { Adventure } from './core/adventure/adventure.routing';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Main.ROOT_PATH
  },
  { 
    path: 'game',
    //pathMatch: "full",
    resolve: { MainResolver },
    children: [
      { 
        path: 'adventure', 
        component: AdventureViewComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: Adventure.ROOT_PATH },
          { path: Adventure.ROOT_PATH, loadChildren: () => import('./core/adventure/adventure.module').then(m => m.AdventureModule) },
        ]
      },
      { path: Dungeon.ROOT_PATH, loadChildren: () => import('./core/dungeon/dungeon.module').then(m => m.DungeonModule) },
    ]
  },
  {
    path: Main.ROOT_PATH,
    loadChildren: () => import('./core/main/main.module').then(m => m.MainModule),
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