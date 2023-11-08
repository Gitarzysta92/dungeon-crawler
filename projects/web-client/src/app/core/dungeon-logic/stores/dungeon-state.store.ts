import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { IGameFeed } from '@game-logic/lib/game/game.interface';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { firstValueFrom, map } from 'rxjs';



export const dungeonStateStore = Symbol('dungeon-state-store');

@Injectable()
export class DungeonStateStore {

  public get state() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<DungeonState>;

  private _dispatchActivityKey = Symbol("dispatch-activity");

  constructor(
    private readonly _store: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public dispatchActivity(activity: IDispatcherDirective): void {
    this._state.dispatch(this._dispatchActivityKey, activity);
  }

  public async initializeStore(feed: IGameFeed): Promise<DungeonState> {
    const dispatcher = new StateDispatcher({ context: feed });
    this._state = this._store.createStore<DungeonState>(dungeonStateStore, {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: DungeonState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => this._localStorage.read<DungeonState>(key).pipe(map(s => new DungeonState(s)))
      },
      allowStateMutation: true,
      isLazyLoaded: true,
      actions: {
        [this._dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    })
    return await firstValueFrom(this.state);
  }
}