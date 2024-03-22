import { Injectable } from '@angular/core';
import { IAuxiliaryContainer } from '../../commons/interfaces/auxiliary-container.interface';
import { IndexedDbService } from 'src/app/infrastructure/data-store/api';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSeedService {

  constructor(
    private readonly _indexedDbService: IndexedDbService
  ) { }


  public loadData(data: Array<{ key: string, data: IAuxiliaryContainer<IEntity>[] }>): void {
    this._indexedDbService.clearStorage();

    for (let record of data) {
      this._indexedDbService.createTable(record.key);
      this._indexedDbService.insert(record.key, record.data);
    }
  }
}
