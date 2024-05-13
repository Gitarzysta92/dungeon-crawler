import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { GameBuilderStateService } from "../services/game-builder-state.service";
import { GameBuilderStateStore } from "../stores/game-builder-state.store";
import { IBuilderInitialData } from "../interfaces/state-initial-data.interface";

@Injectable()
export class BuilderGuard implements CanActivate {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore,
    private readonly _gameBuilderStateService: GameBuilderStateService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const initialData: IBuilderInitialData = {
        hero: await this._dataFeed.getHeroTemplate(),
        races: await this._dataFeed.getHeroRaces(),
        classes: await this._dataFeed.getHeroClasses(),
        origins: await this._dataFeed.getHeroOrigins(),
        adventureMap: await this._dataFeed.getAdventureMap()
      }
      
      if (this._gameBuilderStateStore.isInitialized) {
        await this._gameBuilderStateStore.updateState(await this._gameBuilderStateService.initializeState(initialData, this._dataFeed));
      } else {
        await this._gameBuilderStateStore.initializeStore(initialData, s => { return this._gameBuilderStateService.initializeState(s, this._dataFeed); });
      }
      
    return true
  }


}
