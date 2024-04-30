import { IDataContainer } from "../../data/interface/data-container.interface";
import { IPersistedGameData } from "../interfaces/persisted-game.interface";

export const PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY = "primary-game";
export const SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY = "secondary-geme";
export const SAVED_GAMES_LOCAL_STORAGE_KEY = "saved-games";
export const LOADED_GAME_SAVE_DATA_INDEXED_DB_KEY = "loaded-game";
export const PERSISTED_GAME_DATA_INDEXED_DB_KEY = "persisted-game-data"


export const persistanceSeed: Array<{ key: string, data: IDataContainer<IPersistedGameData>[] }> = [
  {
    key: PERSISTED_GAME_DATA_INDEXED_DB_KEY, data: []
  }
]