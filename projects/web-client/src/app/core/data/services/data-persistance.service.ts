import { Injectable } from '@angular/core';
import { IndexedDbService, LocalStorageService } from 'src/app/infrastructure/data-store/api';

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
    this._indexedDbService.insert(tableName, data);
  }

  public async dropData(tableName: string, data: { id: string }[]): Promise<void> {
    for (let item of data) {
      this._indexedDbService.clear(item.id, tableName);
    }
  }

  public async getAllPersistedData<T>(tableName: string): Promise<T[]> {
    return this._indexedDbService.readAll(tableName) as unknown as T[];
  }

  public async getPersistedData<T extends object>(tableName: string, key: string): Promise<T> {
    return this._indexedDbService.read<T>(tableName, key);
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
