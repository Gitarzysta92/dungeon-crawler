import { Injectable } from "@angular/core";
import { GameSavesStore } from "../stores/game-saves.store";
import { LOADED_GAME_SAVE_DATA_INDEXED_DB_KEY, PERSISTED_GAME_DATA_INDEXED_DB_KEY, PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY, SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY } from "../constants/game-persistence.constants";
import { IGameSave, ILoadedGame, IPersistableGameState } from "../interfaces/persisted-game.interface";
import { DataPersistanceService } from "../../game-data/services/data-persistance.service";
import { GAME_DATA_KEYS } from "../../game-data/constants/data-feed-keys";
import { LocalStorageService } from "src/app/infrastructure/data-storage/api";
import { IDataContainer } from "../../game-data/interface/data-container.interface";

@Injectable({ providedIn: 'root' })
export class GameLoadingService {

  constructor(
    private readonly _gameSavesStore: GameSavesStore,
    private readonly _dataPersistanceService: DataPersistanceService,
    private readonly _localStorageService: LocalStorageService
  ) { }
  

  public async loadGameData<T extends IPersistableGameState>(): Promise<Omit<ILoadedGame<T>, 'gameSaveId' | 'persistedGameDataId'>>  {
    const gameSave = this._gameSavesStore.currentState.savedGames.find(s => s.id === this._gameSavesStore.currentState.selectedGameSaveId);
    let loadedGame = await this.getLoadedGame<T>();

    if (!loadedGame) {
      throw new Error("Cannot find loaded game");
    }
    
    if (loadedGame.gameSave && loadedGame.gameSave.id !== gameSave.id) {
      throw new Error("Loaded game and selected game save mismatched.")
    }

    if (loadedGame.gameStates.some(s => s.persistedGameDataId !== loadedGame.persistedGameDataId) || !loadedGame.persistedGameDataId) {
      console.warn("Game state and loaded game mismatched.");
      await this._localStorageService.clear(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY);
      await this._localStorageService.clear(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY);
    }

    
    if (!!loadedGame.gameData && loadedGame.gameStates.length > 0 && loadedGame.persistedGameDataId) {
      return loadedGame;
    } 

    const persistedGame = await this._dataPersistanceService
      .getPersistedData<ILoadedGame<T>>(PERSISTED_GAME_DATA_INDEXED_DB_KEY, gameSave.persistedGameDataId, r => JSON.parse(r as string));
    
    if (!persistedGame) {
      throw new Error("No game data to load.");
    }

    if (persistedGame.gameStates.length < 1) {
      throw new Error("Loaded game has no associated game state.")
    }

    for (let gd of persistedGame.gameData) {
      await this._dataPersistanceService.persistData(LOADED_GAME_SAVE_DATA_INDEXED_DB_KEY + gd.key, gd.data);
    }

    if (!!persistedGame.gameStates[0]) {
      this._localStorageService.createOrUpdate(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY, persistedGame.gameStates[0])
    }

    if (!!persistedGame.gameStates[1]) {
      this._localStorageService.createOrUpdate(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY, persistedGame.gameStates[1])
    }

    return persistedGame;
  }


  public async isAnyGameToLoad(): Promise<boolean> {
    return !!this._gameSavesStore?.currentState?.selectedGameSaveId
  }


  public async getLoadedGame<T extends IPersistableGameState>(): Promise<ILoadedGame<T> & { gameSave: IGameSave } | undefined> {
    const primaryState = await this._localStorageService.read<IPersistableGameState & T>(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY);
    const gameSave = this._gameSavesStore.currentState.savedGames
      .find(s => s.persistedGameDataId === primaryState?.persistedGameDataId || this._gameSavesStore.currentState.selectedGameSaveId === s.id);
    if (!gameSave) {
      return;
    }
    const secondaryState = await this._localStorageService.read<IPersistableGameState & T>(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY);
    const gameData = await this._dataPersistanceService.getData<IDataContainer<unknown, unknown, unknown>>(GAME_DATA_KEYS);
    const r = {
      gameSaveId: gameSave.id,
      gameSave: gameSave,
      persistedGameDataId: gameSave.persistedGameDataId,
      gameStates: [],
      gameData: gameData,
    }
    if (primaryState) {
      r.gameStates.push(primaryState);
    }
    if (secondaryState) {
      r.gameStates.push(secondaryState);
    }
    return r;
  }
}






// private async _persistLoadedGame(): Promise<void> {
//   const loadedGame = await this.getLoadedGame()
//   const persistedData = await this._dataPersistanceService
//     .getPersistedData<IPersistedGameData & IGameSaveDataProvider>(PERSISTED_GAME_DATA_INDEXED_DB_KEY, loadedGame.persistedGameDataId);
  
//   if (loadedGame.gameStates.length < 1) {
//     return;
//   }

//   if (persistedData && !loadedGame.gameSaveId || !persistedData && loadedGame.gameSaveId) {
//     throw new Error("Loaded game is corrupted. GameSave and PersistedData mismatched.");
//   }

//   if (!loadedGame.gameSaveId && !persistedData) {
//     await this._gamePersistanceService.createGameSave(new GameSaveProvider(loadedGame.gameStates[0] as any), loadedGame.gameStates)
//   } else {
//     await this._dataPersistanceService.persistData(PERSISTED_GAME_DATA_INDEXED_DB_KEY, [persistedData])
//   }
  
//   await this._localStorageService.clear(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY);
//   await this._localStorageService.clear(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY);
//   GAME_DATA_KEYS.forEach(k => this._dataPersistanceService.dropAllData(k))
// }