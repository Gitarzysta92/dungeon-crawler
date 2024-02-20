import { Guid } from "../../extensions/types";
import { PlayerType } from "./players.constants";

export interface IPlayer {
  id: Guid;
  playerType: PlayerType;
  groupId: Guid;
}