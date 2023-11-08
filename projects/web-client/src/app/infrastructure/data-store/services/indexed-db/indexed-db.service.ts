import { Injectable } from "@angular/core";
import { from, map, Observable, switchMap, tap } from "rxjs";
import { IStateStorage } from "../../models/store-state-storage";
import * as localForage from "localforage";

@Injectable({ providedIn: "root" })
export class IndexedDbService implements IStateStorage<unknown> {
 
  private _stores: { [key: string]: LocalForage } = {};
  private _defaultKey: string = 'default';
  private get _localForage() { return this._stores[this._defaultKey] }

  constructor() { }

  public createTable<T>(name: string): any {
    this._stores[name] = localForage.createInstance({ name });
  }

  public insert<T extends { id: string }>(storageKey: string, payload: T[], cb?: (i: T) => string): void {
    payload.forEach(i => this._stores[storageKey].setItem(!!cb ? cb(i) : i.id, i));
  }

  public read<T extends object>(storageKey: string, tableName?: string): Observable<T> {
    if (tableName) {
      return from(this._stores[tableName].getItem<T>(storageKey));
    }
    return from(this._localForage.getItem<T>(storageKey));
  }

  public readAll<T extends object>(tableName?: string): Observable<T[]> {
    const store = tableName ? this._stores[tableName] : this._localForage;
    return from(store.keys())
      .pipe(switchMap(keys => from(Promise.all(keys.map(k => store.getItem<T>(k))))));
  }

  public createOrUpdate<T extends object>(storageKey: string, data: T, tableName?: string): Observable<T> {
    if (tableName) {
      return from(this._stores[tableName].setItem<T>(storageKey, data));
    }
    return from(this._localForage.setItem(storageKey, data));
  }

  public clear(localStorageKey: string, tableName?: string): void {
    if (tableName) {
      this._stores[tableName].removeItem(localStorageKey);
    }

    this._localForage.removeItem(localStorageKey);
  }

  public registerDefaultStore() {
    this._stores[this._defaultKey] = localForage.createInstance({ name: "miscs" })
  }

}
