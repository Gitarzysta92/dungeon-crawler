
import { PlayerType } from "../../lib/base/player/players.constants";
import { IPlayer } from "../../lib/base/player/players.interface";
import { COMPUTER_GROUP_ID, COMPUTER_PLAYER_ID, HUMAN_PLAYER_ID, PLAYER_GROUP_ID } from "./common-identifiers.data";

export const computerPlayer: IPlayer = {
  id: COMPUTER_PLAYER_ID,
  playerType: PlayerType.Computer,
  groupId: COMPUTER_GROUP_ID
}

export const humanPlayer: IPlayer = {
  id: HUMAN_PLAYER_ID,
  playerType: PlayerType.Human,
  groupId: PLAYER_GROUP_ID
}

