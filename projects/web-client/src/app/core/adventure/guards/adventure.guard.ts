import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { RoutingService } from 'src/app/aspects/navigation/api';


@Injectable({
  providedIn: 'root'
})
export class AdventureGuard implements CanActivate {

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _routingService: RoutingService,
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
  
}
