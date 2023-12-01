import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { IDungeonInteractionState } from '../interfaces/interaction-state.interface';
import { mapDungeonStateToInteractionState } from '../mappings/dungeon-mappings';
import { makeObjectDeepCopy } from '@utils/misc-utils';


export const dungeonInteractionStore = Symbol('dungeon-interaction-store');

@Injectable()
export class DungeonInteractionStore {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };
  public get store() { return this._store }

  private _store: Store<IDungeonInteractionState>;
  private _updateStore = Symbol("update-interaction-store");

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  public updateState(state: Partial<IDungeonInteractionState>): void {
    this._store.dispatch(this._updateStore, state);
  }

  public initializeStore(initalData: DungeonState): void {
    this._store = this._storeService.createStore<IDungeonInteractionState>(dungeonInteractionStore, {
      initialState: mapDungeonStateToInteractionState(initalData),
      actions: { 
        [this._updateStore]: {
          action: (ctx) => this._updateState(ctx.payload, ctx.initialState),
        }
      } 
    });
  }

  private _updateState(payload: any, state: IDungeonInteractionState): IDungeonInteractionState {
    //const store = this._storeService.getStore<DungeonState>(dungeonStateStore);
    const newState: IDungeonInteractionState = Object.assign(state, makeObjectDeepCopy(payload));
    // newState.activities = newState.activities.map(a => {
    //   return Object.assign(a, {
    //     isDisabled: a.isDisabled || !validatePossibilityToUseEffect(store.currentState, { effect: a as unknown as IEffect })
    //   })
    // })
    return newState;
  }
}