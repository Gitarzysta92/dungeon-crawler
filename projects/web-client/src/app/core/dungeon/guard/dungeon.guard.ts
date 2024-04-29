import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { RoutingService } from 'src/app/aspects/navigation/api';


@Injectable({
  providedIn: 'root'
})
export class DungeonGuard implements CanActivate {

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _routingService: RoutingService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const dungeonState = await this._localStorageService.read("");
    const adventureState = await this._localStorageService.read("");

    if (!adventureState) {
      this._routingService.navigateToMainMenu();
    }
    
    // const dungeonAreaId = adventureState.dungeonInstance?.assignedAreaId;
    // if (!dungeonState && dungeonAreaId) {
    //   this._routingService.navigateToArea(AreaType.Dungeon, dungeonAreaId);
    // }

    return !!dungeonState
  }

}
