import { Injectable } from '@angular/core';
import { IStoreConfig, LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { IGameFeed } from '@game-logic/lib/game/game.interface';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { Observable, ReplaySubject, firstValueFrom, map, switchMap } from 'rxjs';

export interface IDungeonStateStoreTransaction {
  store: Store<DungeonState>;
  dispatchActivity: (activity: IDispatcherDirective) => void;
  abandonTransaction: () => void
}

export const dungeonStateStore = Symbol('dungeon-state-store');
export const dungeonStateTransactionStore = Symbol('dungeon-state-transaction-store');

@Injectable()
export class DungeonStateStore {


  public get state$() {
    return this._stateStream.pipe(switchMap(o => o))
  };
  public get currentState() { return this._store.currentState; }
  public get store() { return this._store };
  public get transactionStore() { return this._transactionStore }

  private _store: Store<DungeonState>;
  private _transactionStore: Store<DungeonState>;
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
    const transactionStoreConfiguration = this._createTransactionStoreConfiguration(new StateDispatcher(this._dispatcherConfiguration), s);
    this._transactionStore = this._storeService.createStore<DungeonState>(dungeonStateTransactionStore, transactionStoreConfiguration);
    this._stateStream.next(this._transactionStore.state);

    return {
      store: this._transactionStore,
      dispatchActivity: (activity: IDispatcherDirective) => this._transactionStore.dispatch(this._dispatchActivityKey, activity),
      abandonTransaction: () => {
        this._stateStream.next(this._store.state);
        this._storeService.closeStore(dungeonStateTransactionStore);
      }
    }
  } 

  public async  dispatchTransaction(transaction: IDungeonStateStoreTransaction): Promise<void> {
    await firstValueFrom(this._store.dispatch(this._applyStateKey, transaction.store.currentState));
    this._stateStream.next(this._store.state);
    this._storeService.closeStore(dungeonStateTransactionStore);
  }


  public async dispatchActivity(activity: IDispatcherDirective): Promise<void> {
    await firstValueFrom(this._store.dispatch(this._dispatchActivityKey, activity));
  }

  public async initializeStore(feed: IGameFeed): Promise<DungeonState> {
    this._dispatcherConfiguration = {
      context: feed,
      postDirectiveMutators: [
        (s: DungeonState) => s.applyTurnToChangeHistory(),
        (s: DungeonState) => s.setPerformerForLastActivity(),
        (s: DungeonState) => s.updateRound()
      ]
    };
    const dispatcher = new StateDispatcher(this._dispatcherConfiguration);
    this._store = this._storeService.createStore<DungeonState>(dungeonStateStore, this._createStoreConfiguration(dispatcher));
    this._stateStream.next(this._store.state);
    return await firstValueFrom(this.state$);
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