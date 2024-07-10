import { IGame, IGameDeclaration } from "../../base/game/game.interface";
import { IPlayerDeclaration } from "../../base/player/players.interface";
import { Guid } from "../../infrastructure/extensions/types";
import { ITurnGameplayPlayer } from "./mixins/turn-based-player/turn-based-player.interface";

export interface ITurnBasedGameplay extends IGame, Omit<ITurnBasedGameplayDeclaration, 'entities'> {
  nextTurn(): { player: ITurnGameplayPlayer };
}

export interface ITurnBasedGameplayDeclaration extends IGameDeclaration {
  order?: Guid[];
  currentPlayerId?: Guid;
  turn?: number;
  round?: number;
  players?: IPlayerDeclaration[]
}