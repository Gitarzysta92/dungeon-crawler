import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { AdventureState } from '@game-logic/lib/game/adventure-state';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { dataFeed } from '@game-logic/data/feed.data';
import { IGameFeed } from '@game-logic/lib/game/game.interface';
import { IDungeon } from '@game-logic/lib/features/dungeon/dungeon.interface';
import { StateFactory } from '@game-logic/lib/game/state.factory';


export const dungeonStateStore = Symbol('dungeon-state-store');

@Injectable()
export class DungeonStateStore {

  public get state() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<DungeonState>;

  private _dispatchActionKey = "dispatch-action"

  constructor(
    private readonly _store: StoreService,
  ) { }

  public dispatchAction(action: IDispatcherDirective): void {
    this._state.dispatch(this.dispatchAction, action);
  }

  public registerStore(
    initalData: AdventureState,
    feed: IGameFeed,
    dungeon: IDungeon
  ): void {
    const dispatcher = new StateDispatcher({ context: dataFeed });
    this._state = this._store.createStore<DungeonState>(dungeonStateStore, {
      initialState: StateFactory.createDungeonState(initalData, feed, dungeon),      
      actions: {
        [this._dispatchActionKey]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    })
  }

  // private _buildActions(dispatcher: StateDispatcher): [string, IStoreActionDefinition<DungeonState>][] { 
  //   return Object.keys(dungeonActivitiesMap).map(k => [k, { action: c => dispatcher.next(c.payload, c.initialState) }]);
  // }

  // private _determineActionName(action: IDispatcherDirective): DungeonActivityName { 
  //   return Object.values(ActivityName).find(k => k.name === action.name);
  // }
}