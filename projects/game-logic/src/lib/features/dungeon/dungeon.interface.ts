import { IBoardConfiguration, IBoardObject } from "../board/board.interface";
import { IExperienceReward } from "../rewards/rewards.interface";
import { IDungeonDeckConfiguration } from "./dungeon-deck.interface";

export interface IDungeon {
  id: string;
  playerSpawnPoint: Omit<IBoardObject, 'id'>;
  boardConfiguration: IBoardConfiguration;
  dungeonDeckConfiguration: IDungeonDeckConfiguration;
  assignedAreaId: string;
}

export interface IDungeonExitBonus extends IExperienceReward {
  experience: number;
}