import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdventureState } from '@game-logic/lib/game/adventure-state';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { adventureStateStore } from '../stores/adventure-state.store';

@Injectable({
  providedIn: 'root'
})
export class AdventureGuard implements CanActivate {

  constructor(
    private readonly _localStorageService: LocalStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._localStorageService.read<AdventureState>(adventureStateStore.description).pipe(map(r => !!r));
  }
  
}
