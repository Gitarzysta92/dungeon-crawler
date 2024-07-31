import { IGameplay, IGameplayDeclaration, IGameplayState } from "../../base/gameplay/gameplay.interface";

export interface IContinuousGameplay extends IGameplay, Omit<IContinuousGameplayDeclaration, 'entities'> {

}

export interface IContinuousGameplayState extends IGameplayState {
  currentDay: number;
}

export interface IContinuousGameplayDeclaration extends IGameplayDeclaration {
  currentDay: number;
}