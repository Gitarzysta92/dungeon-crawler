import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';

import { RoutingService } from 'src/app/aspects/navigation/api';
import { AdventureState } from '@game-logic/lib/states/adventure-state';
import { adventureStateStore } from '../stores/adventure-state.store';
import { StoreName } from '../../dungeon-logic/stores/dungeon-state.store-keys';

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
    const adventureState = await this._localStorageService.read<AdventureState>(adventureStateStore.description);
    if (!adventureState) {
      this._routingService.navigateToMainMenu();
    }
    
    const dungeonState = await this._localStorageService.read<DungeonState>(StoreName.dungeonStateStore.description);
    if (dungeonState) {
      this._routingService.navigateToDungeonInstance(dungeonState.dungeonId);
    }
  
    return !dungeonState ;
  }
  
}
