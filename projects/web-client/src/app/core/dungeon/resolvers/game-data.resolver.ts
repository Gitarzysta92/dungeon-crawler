import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { RoutingService } from "src/app/aspects/navigation/api";
import { IGameDataDto } from "../models/game-data.dto";
import { GameplayInitializationService } from "../services/gameplay-initialization/gameplay-initialization.service";

@Injectable({ providedIn: 'root' })
export class GameDataResolver implements Resolve<IGameDataDto> {

  constructor(
    // private readonly _gameplayInitializationService: GameplayInitializationService,
    // private readonly _routingService: RoutingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IGameDataDto | Observable<IGameDataDto> | Promise<IGameDataDto> {
    // return this._gameplayInitializationService.requestForGameDetails(route.params.id)
    //   .pipe(catchError(err => {
    //     this._routingService.navigateToLobby();
    //     return throwError(err);
    //   }));

    return {} as IGameDataDto;
  }

}