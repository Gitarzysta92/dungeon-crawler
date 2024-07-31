import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { BehaviorSubject } from 'rxjs';
import { IGameStore } from '../../game/interfaces/game-store.interface';
import { PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY } from '../../game-persistence/constants/game-persistence.constants';
import { IAdventureGameplayState } from '../gameplay/adventure-gameplay.interface';
import { AdventureGameplay } from '../gameplay/adventure.gameplay';


@Injectable({ providedIn: "root" })
export class AdventureStateStore implements IGameStore {

  public get isInitialized() { return !!this._state }
  public get state$() { return this._state };
  public get currentState() { return this._state.value; }

  private _state: BehaviorSubject<AdventureGameplay> | undefined;
  private _gameplayFactory: (g: IAdventureGameplayState) => Promise<AdventureGameplay>;

  constructor(
    private readonly _localStorage: LocalStorageService
  ) { }

  public setState(gameplay: AdventureGameplay) {
    this._state.next(gameplay);
    this._localStorage.createOrUpdate(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY, gameplay)
  }

  public startTransaction() {
    const stateSnapshot = JSON.stringify(this.currentState);
    return async () => this.setState(await this._gameplayFactory(JSON.parse(stateSnapshot)));
  }

  public dispose() {
    this._state.complete();
    delete this._state;
  }

  public async initializeStore(
    adventure: IAdventureGameplayState,
    gameplayFactory: (g: IAdventureGameplayState) => Promise<AdventureGameplay>
  ): Promise<void> {
    this._gameplayFactory = gameplayFactory;
    let state = await this._localStorage.read<IAdventureGameplayState>(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY);
    if (!state) {
      state = adventure as any;
    }

    if (this._state) {
      this._state.complete();
    }

    this._state = new BehaviorSubject(await this._gameplayFactory(state))
  }

}