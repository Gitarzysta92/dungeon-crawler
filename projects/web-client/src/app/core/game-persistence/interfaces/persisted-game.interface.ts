
import { Guid } from "@game-logic/lib/infrastructure/extensions/types";
import { IDataContainer } from "../../game-data/interface/data-container.interface";
import { IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IStorable } from "src/app/infrastructure/data-storage/interfaces/storable.interface";

export interface ILoadedGame<T extends IPersistableGameState = IPersistableGameState> {
  gameSaveId: string;
  persistedGameDataId: string;
  gameStates: T[];
  gameData: { key: string, data: IDataContainer<unknown, unknown, unknown>[] }[];
}


export interface IGameSave {
  id: Guid;
  saveName: string;
  persistedGameDataId: string;
  heroName: string;
  level: number;
  areaName: string;
  timestamp: number;
  avatar: { url: string };
}

export interface IPersistedGameData<T extends IPersistableGameState = IPersistableGameState> extends IStorable {
  id: Guid;
  gameStates: T[];
  gameData: { key: string, data: IDataContainer<unknown, unknown, unknown>[] }[];
  gameVersion: string;
  persistedAt: number;
}


export interface IPersistableGameState {
  id: Guid;
  persistedGameDataId: string;
}

export interface IGameSaveDataProvider {
  heroOccupiedAreaId: string; 
  heroAvatar: IUiData;
  heroLevel: number;
  heroName: string;
  playerId: string;
  gameId: string;
}

export interface IGamesState {
  selectedGameSaveId: Guid | undefined;
  savedGames: IGameSave[];
}