import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { LoadingScreenService } from "src/app/shared/loaders/services/loading-screen.service";
import { GAME_LOADING_SCREEN } from "../constants/game-loader.constants";

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanDeactivate<void> {

  constructor(
    private readonly _loadingScreenService: LoadingScreenService
  ) { }
  
  public canDeactivate(): boolean {
    this._loadingScreenService.hideLoadingScreen(GAME_LOADING_SCREEN, true);
    return true;
  }

}
