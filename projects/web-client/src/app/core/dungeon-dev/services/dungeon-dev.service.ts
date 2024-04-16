import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonStateStoreAction, StoreName } from '../../dungeon/stores/dungeon-state.store-keys';
import { DevelopmentFlagsStore } from '../stores/development-flags.store';
import { DataFeedService } from '../../data/services/data-feed.service';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { FeatureDevelopmentAction } from '../stores/development-flags.store-keys';

@Injectable()
export class DungeonDevService {

  private _actionDeregisters: Map<symbol, () => void>

  constructor(
    private readonly _storeService: StoreService,
    private readonly _developmentFlagsStore: DevelopmentFlagsStore,
    private readonly _dataFeedService: DataFeedService
  ) { }

  public initializeDevTools() {
    this._toggleDungeonCardsReloadingAction(this._developmentFlagsStore.currentState.allowDungeonCardsReload);
    this._toggleDungeonCardsAutoReloading(this._developmentFlagsStore.currentState.allowDungeonCardsAutoReload);
  }


  private _toggleDungeonCardsAutoReloading(flag: boolean): void {
    if (flag === true) {
      const dungeonStore = this._storeService.getStore<DungeonState>(StoreName.dungeonStateStore);
      const deregister = dungeonStore.registerPostActionCallbacks(
        [DungeonStateStoreAction.applyState, DungeonStateStoreAction.dispatchActivity],
        (ctx) => this._reloadDungeonCards(ctx.initialState))
      if (!deregister) {
        throw new Error("Cannot find deregister callback");
      }
      this._actionDeregisters.set(FeatureDevelopmentAction.dungeonCardsAutoreloadKey, deregister);
    } else {
      const deregister = this._actionDeregisters.get(FeatureDevelopmentAction.dungeonCardsAutoreloadKey);
      if (deregister) {
        deregister();
      }
    }   
  }


  private _toggleDungeonCardsReloadingAction(flag: boolean): void {
    if (flag === true) {
      const dungeonStore = this._storeService.getStore<DungeonState>(StoreName.dungeonStateStore);
      const deregister = dungeonStore.registerAction(FeatureDevelopmentAction.dungeonCardsReloadKey, {
        action: (ctx) => this._reloadDungeonCards(ctx.initialState)
      })
      if (!deregister) {
        throw new Error("Cannot find deregister callback");
      }
      this._actionDeregisters.set(FeatureDevelopmentAction.dungeonCardsReloadKey, deregister);
    } else {
      const deregister = this._actionDeregisters.get(FeatureDevelopmentAction.dungeonCardsReloadKey);
      if (deregister) {
        deregister();
      }
    }   
  }

  private async _reloadDungeonCards(state: DungeonState): Promise<void> {
    const dungeonCards = await this._dataFeedService.getDungeonCards(state.deck.allCards.map(c => c.id));
    state.deck.allCards.forEach(c => {
      const sourceCard = dungeonCards.find(dc => dc.id === c.id);
      if (sourceCard) {
        Object.assign(c, sourceCard);
      }
    })
    
  }

}
