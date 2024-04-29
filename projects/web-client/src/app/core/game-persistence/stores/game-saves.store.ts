import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { Subject } from 'rxjs';
import { GamesState } from '../states/games-state';
import { IGameSave, IPersistedGameData } from '../interfaces/persisted-game.interface';
import { DataPersistanceService } from '../../data/services/data-persistance.service';
import { PERSISTED_GAME_DATA_KEY } from '../constants/game-persistence.constants';

export const gameSavesState = Symbol('game-saves');

@Injectable({ providedIn: "root" })
export class GameSavesStore implements OnDestroy {
  
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };
  public get store() { return this._store }

  private _store: Store<GamesState>;
  private _createGameSave = Symbol("create-game-save");
  private _selectSavedGame = Symbol("select-saved-game");
  private _removeSavedGame = Symbol("remove-saved-game");
  private _updateSavedGame = Symbol("update-saved-game");

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
    private readonly _persistanceService: DataPersistanceService,
    private readonly _localStorageService: LocalStorageService
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }


  public createGameSave(gameSave: IGameSave, persistedGameData: IPersistedGameData): Promise<void> {
    return this._store.dispatchInline(this._createGameSave, {
      action: (ctx) => Object.assign(ctx.initialState, {
        savedGames: [
          gameSave, ctx.initialState.savedGames]
      }),
      after: [
        () => console.log(JSON.stringify(persistedGameData)),
        () => this._persistanceService.persistData(PERSISTED_GAME_DATA_KEY, [persistedGameData]),
      ]
    });
  }

  
  public selectGameSave(savedGameId: string): Promise<void> {
    return this._store.dispatchInline(this._selectSavedGame, {
      action: (ctx) => Object.assign(ctx.initialState, { selectedGameSaveId: savedGameId }),
    })
  }


  public removeGameSave(gameSave: IGameSave): Promise<void> {
    return this._store.dispatchInline(this._removeSavedGame, {
      action: (ctx) => Object.assign(ctx.initialState, {
        savedGames: [
          gameSave, ctx.initialState.savedGames.filter(s => s.persistedGameDataId !== gameSave.persistedGameDataId)]
      }),
      after: [() => this._persistanceService.dropData(PERSISTED_GAME_DATA_KEY, [ { id: gameSave.persistedGameDataId } ])]
    });
  }


  public updateGameSave(gameSave: IGameSave, persistedGameData: IPersistedGameData): Promise<void> {
    return this._store.dispatchInline(this._updateSavedGame, {
      action: (ctx) => Object.assign(ctx.initialState, {
        savedGames: [
          gameSave, ctx.initialState.savedGames.map(sg => sg.id === gameSave.id ? Object.assign(sg, { persistedGameDataId: persistedGameData.id }) : sg)]
      }),
      after: [
        () => this._persistanceService.persistData(PERSISTED_GAME_DATA_KEY, [persistedGameData]),
        (ctx) => this._persistanceService.dropData(PERSISTED_GAME_DATA_KEY, [{ id: ctx.initialState.savedGames.find(sg => sg.id === gameSave.id ).persistedGameDataId }])
      ]
    });
  }


  public initialize() {
    this._store = this._storeService.createStore<GamesState>(gameSavesState, {
      stateStorage: this._localStorageService,
      initialState: {
        selectedGameSaveId: undefined,
        savedGames: []
      }
    })
  }


}