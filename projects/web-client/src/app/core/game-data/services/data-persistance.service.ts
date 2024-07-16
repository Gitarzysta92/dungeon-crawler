import { Injectable } from '@angular/core';
import { IndexedDbService, LocalStorageService } from 'src/app/infrastructure/data-storage/api';

@Injectable({
  providedIn: 'root'
})
export class DataPersistanceService {

  constructor(
    private readonly _localStoreService: LocalStorageService,
    private readonly _indexedDbService: IndexedDbService
  ) { }

  public async persistData(tableName: string, data: { id: string }[]): Promise<void> {
    this._indexedDbService.createTable(tableName);
    data.forEach(i => {
      this._indexedDbService.insertV2(tableName, i.id, JSON.stringify(i));
    })
  }

  public async dropData(tableName: string, data: { id: string }[]): Promise<void> {
    for (let item of data) {
      this._indexedDbService.clear(item.id, tableName);
    }
  }

  public async dropAllData(tableName: string): Promise<void> {
    this._indexedDbService.clearTable(tableName);
  }

  public async tryDropData(tableName: string, data: { id: string }[]): Promise<void> {
    try {
      for (let item of data) {
        this._indexedDbService.clear(item.id, tableName);
      }
    } catch(err) {
      console.warn(err);
    }
  }

  public async getAllPersistedData<T>(tableName: string): Promise<T[]> {
    return this._indexedDbService.readAll(tableName) as unknown as T[];
  }

  public async getPersistedData<T extends object>(tableName: string, key: string, cb?: (r: string | T) => T): Promise<T> {
    const r = await this._indexedDbService.read<T>(key, tableName);
    return cb ? cb(r) : r;
  } 

  public async getData<T>(keys: string[]): Promise<{ key: string; data: T[]; }[]> {
    const result = [];
    for (let key in keys) {
      const data = await this._indexedDbService.readAll(key)
      result.push({ key, data })
    }
    return result;
  }

}
