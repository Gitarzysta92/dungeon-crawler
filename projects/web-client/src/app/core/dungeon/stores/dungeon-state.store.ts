import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { BehaviorSubject } from 'rxjs';
import { DungeonGameplay } from '../gameplay/dungeon.gameplay';
import { IGameStore } from '../../game/interfaces/game-store.interface';
import { IDungeonGameplayState } from '../gameplay/dungeon-gameplay.interface';
import { SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY } from '../../game-persistence/constants/game-persistence.constants';


@Injectable({ providedIn: "root" })
export class DungeonStateStore implements IGameStore {

  public get isInitialized() { return !!this._state }
  public get state$() { return this._state };
  public get currentState() { return this._state.value; }

  private _state: BehaviorSubject<DungeonGameplay> | undefined;
  private _gameplayFactory: (g: IDungeonGameplayState) => Promise<DungeonGameplay>;

  constructor(
    private readonly _localStorage: LocalStorageService
  ) { }

  public setState(gameplay: DungeonGameplay) {
    this._state.next(gameplay);
    this._localStorage.createOrUpdate(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY, gameplay)
  }

  public startTransaction() {
    const stateSnapshot = JSON.stringify(this.currentState);
    const x = JSON.parse(stateSnapshot);
    return async () => this.setState(await this._gameplayFactory(JSON.parse(stateSnapshot)));
  }

  public dispose() {
    this._state.complete();
    delete this._state;
  }

  public async initializeStore(
    adventure: IDungeonGameplayState,
    gameplayFactory: (g: IDungeonGameplayState) => Promise<DungeonGameplay>
  ): Promise<void> {
    this._gameplayFactory = gameplayFactory;
    let state = await this._localStorage.read<IDungeonGameplayState>(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY);
    if (!state) {
      state = adventure as any;
    }

    if (this._state) {
      this._state.complete();
    }

    this._state = new BehaviorSubject(await this._gameplayFactory(state))
    this._state.value.listenAllEvents(() => this.setState(this._state.value))
  }

}