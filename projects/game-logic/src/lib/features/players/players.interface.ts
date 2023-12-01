import { PlayerType } from "./players.constants";

export interface IPlayer {
  id: string;
  playerType: PlayerType;
  groupId: string;
}