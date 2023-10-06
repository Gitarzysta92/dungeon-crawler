import { ActorType } from "@game-logic/lib/features/actors/actors.constants";

export interface IDungeonActivityLogEntry {
  performer: ActorType;
  performerId?: string;
  turn: number;
  message: string;
}

export interface IDungeonActivityLogState {
  entries: IDungeonActivityLogEntry[];
}