import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { GameLoadingService } from '../services/game-loading.service';


@Injectable({
  providedIn: 'root'
})
export class GameLoaderGuard implements CanActivate {

  constructor(
    private readonly _gameLoaderService: GameLoadingService,
    private readonly _routingService: RoutingService,
  ) { }

  async canActivate(): Promise<boolean> {
    return this._gameLoaderService.isAnyGameToLoad() 
  }

}
