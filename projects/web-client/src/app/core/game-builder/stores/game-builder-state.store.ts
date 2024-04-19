import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { firstValueFrom, from, switchMap } from 'rxjs';
import { IDispatcherDirective } from '@game-logic/lib/base/state/state.interface';
import { GameBuilderStateStoreAction, StoreName } from './game-builder.store-keys';
import { StateDispatcher } from '@game-logic/lib/base/state/state-dispatcher';
import { GameBuilderState } from '../state/game-builder.state';
import { IGameBuilderState } from '../state/game-builder-state.interface';


@Injectable()
export class GameBuilderStateStore {

  public get state$() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<GameBuilderState>;
  private _dispatcher: StateDispatcher<GameBuilderState> = new StateDispatcher({ context: {} as any });;

  constructor(
    private readonly _store: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

public async dispatch(activity: IDispatcherDirective<unknown>): Promise<void> {
    await this._state.dispatch(GameBuilderStateStoreAction.dispatchActivityKey, activity);
  }

  public async initializeStore(
    initialState: IGameBuilderState,
    factory: (g: IGameBuilderState) => Promise<GameBuilderState>
  ): Promise<GameBuilderState> {
    if (this._state) {
      return;
    }

    this._state = this._store.createStore<GameBuilderState>(StoreName.gameBuilderStateStore, {
      initialState: factory(initialState),
      // stateStorage: {
      //   clear: (key: string) => this._localStorage.clear(key),
      //   createOrUpdate: (key: string, s: GameBuilderState) => this._localStorage.createOrUpdate(key, s),
      //   read: (key: string) => firstValueFrom(from(this._localStorage.read<GameBuilderState>(key)).pipe(switchMap(s => factory(s as any))))
      // },
      allowStateMutation: true,
      actions: {
        [GameBuilderStateStoreAction.dispatchActivityKey]: { action: c => this._dispatcher.next(c.payload, c.initialState) }
      }
    });
    return await firstValueFrom(this.state$);
  }
}