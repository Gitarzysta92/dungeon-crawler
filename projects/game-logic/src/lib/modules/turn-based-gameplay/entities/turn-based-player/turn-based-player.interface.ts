import { IPlayer } from "../../../../base/player/players.interface";

export interface IPlayerController {
  waitForActivity(): (s: unknown) => Promise<void>;
  isAnyActivityAvailable(): boolean;
}

export interface ITurnGameplayPlayer extends IPlayer {
  canPerformTurn(): boolean;
}