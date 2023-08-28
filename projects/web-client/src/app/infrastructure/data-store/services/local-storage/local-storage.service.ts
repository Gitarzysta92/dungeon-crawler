import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IStateStorage } from "../../models/store-state-storage";


@Injectable({ providedIn: 'root'})
export class LocalStorageService implements IStateStorage<unknown> {
  
  constructor() {}

  public read<T extends object>(localStorageKey: string): Observable<T> {
    return of(JSON.parse(localStorage.getItem(localStorageKey)))
  }

  public createOrUpdate<T extends object>(localStorageKey: string, profile: T): Observable<void> {
    return of(localStorage.setItem(localStorageKey, JSON.stringify(profile)))
  }

  public clear(localStorageKey: string): void {
    localStorage.removeItem(localStorageKey);
  }

}