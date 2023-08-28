import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { IStateStorage } from "../../models/store-state-storage";
import * as localForage from "localforage";

@Injectable({ providedIn: "root" })
export class IndexedDbService implements IStateStorage<unknown> {
  
  constructor() { }

  public read<T extends object>(storageKey: string): Observable<T> {
    return from(localForage.getItem<T>(storageKey))
  }

  public createOrUpdate<T extends object>(storageKey: string, data: T): Observable<T> {
    return from(localForage.setItem(storageKey, data));
  }

  public clear(localStorageKey: string): void {
    localStorage.removeItem(localStorageKey);
  }

}
