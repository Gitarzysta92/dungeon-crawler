import { Injectable } from "@angular/core";
import { GameSavesStore } from "../stores/game-saves.store";
import { PERSISTED_GAME_DATA_INDEXED_DB_KEY, PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY, SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY } from "../constants/game-persistence.constants";
import { IGameSave, IGameSaveDataProvider, IPersistableGameState, IPersistedGameData } from "../interfaces/persisted-game.interface";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { DataPersistanceService } from "../../game-data/services/data-persistance.service";
import { v4 } from "uuid";
import { GameLoadingService } from "./game-loading.service";
import { LocalStorageService } from "src/app/infrastructure/data-storage/api";

@Injectable({ providedIn: 'root' })
export class GamePersistenceService {

  constructor(
    private readonly _gameSavesStore: GameSavesStore,
    private readonly _configurationService: ConfigurationService,
    private readonly _dataPersistanceService: DataPersistanceService,
    private readonly _gameLoadingService: GameLoadingService,
    private readonly _localStorageService: LocalStorageService
  ) { }

  public async createGameSave(
    p: IGameSaveDataProvider,
    states: IPersistableGameState[],
    saveName?: string,
    select: boolean = false
  ): Promise<void> {
    const initialData = [] as any;
    const persistedGameData = this._createPersistedGameData(p, states, initialData);
    const gameSave = this._createGameSave(p, persistedGameData, saveName);
    let savedGames = this._gameSavesStore.currentState;
    if (!savedGames) {
      this._gameSavesStore.setState({
        selectedGameSaveId: null,
        savedGames: []
      });
      savedGames = this._gameSavesStore.currentState;
    }
    savedGames?.savedGames.unshift(gameSave);
    this._gameSavesStore.setState(savedGames);
    if (select) {
      await this.selectGameSave(gameSave)
    }
    this._dataPersistanceService.persistData(PERSISTED_GAME_DATA_INDEXED_DB_KEY, [persistedGameData])
  }


  public async selectGameSave(gs: IGameSave): Promise<void> {
    const savedGames = this._gameSavesStore.currentState;
    if (savedGames.selectedGameSaveId !== gs.id) {
      await this._persistLoadedGame()
    }
    savedGames.selectedGameSaveId = gs.id;
    this._gameSavesStore.setState(savedGames);
  }


  public async copyGameSave(s: IGameSave, saveName?: string): Promise<void> {
    const persistedGameData = await this._dataPersistanceService.getPersistedData<IPersistedGameData & IGameSaveDataProvider>(
      PERSISTED_GAME_DATA_INDEXED_DB_KEY,
      s.persistedGameDataId,
      r => JSON.parse(r as string));
    persistedGameData.persistedAt = Date.now();
    persistedGameData.id = this._createPersistedGameDataId(persistedGameData, persistedGameData.persistedAt);
    this.createGameSave({
      heroName: s.heroName,
      heroLevel: s.level,
      heroAvatar: { avatar: s.avatar, icon: "", },
      playerId: "",
      gameId: "",
      heroOccupiedAreaId: ""
    }, persistedGameData.gameStates, saveName ?? `${s.saveName} copy`, true);
  }


  public async removeGameSave(s: IGameSave): Promise<void> {
    const gameSaveState = this._gameSavesStore.currentState;
    gameSaveState.savedGames = gameSaveState.savedGames.filter(sg => sg.id !== s.id);
    if (gameSaveState.selectedGameSaveId === s.id) {
      gameSaveState.selectedGameSaveId = gameSaveState.savedGames[0]?.id
    }
    this._gameSavesStore.setState(gameSaveState);
    this._dataPersistanceService.tryDropData(PERSISTED_GAME_DATA_INDEXED_DB_KEY, [ { id: s.persistedGameDataId } ])
  }

  
  private async _persistLoadedGame() {
    const loadedGame = await this._gameLoadingService.getLoadedGame();
    if (!loadedGame) {
      return;
    }
    const persistedGameData = await this._dataPersistanceService
      .getPersistedData<IPersistedGameData & IGameSaveDataProvider>(PERSISTED_GAME_DATA_INDEXED_DB_KEY, loadedGame.persistedGameDataId, r => JSON.parse(r as string));
    persistedGameData.persistedAt = loadedGame.gameSave.timestamp;
    persistedGameData.gameStates = loadedGame.gameStates;
    persistedGameData.gameData = loadedGame.gameData;
    await this._dataPersistanceService.persistData(PERSISTED_GAME_DATA_INDEXED_DB_KEY, [persistedGameData]);
    this._localStorageService.clear(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY)
    this._localStorageService.clear(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY)
  }



  private _createGameSave(
    p: IGameSaveDataProvider,
    persistedGameData: IPersistedGameData,
    saveName?: string
  ): IGameSave {
    const gameSave = {
      id: v4(),
      saveName: saveName ?? `${p.heroName}`,
      persistedGameDataId: persistedGameData.id,
      heroName: p.heroName,
      level: p.heroLevel,
      areaName: p.heroOccupiedAreaId,
      timestamp: persistedGameData.persistedAt,
      avatar: p.heroAvatar.avatar,
      gameVersion: this._configurationService.versionName
    }
    return gameSave;
  }


  private _createPersistedGameData(
    p: IGameSaveDataProvider,
    states: IPersistableGameState[],
    data: any
  ): IPersistedGameData {
    const timestamp = Date.now();
    states.forEach(s => s.persistedGameDataId = this._createPersistedGameDataId(p, timestamp))
    const persistedGame: IPersistedGameData = {
      id: this._createPersistedGameDataId(p, timestamp),
      gameStates: states,
      gameData: data,
      gameVersion: this._configurationService.version,
      persistedAt: timestamp,
    }
    return persistedGame
  }

  private _createPersistedGameDataId(p: IGameSaveDataProvider, timestamp: number): string {
    return `${p.gameId}:${timestamp}`;
  }
}