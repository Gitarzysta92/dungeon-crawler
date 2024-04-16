import { IAdventureState, IDungeonState } from "@game-logic/lib/states/game.interface";
import { IGameSettings } from "../../commons/interfaces/game-settings.interface";

export interface IPersistedGameProgression {
  adventureState: IAdventureState & IGameSettings;
  dungeonState?: IDungeonState & IGameSettings;
} 