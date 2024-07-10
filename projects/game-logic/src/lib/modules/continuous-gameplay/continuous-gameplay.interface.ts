import { IPlayer, IPlayerDeclaration } from "../../base/player/players.interface";

export interface IContinuousGameplayState {
  player: IPlayerDeclaration;
  currentDay: number;
}

export interface IContinuousGameplayTemplate {
  currentDay: number;
}