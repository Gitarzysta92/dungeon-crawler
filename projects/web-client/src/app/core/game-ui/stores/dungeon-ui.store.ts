import { Injectable, OnDestroy } from '@angular/core';
import { Store } from 'src/app/infrastructure/data-store/api';
import { Subject } from 'rxjs';
import { IDungeonUiState } from '../states/dungeon-ui-state.interface';
import { DungeonStateStoreAction } from '../../dungeon/stores/dungeon-state.store-keys';

@Injectable()
export class DungeonUiStore implements OnDestroy {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };
  public get store() { return this._store }

  private _store: Store<IDungeonUiState>;
  private _updateStore = Symbol("update-ui-store");

  private _onDestroy: Subject<void> = new Subject();

  constructor() { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public updateState(state: Partial<IDungeonUiState>): void {
    this._store.dispatch(this._updateStore, state);
  }

  public async initializeStore(dungeonStore: Store<IDungeonUiState>): Promise<void> {
    this._store = dungeonStore;
    this._store.registerAction(this._updateStore, {
      action: (ctx) => this._updateState(ctx.payload, ctx.initialState),
    });
    // this._store.registerPostActionCallbacks(
    //   [DungeonStateStoreAction.dispatchActivity, this._updateStore],
    //   c => c.computedState.updateActivities())
  }

  private _updateState(payload: any, state: IDungeonUiState): IDungeonUiState {
    const newState: IDungeonUiState = Object.assign(state, payload);
    return newState;
  }

}