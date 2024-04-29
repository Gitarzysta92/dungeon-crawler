import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GamePersistenceService } from '../services/game-persistence.service';


@Injectable({
  providedIn: 'root'
})
export class GameLoaderGuard implements CanActivate {

  constructor(
    private readonly _gameLoaderService: GamePersistenceService,
    private readonly _routingService: RoutingService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this._gameLoaderService.isAnyGameToLoad() 
  }

}
