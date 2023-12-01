import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { IGameFeed } from '@game-logic/lib/game/game.interface';
import { AdventureState } from '@game-logic/lib/game/adventure-state';
import { firstValueFrom, map } from 'rxjs';



export const adventureStateStore = Symbol('adventure-state-store');

@Injectable()
export class AdventureStateStore {

  public get state() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<AdventureState>;

  private _dispatchActivityKey = Symbol("dispatch-activity");

  constructor(
    private readonly _store: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public async dispatchActivity(activity: IDispatcherDirective): Promise<void> {
    await firstValueFrom(this._state.dispatch(this._dispatchActivityKey, activity));
  }

  public async initializeStore(feed: IGameFeed): Promise<AdventureState> {
    if (this._state) {
      return;
    }

    const dispatcher = new StateDispatcher({ context: feed });
    this._state = this._store.createStore<AdventureState>(adventureStateStore, {
      initialState: this._localStorage.read(adventureStateStore.description),
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: AdventureState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => this._localStorage.read<AdventureState>(key).pipe(map(s => new AdventureState(s)))
      },
      allowStateMutation: true,
      actions: {
        [this._dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    });
    return await firstValueFrom(this.state);
  }
}