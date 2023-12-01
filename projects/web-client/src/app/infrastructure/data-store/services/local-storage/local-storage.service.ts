import { Injectable } from "@angular/core";
import { Observable, firstValueFrom, of } from "rxjs";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";


@Injectable({ providedIn: 'root'})
export class LocalStorageService implements IStateStorage<unknown> {
  
  constructor() {}

  public read<T extends object>(localStorageKey: string): Promise<T> {
    return firstValueFrom(of(JSON.parse(localStorage.getItem(localStorageKey))))
  }

  public createOrUpdate<T extends object>(localStorageKey: string, value: T): Promise<void> {
    return firstValueFrom(of(localStorage.setItem(localStorageKey, JSON.stringify(value))))
  }

  public clear(localStorageKey: string): void {
    localStorage.removeItem(localStorageKey);
  }

}