import { Injectable } from "@angular/core";
import { Store } from "@utils/store/store";
import { IStateStoreTransaction } from "../interfaces/state-store-transaction.interface";
import { switchMap, ReplaySubject, Observable, firstValueFrom } from "rxjs";
import { StoreService } from "src/app/infrastructure/data-storage/api";
import { StoreName, DungeonStateStoreAction } from "../../dungeon/stores/dungeon-state.store-keys";

@Injectable()
export class TransactionalStoreService<T> {

  public get isInitialized() { return !!this.store }

  public get state$() { return this.stateStream.pipe(switchMap(o => o)) };
  public get currentState() { return this.transactionStore?.currentState ?? this.store.currentState; }

  protected store: Store<T>;
  protected transactionStore: Store<T>;
  protected stateStream: ReplaySubject<Observable<T>> = new ReplaySubject()

  constructor(
    protected readonly storeService: StoreService,
  ) { }

  public async setStore(s: Store<T>): Promise<T> {
    this.store = s;
    this.stateStream.next(this.store.state);
    return await firstValueFrom(this.state$);
  }

  public async setTransactionStore(s: Store<T>): Promise<IStateStoreTransaction<T>> {
    this.transactionStore = s;
    this.stateStream.next(this.transactionStore.state);

    return {
      store: this.transactionStore,
      dispatch: (payload: unknown) => this.transactionStore.dispatch(DungeonStateStoreAction.dispatchActivity, payload),
      abandonTransaction: () => {
        this.stateStream.next(this.store.state);
        this.storeService.closeStore(StoreName.dungeonStateTransactionStore);
      }
    }
  }

  public async dispatchTransaction(transaction: IStateStoreTransaction<T>): Promise<void> {
    await this.store.dispatch(DungeonStateStoreAction.applyState, transaction.store.currentState);
    this.stateStream.next(this.store.state);
    this.storeService.closeStore(StoreName.dungeonStateTransactionStore);
  }

}