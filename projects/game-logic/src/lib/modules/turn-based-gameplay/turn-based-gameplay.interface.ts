import { IPlayer } from "../../base/player/players.interface";
import { Guid } from "../../infrastructure/extensions/types";
import { ITurnGameplayPlayer } from "./entities/turn-based-player/turn-based-player.interface";

export interface ITurnBasedGameplayState extends ITurnBasedGameplayDeclaration {
  getCurrentPlayer(): ITurnGameplayPlayer;
}

export interface ITurnBasedGameplayDeclaration {
  players: IPlayer[];
  order: Guid[];
  playersNumber: number;
  currentPlayerId?: Guid;
  turn?: number;
  round?: number;

}

export interface IControllable {
  id: Guid,
  groupId?: Guid;
  isControllable: true,
}