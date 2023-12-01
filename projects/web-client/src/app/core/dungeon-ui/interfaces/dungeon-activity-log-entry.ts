import { IPlayer } from "@game-logic/lib/features/players/players.interface";

export interface IDungeonActivityLogEntry {
  activityName: string;
  performer: IPlayer;
  turn: number;
  message: string;
  showDetails?: boolean;
}

export interface IDungeonActivityLogState {
  entries: IDungeonActivityLogEntry[];
}