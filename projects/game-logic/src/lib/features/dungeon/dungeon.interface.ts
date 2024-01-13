import { IBoardAssignment } from "../board/board.interface";
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


export interface IDungeonTemplate {
  dungeonId: Guid;
  playersNumber: number;
  predefinedPlayers: IPlayer[];
  groups: { id: Guid; spawnPoints: IBoardAssignment[] }[];
  actors: { id: Guid, playerId?: Guid }[];
}


export interface IDungeonExitBonus extends IExperienceReward {
  experience: number;
}