import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { dungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';

@Injectable({
  providedIn: 'root'
})
export class DungeonGuard implements CanActivate {

  constructor(
    private readonly _localStorageService: LocalStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!this._localStorageService.read<DungeonState>(dungeonStateStore.description).pipe(map(r => !!r));
  }
  
}
