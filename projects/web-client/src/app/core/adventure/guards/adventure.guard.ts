import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdventureGuard implements CanActivate, CanDeactivate<UrlTree> {

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _routingService: RoutingService,
    private readonly _router: Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    // const adventureState = await this._localStorageService.read<AdventureState>(adventureStateStore.description);
    // if (!adventureState) {
    //   this._routingService.navigateToMainMenu();
    // }
    
    // const dungeonState = await this._localStorageService.read<DungeonState>(StoreName.dungeonStateStore.description);
    // if (dungeonState) {
    //   this._routingService.navigateToDungeonInstance(dungeonState.dungeonId);
    // }
  
    return false;
  }

  canDeactivate(
    component: UrlTree,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (nextState.url === "/game") {
      return this._router.parseUrl("/")
    } else {
      return true
    }
  }
  
}
