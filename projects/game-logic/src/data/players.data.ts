import { PlayerType } from "../lib/features/players/players.constants";
import { IPlayer } from "../lib/features/players/players.interface";
import { computerGroupId, computerPlayerId } from "./common-identifiers.data";

export const computerPlayer: IPlayer = {
  id: computerPlayerId,
  playerType: PlayerType.Computer,
  groupId: computerGroupId
}

