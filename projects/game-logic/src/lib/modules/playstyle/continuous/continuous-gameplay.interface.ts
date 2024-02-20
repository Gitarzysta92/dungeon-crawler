import { IPlayer } from "../../../base/player/players.interface";

export interface IContinuousGameplayState {
  player: IPlayer;
  currentDay: number;
}

export interface IContinuousGameplayTemplate {
  currentDay: number;
}