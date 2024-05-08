import { Injectable } from '@angular/core';
import { IndexedDbService } from 'src/app/infrastructure/data-storage/api';
import { IDataContainer } from '../interface/data-container.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSeedService {

  constructor(
    private readonly _indexedDbService: IndexedDbService
  ) { }


  public loadData(data: Array<{ key: string, data: IDataContainer<unknown>[] }>): void {
    this._indexedDbService.clearStorage();

    for (let record of data) {
      this._indexedDbService.createTable(record.key);
      this._indexedDbService.insert(record.key, record.data);
    }
  }
}
