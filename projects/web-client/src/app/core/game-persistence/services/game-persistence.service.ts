import { Injectable } from "@angular/core";
import { GameSavesStore } from "../stores/game-saves.store";
import { PERSISTED_GAME_DATA_INDEXED_DB_KEY } from "../constants/game-persistence.constants";
import { IGameSave, IGameSaveDataProvider, IPersistableGameState, IPersistedGameData } from "../interfaces/persisted-game.interface";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { DataPersistanceService } from "../../game-data/services/data-persistance.service";
import { GAME_DATA_KEYS } from "../../game-data/constants/data-feed-keys";
import { v4 } from "uuid";

@Injectable({ providedIn: 'root' })
export class GamePersistenceService {

  constructor(
    private readonly _gameSavesStore: GameSavesStore,
    private readonly _configurationService: ConfigurationService,
    private readonly _dataPersistanceService: DataPersistanceService,
  ) {}


  public async copyGameSave(
    s: IGameSave,
    saveName?: string,
  ): Promise<void> {
    const persistedGameData = await this._dataPersistanceService.getPersistedData<IPersistedGameData & IGameSaveDataProvider>(PERSISTED_GAME_DATA_INDEXED_DB_KEY, s.persistedGameDataId);
    persistedGameData.persistedAt = Date.now();
    persistedGameData.id = this._createPersistedGameDataId(persistedGameData, persistedGameData.persistedAt);
    const gameSave = this._createGameSave(persistedGameData, persistedGameData, saveName);
    await this._gameSavesStore.createGameSave(gameSave, persistedGameData);
    await this._gameSavesStore.selectGameSave(gameSave.id);
  }


  public async persistLoadedGame(
    states: IPersistableGameState[],
  ) {
    const gameSave = this._gameSavesStore.currentState.savedGames.find(s => s.persistedGameDataId === this._gameSavesStore.currentState.selectedGameSaveId);
    gameSave.timestamp = Date.now();
    const persistedGameData = await this._dataPersistanceService.getPersistedData<IPersistedGameData & IGameSaveDataProvider>(PERSISTED_GAME_DATA_INDEXED_DB_KEY, gameSave.persistedGameDataId);
    persistedGameData.persistedAt = gameSave.timestamp;
    persistedGameData.gameStates = states;
    persistedGameData.gameData = await this._dataPersistanceService.getData<{ id: string }>(GAME_DATA_KEYS);
    await this._gameSavesStore.updateGameSave(gameSave, persistedGameData);
  }


  public async makeNewGameSave(
    p: IGameSaveDataProvider,
    states: IPersistableGameState[],
    saveName?: string,
    select: boolean = false
  ): Promise<void> {
    const initialData = [] as any;
    const persistedGameData = this._createPersistedGameData(p, states, initialData);
    const gameSave = this._createGameSave(p, persistedGameData, saveName);
    await this._gameSavesStore.createGameSave(gameSave, persistedGameData);
    if (select) {
      await this._gameSavesStore.selectGameSave(gameSave.id);
    }
  }


  private _createGameSave(
    p: IGameSaveDataProvider,
    persistedGameData: IPersistedGameData,
    saveName?: string
  ): IGameSave {
    const gameSave = {
      id: v4(),
      saveName: saveName ?? `${p.heroName}  ${p.heroOccupiedAreaId}`,
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
    persistedGame.toStorableFormat = () => JSON.stringify(persistedGame)
    return persistedGame
  }

  private _createPersistedGameDataId(p: IGameSaveDataProvider, timestamp: number): string {
    return `${p.gameId}:${timestamp}`;
  }
}