import { Injectable } from '@angular/core';
import { IStoreConfig, LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDispatcherDirective } from '@game-logic/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface';
import { StateDispatcher } from '@game-logic/lib/utils/state-dispatcher/state-dispatcher';
import { IGameFeed } from '@game-logic/lib/states/game.interface';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { Observable, ReplaySubject, firstValueFrom, from, map, switchMap } from 'rxjs';
import { DungeonStateStoreAction, StoreName } from './dungeon-state.store-keys';

export interface IDungeonStateStoreTransaction {
  store: Store<DungeonState>;
  dispatchActivity: (activity: IDispatcherDirective) => Promise<void>;
  abandonTransaction: () => void
}

@Injectable()
export class DungeonStateStore {

  public get state$() {
    return this._stateStream.pipe(switchMap(o => o))
  };
  
  public get currentState() { return this.transactionStore?.currentState ?? this._store.currentState; }
  public get store() { return this._store };
  public get transactionStore() { return this._transactionStore }

  private _store: Store<DungeonState>;
  private _transactionStore: Store<DungeonState>;
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
    this._transactionStore = this._storeService.createStore<DungeonState>(StoreName.dungeonStateTransactionStore, transactionStoreConfiguration);
    this._stateStream.next(this._transactionStore.state);

    return {
      store: this._transactionStore,
      dispatchActivity: (activity: IDispatcherDirective) => this._transactionStore.dispatch(DungeonStateStoreAction.dispatchActivityKey, activity),
      abandonTransaction: () => {
        this._stateStream.next(this._store.state);
        this._storeService.closeStore(StoreName.dungeonStateTransactionStore);
      }
    }
  } 

  public async dispatchTransaction(transaction: IDungeonStateStoreTransaction): Promise<void> {
    await this._store.dispatch(DungeonStateStoreAction.applyStateKey, transaction.store.currentState);
    this._stateStream.next(this._store.state);
    this._storeService.closeStore(StoreName.dungeonStateTransactionStore);
  }


  public async dispatchActivity(activity: IDispatcherDirective): Promise<void> {
    await this._store.dispatch(DungeonStateStoreAction.dispatchActivityKey, activity);
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
    this._store = this._storeService.createStore<DungeonState>(StoreName.dungeonStateStore, this._createStoreConfiguration(dispatcher));
    this._stateStream.next(this._store.state);
    return await firstValueFrom(this.state$);
  } 

  private _createStoreConfiguration(dispatcher: StateDispatcher): IStoreConfig<DungeonState> {
    return {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: DungeonState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => firstValueFrom(from(this._localStorage.read<DungeonState>(key)).pipe(map(s => new DungeonState(s))))
      },
      allowStateMutation: true,
      isLazyLoaded: true,
      actions: {
        [DungeonStateStoreAction.dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) },
        [DungeonStateStoreAction.applyStateKey]: { action: c => c.payload }
      }
    }
  }

  private _createTransactionStoreConfiguration(dispatcher: StateDispatcher, s: DungeonState): IStoreConfig<DungeonState> {
    return {
      initialState: new DungeonState(JSON.parse(JSON.stringify(s))),
      allowStateMutation: true,
      actions: {
        [DungeonStateStoreAction.dispatchActivityKey]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    }
  }
}