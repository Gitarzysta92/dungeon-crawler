import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IStoreConfig } from '@utils/store/interfaces/store-config.interface';
import { Store } from '@utils/store/store';


@Injectable({ providedIn: 'root' })
export class StoreService {

  public state: Observable<Observable<any>[]>;
  private _state: BehaviorSubject<Observable<any>[]>;

  private _collections: { [key: string]: Store<any> };

  constructor() { 
    this._collections = {};
    this._initializeGlobalStream();
  }

  public createStore<T>(key: any, config: IStoreConfig<T>): Store<T> {
    if (!!this._collections[key]) {
      return this._collections[key];
    }

    const newStore = new Store<T>({ key, ...config });
    newStore.initialize();

    Object.defineProperty(this._collections, key, {
      value: newStore,
      enumerable: true    
    });

    this._updateCollectionsInGlobalStream(this._collections);
    return this._collections[key];
  }


  public getStore<T>(key: any): Store<T> {
    return this._collections[key];
  }

  public closeStores(stores?: Store<any>[], preserveStoredData?: boolean) {
    const keys = stores?.length > 0 ?
      stores.map(s => s?.key).filter(s => !!s) :
      Object.getOwnPropertySymbols(this._collections);
    
    if (preserveStoredData) {
      this.flushStates(keys);
    } else {
      this.clearStates();
    }

    for (let key of keys) {
      delete this._collections[key as any];
     }
  }

  public closeStore(key: any) {
    this._collections[key]?.clearState();
    delete this._collections[key];
  }
  
  public clearStates(keys?: Symbol[]) {
    for (let key of keys ?? Object.getOwnPropertySymbols(this._collections)) {
      this._collections[key as any]?.clearState();
     }
  }

  public flushStates(keys?: Symbol[]) {
    for (let key of keys ?? Object.getOwnPropertySymbols(this._collections)) {
      this._collections[key as any]?.flushState();
     }
  }

  private _initializeGlobalStream(): void {
    this._state = new BehaviorSubject([]);
    this.state = this._state
      .pipe(
        switchMap(c => combineLatest(c)),
        filter(c => c.every(c => c.value))
      )
  }

  private _updateCollectionsInGlobalStream(collections: { [key: string]: Store<any> }): void {
    this._state.next(Object.getOwnPropertySymbols(collections)
      .map(key => {
        return collections[key as any].changed.pipe(map(value => ({ key: (key as any).description, value })))
      }));
  }
}