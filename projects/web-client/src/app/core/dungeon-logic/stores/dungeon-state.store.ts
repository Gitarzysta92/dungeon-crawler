import { Injectable } from '@angular/core';
import { IStoreConfig, LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { IGameFeed } from '@game-logic/lib/game/game.interface';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { Observable, ReplaySubject, firstValueFrom, map, switchMap } from 'rxjs';
import { DungeonActivityName } from '@game-logic/lib/activities/constants/activity-name';
import { makeObjectDeepCopy } from 'src/app/utils/misc-utils';

export interface IDungeonStateStoreTransaction {
  store: Store<DungeonState>;
  dispatchActivity: (activity: IDispatcherDirective) => void;
  abandonTransaction: () => void
}

export const dungeonStateStore = Symbol('dungeon-state-store');
export const dungeonStateTransactionStore = Symbol('dungeon-state-transaction-store');

@Injectable()
export class DungeonStateStore {

  public get state() {
    return this._stateStream.pipe(switchMap(o => o))
  };
  public get currentState() { return this._state.currentState; }

  private _state: Store<DungeonState>;
  private _dispatchActivityKey = Symbol("dispatch-activity");
  private _applyStateKey = Symbol("apply-activity");
  private _dispatcherConfiguration: {
    context: IGameFeed;
    postDirectiveMutators: ((s: DungeonState) => void)[];
  } | undefined;

  private _stateStream: ReplaySubject<Observable<DungeonState>> = new ReplaySubject()

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public startTransaction(s: DungeonState): IDungeonStateStoreTransaction {
    if (!this._dispatcherConfiguration) {
      throw new Error('Transaction started before store initialization');
    }
    const transactionStore = this._createTransactionStoreConfiguration(new StateDispatcher(this._dispatcherConfiguration), s);
    const store = this._storeService.createStore<DungeonState>(dungeonStateTransactionStore, transactionStore);
    this._stateStream.next(store.state);

    return {
      store,
      dispatchActivity: (activity: IDispatcherDirective) => store.dispatch(this._dispatchActivityKey, activity),
      abandonTransaction: () => {
        this._stateStream.next(this._state.state);
        this._storeService.closeStore(dungeonStateTransactionStore);
      }
    }
  } 

  public dispatchTransaction(transaction: IDungeonStateStoreTransaction): void {
    this._state.dispatch(this._applyStateKey, transaction.store.currentState);
    this._stateStream.next(this._state.state);
    this._storeService.closeStore(dungeonStateTransactionStore);
  }

  public dispatchActivity(activity: IDispatcherDirective): void {
    this._state.dispatch(this._dispatchActivityKey, activity);
  }

  public async initializeStore(feed: IGameFeed): Promise<DungeonState> {
    this._dispatcherConfiguration = {
      context: feed,
      postDirectiveMutators: [(s: DungeonState) => this._applyTurnToChangeHistory(s)]
    };
    const dispatcher = new StateDispatcher(this._dispatcherConfiguration);
    this._state = this._storeService.createStore<DungeonState>(dungeonStateStore, this._createStoreConfiguration(dispatcher));
    this._stateStream.next(this._state.state);
    return await firstValueFrom(this.state);
  }

  private _applyTurnToChangeHistory(s: DungeonState): void {
    if (s.changesHistory[0]?.name === DungeonActivityName.FinishTurn) {
      s.changesHistory[0].turn = s.turn - 1;
    } else {
      s.changesHistory[0].turn = s.turn
    } 
  }

  private _createStoreConfiguration(dispatcher: StateDispatcher): IStoreConfig<DungeonState> {
    return {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: DungeonState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => this._localStorage.read<DungeonState>(key).pipe(map(s => new DungeonState(s)))
      },
      allowStateMutation: true,
      isLazyLoaded: true,
      actions: {
        [this._dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) },
        [this._applyStateKey]: { action: c => c.payload }
      }
    }
  }

  private _createTransactionStoreConfiguration(dispatcher: StateDispatcher, s: DungeonState): IStoreConfig<DungeonState> {
    return {
      initialState: new DungeonState(JSON.parse(JSON.stringify(s))),
      allowStateMutation: true,
      actions: {
        [this._dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    }
  }
}