import { Injectable } from "@angular/core";
import { firstValueFrom, from, switchMap } from "rxjs";
import { IStateStorage } from "../../../../../../../utils/src/store/interfaces/store-state-storage.interface";
import * as localForage from "localforage";
import { IStorable } from "../../interfaces/storable.interface";

@Injectable({ providedIn: "root" })
export class IndexedDbService implements IStateStorage<unknown> {
 
  private _tables: { [key: string]: LocalForage } = {};
  private _defaultKey: string = 'default';
  private get _localForage() { return this._tables[this._defaultKey] }

  constructor() { }

  public createTable<T>(name: string): any {
    if (!!this._tables[name]) {
      return;
    }
    this._tables[name] = localForage.createInstance({ name });
  }

  public insert<T extends IStorable>(
    storageKey: string,
    payload: T[],
    indexCb?: (i: T) => string,
    payloadCb?: (i: T) => string,
  ): void {
    payload.forEach(i => this._tables[storageKey].setItem(
      !!indexCb ? indexCb(i) : i.id,
      !!payloadCb ? payloadCb(i) : i.toStorableFormat ? i.toStorableFormat() : i));
  }

  public read<T extends object>(storageKey: string, tableName?: string): Promise<T> {
    if (tableName) {
      return this._tables[tableName]?.getItem<T>(storageKey);
    }
    return this._localForage.getItem<T>(storageKey);
  }

  public async readAll<T extends object>(tableName?: string): Promise<T[]> {
    const store = tableName ? this._tables[tableName] : this._localForage;
    if (!store) {
      return []
    }
    return firstValueFrom(from(store.keys())
      .pipe(switchMap(keys => from(Promise.all(keys.map(k => store.getItem<T>(k)))))));
  }

  public createOrUpdate<T extends object>(storageKey: string, data: T, tableName?: string): Promise<T> {
    if (tableName) {
      return this._tables[tableName].setItem<T>(storageKey, data);
    }
    return this._localForage.setItem(storageKey, data);
  }

  public clear(localStorageKey: string, tableName?: string): void {
    if (tableName) {
      this._tables[tableName].removeItem(localStorageKey);
    }

    this._localForage.removeItem(localStorageKey);
  }

  public clearTable(tableName: string): void {
    this._tables[tableName].clear();
  }

  public clearStorage(): void {
    this._localForage.clear();
  }

  public registerDefaultStore() {
    this._tables[this._defaultKey] = localForage.createInstance({ name: "miscs" })
  }

}
