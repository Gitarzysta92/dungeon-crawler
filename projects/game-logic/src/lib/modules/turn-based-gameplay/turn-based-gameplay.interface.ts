import { IPlayer } from "../../base/player/players.interface";
import { Guid } from "../../extensions/types";

export interface ITurnBasedGameplayState {
  players: IPlayer[];
  order: Guid[];
  playersNumber: number;
  currentPlayerId?: Guid;
  turn?: number;
  round?: number;
}


export interface ITurnBasedGameplayPlayers {
  playersNumber: number;
  players: IPlayer[];
}

export interface IControllable {
  id: Guid,
  groupId?: Guid;
  isControllable: true,
}