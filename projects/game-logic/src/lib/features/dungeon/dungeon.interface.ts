import { IBoardConfiguration, IBoardAssignmentSlot, IBoardCoordinates, IBoardObjectRotation } from "../board/board.interface";
import { IExperienceReward } from "../rewards/rewards.interface";
import { Guid } from "../../extensions/types";
import { IPlayer } from "../players/players.interface";

export interface IDungeonState {
  dungeonId: Guid;
  players: IPlayer[];
  currentPlayerId: Guid;
  playersNumber: number;
  turn: number;
  round: number;
  isDungeonTurn: boolean;
  isDungeonFinished: boolean;
  changesHistory: any
}

export interface IDungeonConfiguration {
  dungeonId: Guid;
  predefinedDungeonPlayers: IPlayer[];
  group: { id: Guid; spawnPoints: IBoardAssignmentSlot[] }[];
  boardConfiguration: IBoardConfiguration<unknown>;
}

export interface IDungeonTemplate {
  dungeonId: Guid;
  predefinedPlayers: IPlayer[];
  groups: { id: Guid; spawnPoints: IBoardAssignmentSlot[] }[];
  boardDeclarations: (IBoardCoordinates & { actorId?: Guid, rotation?: IBoardObjectRotation })[];
  actorDeclarations: { actorId: Guid, associatedPlayerId?: Guid }[]
}


export interface IDungeonExitBonus extends IExperienceReward {
  experience: number;
}