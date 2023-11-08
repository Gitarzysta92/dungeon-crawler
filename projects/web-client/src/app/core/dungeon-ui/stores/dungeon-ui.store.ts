import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { IDungeonUiState } from '../interfaces/dungeon-ui-state';
import { mapDungeonStateToUiState } from '../mappings/dungeon-ui-mappings';
import { DataFeedService } from '../../data-feed/services/data-feed.service';
import { ISpellOrAbilityDataFeedEntity } from '../../data-feed/interfaces/data-feed-effect-entity.interface';


export const dungeonUiStore = Symbol('dungeon-ui-store');

@Injectable()
export class DungeonUiStore {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDungeonUiState>;
  private _updateStore = Symbol("update-ui-store");

  constructor(
    private readonly _storeService: StoreService,
    private readonly _dataFeedService: DataFeedService
  ) { }

  public updateState(state: Partial<IDungeonUiState>): void {
    this._store.dispatch(this._updateStore, state);
  }

  public async initializeStore(state: DungeonState, data: ISpellOrAbilityDataFeedEntity[]): Promise<void> {
    this._store = this._storeService.createStore<IDungeonUiState>(dungeonUiStore, {
      initialState: mapDungeonStateToUiState(state, data),
      actions: { 
        [this._updateStore]: {
          action: (ctx) => this._updateState(ctx.payload, ctx.initialState),
        }
      } 
    });
  }

  private _updateState(payload: any, state: IDungeonUiState): IDungeonUiState {
    const newState: IDungeonUiState = Object.assign(state, payload);
    return newState;
  }
}