import { IGame, IGameDeclaration } from "../../base/game/game.interface";

export interface IContinuousGameplay extends IGame, Omit<IContinuousGameplayDeclaration, 'entities'> {

}

export interface IContinuousGameplayDeclaration extends IGameDeclaration {
  currentDay: number;
}