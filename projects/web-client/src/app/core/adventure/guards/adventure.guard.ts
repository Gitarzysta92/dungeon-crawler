import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdventureState } from '@game-logic/lib/game/adventure-state';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { adventureStateStore } from '../stores/adventure-state.store';
import { AreaType } from '@game-logic/lib/features/adventure/area.constants';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { dungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
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
    const dungeonState = await firstValueFrom(this._localStorageService.read<DungeonState>(dungeonStateStore.description));
    const adventureState = await firstValueFrom(this._localStorageService.read<AdventureState>(adventureStateStore.description));
    const dungeonAreaId = adventureState.dungeonInstance?.assignedAreaId;

    if (dungeonState) {
      this._routingService.navigateToDungeonInstance(dungeonState.dungeonId);
    } else if (dungeonAreaId) {
      this._routingService.navigateToArea(AreaType.Dungeon, dungeonAreaId);
    }

    return !dungeonState && !dungeonAreaId;
  }
  
}
