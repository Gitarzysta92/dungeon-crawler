import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IPlayer, IPlayerDeclaration, IPlayerState } from "../../../../base/player/players.interface";
import { IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { ITurnBasedGameplay } from "../../turn-based-gameplay.interface";

export interface ITurnGameplayPlayer extends IPlayer, IMixin, IActivityDoer, ITurnGameplayPlayerState {
  gameplay: ITurnBasedGameplay;
  isAbleToFinishTurn(): boolean 
  finishTurn(): Promise<void> 
  isAbleToStartTurn(): boolean 
  startTurn(): Promise<void> 
}

export interface ITurnGameplayPlayerState extends IPlayerState, ITurnGameplayPlayerDeclaration {
  startedTurn: boolean;
}


export interface ITurnGameplayPlayerDeclaration extends IPlayerDeclaration, IMixin {
  isTurnGameplayPlayerDeclaration: true
}