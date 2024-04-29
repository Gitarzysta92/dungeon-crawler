
import { Guid } from "@game-logic/lib/extensions/types";
import { IDataContainer } from "../../data/interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IStorable } from "src/app/infrastructure/data-storage/interfaces/storable.interface";

export interface IGameSave {
  id: Guid;
  saveName: string;
  persistedGameDataId: string;
  heroName: string;
  level: number;
  areaName: string;
  timestamp: number;
  avatarUrl: string;
}

export interface IPersistedGameData<T extends IPersistableGameState = IPersistableGameState> extends IStorable {
  id: Guid;
  playerId: Guid;
  gameStates: T[];
  gameData: { key: string, data: IDataContainer<unknown, unknown, unknown>[] }[];
  gameVersion: string;
  persistedAt: number;
}


export interface IPersistableGameState {
  id: Guid;
}

export interface IGameSaveDataProvider {
  heroOccupiedAreaName: string; 
  heroAvatar: IVisualUiData;
  heroLevel: number;
  heroName: string;
  playerId: string;
  gameId: string;
}

export interface IGamesState {
  selectedGameSaveId: Guid | undefined;
  savedGames: IGameSave[];
}