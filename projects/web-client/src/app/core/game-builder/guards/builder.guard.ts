import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataFeedService } from "../../data/services/data-feed.service";
import { GameBuilderStateService } from "../services/game-builder-state.service";
import { GameBuilderStateStore } from "../stores/game-builder-state.store";

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
      const initialData = {
        hero: await this._dataFeed.getHeroTemplate(),
        races: await this._dataFeed.getHeroRaces(),
        classes: await this._dataFeed.getHeroClasses(),
        origins: await this._dataFeed.getHeroOrigins(),
        adventureTemplate: await this._dataFeed.getAdventureGameplayTemplate()
      }
      
      if (this._gameBuilderStateStore.isInitialized) {
        await this._gameBuilderStateStore.update(await this._gameBuilderStateService.initializeState(initialData, this._dataFeed));
      } else {
        await this._gameBuilderStateStore.initializeStore(initialData, s => { return this._gameBuilderStateService.initializeState(s, this._dataFeed); });
      }
      
    return true
  }


}
