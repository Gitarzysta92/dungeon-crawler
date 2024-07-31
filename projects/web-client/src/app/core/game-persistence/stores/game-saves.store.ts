import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { BehaviorSubject } from 'rxjs';
import { GamesState } from '../states/games-state';

@Injectable({ providedIn: "root" })
export class GameSavesStore  {
  
  public get isInitialized() { return !!this._state }
  public get state$() { return this._state };
  public get currentState() { return this._state.value; }

  private _state: BehaviorSubject<GamesState> | undefined;

  constructor(
    private readonly _localStorage: LocalStorageService
  ) { }

  public setState(state: GamesState) {
    this._state.next(state);
    this._localStorage.createOrUpdate("game-saves", state)
  }


  public async initialize() {
    let state = await this._localStorage.read<GamesState>("game-saves");
    if (this._state) {
      this._state.complete();
    }
    this._state = new BehaviorSubject(state);
  }
}