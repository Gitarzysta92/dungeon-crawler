import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { dungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { AreaType } from '@game-logic/lib/features/adventure/area.constants';
import { AdventureState } from '@game-logic/lib/game/adventure-state';
import { adventureStateStore } from '../../adventure/stores/adventure-state.store';

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
    const dungeonState = await firstValueFrom(this._localStorageService.read<DungeonState>(dungeonStateStore.description));
    const adventureState = await firstValueFrom(this._localStorageService.read<AdventureState>(adventureStateStore.description));
    
    const dungeonAreaId = adventureState.dungeonInstance?.assignedAreaId;
    if (!dungeonState && dungeonAreaId) {
      this._routingService.navigateToArea(AreaType.Dungeon, dungeonAreaId);
    }

    return !!dungeonState
  }

}
