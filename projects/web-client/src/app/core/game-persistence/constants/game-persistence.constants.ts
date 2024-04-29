import { IDataContainer } from "../../data/interface/data-container.interface";
import { IPersistedGameData } from "../interfaces/persisted-game.interface";

export const LOADED_SAVED_GAME_DATA_KEY = "loaded-game";
export const SAVED_GAMES_DATA_KEY = "saved-games";
export const PERSISTED_GAME_DATA_KEY = "persisted-game-data"


export const persistanceSeed: Array<{ key: string, data: IDataContainer<IPersistedGameData>[] }> = [
  {
    key: PERSISTED_GAME_DATA_KEY, data: []
  }
]