import { IGameSettings } from "../../commons/interfaces/game-settings.interface";

export interface IPersistedGameProgression {
  adventureState: IGameSettings;
  dungeonState?: IGameSettings;
} 