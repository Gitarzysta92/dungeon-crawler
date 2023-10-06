import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { AdventureState } from '@game-logic/lib/game/adventure-state';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { IGameFeed } from '@game-logic/lib/game/game.interface';
import { IDungeon } from '@game-logic/lib/features/dungeon/dungeon.interface';
import { StateFactory } from '@game-logic/lib/game/state.factory';


export const dungeonStateStore = Symbol('dungeon-state-store');

@Injectable()
export class DungeonStateStore {

  public get state() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<DungeonState>;

  private _dispatchActivityKey = Symbol("dispatch-activity");

  constructor(
    private readonly _store: StoreService,
  ) { }

  public dispatchActivity(activity: IDispatcherDirective): void {
    this._state.dispatch(this._dispatchActivityKey, activity);
  }

  public registerStore(
    initalData: AdventureState,
    feed: IGameFeed,
    dungeon: IDungeon
  ): void {
    const dispatcher = new StateDispatcher({ context: feed });
    this._state = this._store.createStore<DungeonState>(dungeonStateStore, {
      initialState: StateFactory.createDungeonState(initalData, feed, dungeon),
      allowStateMutation: true,
      actions: {
        [this._dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    })
  }
}