import { Injectable } from "@angular/core";
import { GameSavesStore } from "../stores/game-saves.store";
import { LOADED_SAVED_GAME_DATA_KEY, PERSISTED_GAME_DATA_KEY } from "../constants/game-persistence.constants";
import { IGameSave, IGameSaveDataProvider, IPersistableGameState, IPersistedGameData } from "../interfaces/persisted-game.interface";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { DataPersistanceService } from "../../data/services/data-persistance.service";
import { DATA_KEYS } from "../../data/constants/data-feed-keys";
import { v4 } from "uuid";

@Injectable({ providedIn: 'root' })
export class GamePersistenceService {

  constructor(
    private readonly _gameSavesStore: GameSavesStore,
    private readonly _configurationService: ConfigurationService,
    private readonly _dataPersistanceService: DataPersistanceService
  ) {}

  async loadGameData<T extends IPersistableGameState>(): Promise<IPersistedGameData<T>>  {
    const loadedGame = await this._dataPersistanceService
      .getPersistedData<IPersistedGameData<T> & { gameStates: Array<IPersistableGameState & T> }>(PERSISTED_GAME_DATA_KEY, this._gameSavesStore.currentState.selectedGameSaveId);

    if (!loadedGame) {
      return 
    }
    
    for (let x of loadedGame.gameData) {
      await this._dataPersistanceService.persistData(LOADED_SAVED_GAME_DATA_KEY + x.key, x.data);
    }

    return loadedGame;
  }


  async isAnyGameToLoad(): Promise<boolean> {
    return !!this._gameSavesStore.currentState.selectedGameSaveId
  }


  public async copyGameSave(
    s: IGameSave,
    saveName?: string,
  ): Promise<void> {
    const persistedGameData = await this._dataPersistanceService.getPersistedData<IPersistedGameData & IGameSaveDataProvider>(PERSISTED_GAME_DATA_KEY, s.persistedGameDataId);
    persistedGameData.persistedAt = Date.now();
    persistedGameData.id = this._createPersistedGameDataId(persistedGameData, persistedGameData.persistedAt);
    const gameSave = this._createGameSave(persistedGameData, persistedGameData, saveName);
    await this._gameSavesStore.createGameSave(gameSave, persistedGameData, gameSave.id);
  }


  public async persistLoadedGame(
    states: IPersistableGameState[],
  ) {
    const gameSave = this._gameSavesStore.currentState.savedGames.find(s => s.persistedGameDataId === this._gameSavesStore.currentState.selectedGameSaveId);
    gameSave.timestamp = Date.now();
    const persistedGameData = await this._dataPersistanceService.getPersistedData<IPersistedGameData & IGameSaveDataProvider>(PERSISTED_GAME_DATA_KEY, gameSave.persistedGameDataId);
    persistedGameData.persistedAt = gameSave.timestamp;
    persistedGameData.gameStates = states;
    persistedGameData.gameData = await this._dataPersistanceService.getData<{ id: string }>(DATA_KEYS);
    await this._gameSavesStore.updateGameSave(gameSave, persistedGameData, gameSave.id);
  }


  public async makeNewGameSave(
    p: IGameSaveDataProvider,
    states: IPersistableGameState[],
    saveName?: string,
  ): Promise<void> {
    const initialData = [] as any;
    const persistedGameData = this._createPersistedGameData(p, states, initialData);
    const gameSave = this._createGameSave(p, persistedGameData, saveName);
    await this._gameSavesStore.createGameSave(gameSave, persistedGameData, gameSave.id);
  }
 

  private _createGameSave(
    p: IGameSaveDataProvider,
    persistedGameData: IPersistedGameData,
    saveName?: string
  ): IGameSave {
    const gameSave = {
      id: v4(),
      saveName: saveName ?? `${p.heroName}  ${p.heroOccupiedAreaName}`,
      persistedGameDataId: persistedGameData.id,
      heroName: p.heroName,
      level: p.heroLevel,
      areaName: p.heroOccupiedAreaName,
      timestamp: persistedGameData.persistedAt,
      avatarUrl: p.heroAvatar.avatar.url,
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
    const persistedGame: IPersistedGameData = {
      id: this._createPersistedGameDataId(p, timestamp),
      playerId: p.playerId,
      gameStates: states,
      gameData: data,
      gameVersion: this._configurationService.version,
      persistedAt: timestamp,
    }
    persistedGame.toStorableFormat = () => JSON.stringify(persistedGame)
    return persistedGame
  }

  private _createPersistedGameDataId(p: IGameSaveDataProvider, timestamp: number): string {
    return `${p.gameId}:${timestamp}:${p.playerId}`;
  }
}