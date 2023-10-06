import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { IDungeonUiState } from '../interfaces/dungeon-ui-state';
import { mapDungeonStateToUiState } from '../mappings/dungeon-ui-mappings';


export const dungeonUiStore = Symbol('dungeon-ui-store');

@Injectable()
export class DungeonUiStore {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDungeonUiState>;
  private _updateStore = Symbol("update-ui-store");

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  public updateState(state: Partial<IDungeonUiState>): void {
    this._store.dispatch(this._updateStore, state);
  }

  public registerStore(initalData: DungeonState): void {
    this._store = this._storeService.createStore<IDungeonUiState>(dungeonUiStore, {
      initialState: mapDungeonStateToUiState(initalData),
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