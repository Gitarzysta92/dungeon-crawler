import { Injectable } from "@angular/core";
import { firstValueFrom, from, Observable, switchMap } from "rxjs";
import { IStateStorage } from "../../../../../../../utils/src/store/interfaces/store-state-storage.interface";
import * as localForage from "localforage";

@Injectable({ providedIn: "root" })
export class IndexedDbService implements IStateStorage<unknown> {
 
  private _stores: { [key: string]: LocalForage } = {};
  private _defaultKey: string = 'default';
  private get _localForage() { return this._stores[this._defaultKey] }

  constructor() { }

  public createTable<T>(name: string): any {
    if (!!this._stores[name]) {
      return;
    }
    this._stores[name] = localForage.createInstance({ name });
  }

  public insert<T extends { id: string }>(storageKey: string, payload: T[], cb?: (i: T) => string): void {
    payload.forEach(i => this._stores[storageKey].setItem(!!cb ? cb(i) : i.id, i));
  }

  public read<T extends object>(storageKey: string, tableName?: string): Promise<T> {
    if (tableName) {
      return this._stores[tableName].getItem<T>(storageKey);
    }
    return this._localForage.getItem<T>(storageKey);
  }

  public readAll<T extends object>(tableName?: string): Promise<T[]> {
    const store = tableName ? this._stores[tableName] : this._localForage;
    return firstValueFrom(from(store.keys())
      .pipe(switchMap(keys => from(Promise.all(keys.map(k => store.getItem<T>(k)))))));
  }

  public createOrUpdate<T extends object>(storageKey: string, data: T, tableName?: string): Promise<T> {
    if (tableName) {
      return this._stores[tableName].setItem<T>(storageKey, data);
    }
    return this._localForage.setItem(storageKey, data);
  }

  public clear(localStorageKey: string, tableName?: string): void {
    if (tableName) {
      this._stores[tableName].removeItem(localStorageKey);
    }

    this._localForage.removeItem(localStorageKey);
  }

  public clearStorage(): void {
    this._localForage.clear();
  }

  public registerDefaultStore() {
    this._stores[this._defaultKey] = localForage.createInstance({ name: "miscs" })
  }

}
