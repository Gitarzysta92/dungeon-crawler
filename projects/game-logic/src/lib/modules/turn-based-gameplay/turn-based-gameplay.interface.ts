import { IGameplay, IGameplayConfiguration, IGameplayDeclaration, IGameplayState } from "../../base/gameplay/gameplay.interface";
import { Guid } from "../../infrastructure/extensions/types";
import { ITurnGameplayPlayerDeclaration } from "./mixins/turn-based-player/turn-based-player.interface";

export interface ITurnBasedGameplay extends Omit<ITurnBasedGameplayState, 'entities'>, IGameplay {
  getCurrentPlayerSelectedPawn<T>(): T 
}

export interface ITurnBasedGameplayState extends IGameplayState {
  currentPlayerId: Guid;
  turn: number;
  round: number;
  order: Guid[];
  isMixin: true;
}

export interface ITurnBasedGameplayDeclaration extends IGameplayDeclaration {

}

export interface ITurnBasedGameplayConfiguration extends IGameplayConfiguration {
  players: ITurnGameplayPlayerDeclaration[]
  order: Guid[];
}