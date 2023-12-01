import { IBoardConfiguration, IBoardObject } from "../board/board.interface";
import { IExperienceReward } from "../rewards/rewards.interface";
import { IDungeonDeckConfiguration } from "./dungeon-deck.interface";

export interface IDungeon {
  id: string;
  playerSpawnPoint: Omit<IBoardObject, 'id' | 'outlets'>;
  boardConfiguration: IBoardConfiguration;
  dungeonDeckConfiguration: IDungeonDeckConfiguration;
  assignedAreaId: string;
}

export interface IDungeonConfiguration {
  id: string;
  playerSpawnPoint: Omit<IBoardObject, 'id'>;
  assignedAreaId: string;
  dungeonDeckConfiguration: Partial<IDungeonDeckConfiguration>
}


export interface IDungeonExitBonus extends IExperienceReward {
  experience: number;
}