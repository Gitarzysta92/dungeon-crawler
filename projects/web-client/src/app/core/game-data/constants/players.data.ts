
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { ITurnGameplayPlayerDeclaration } from "@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { COMPUTER_GROUP_ID, COMPUTER_PLAYER_ID, HUMAN_PLAYER_ID, PLAYER_GROUP_ID } from "./common-identifiers.data";

export const computerPlayer: ITurnGameplayPlayerDeclaration = {
  id: COMPUTER_PLAYER_ID,
  playerType: PlayerType.Computer,
  groupId: COMPUTER_GROUP_ID,
  isPlayer: true,
  isEntity: true,
  isMixin: true,
  isTurnGameplayPlayerDeclaration: true
}

export const humanPlayer: ITurnGameplayPlayerDeclaration = {
  id: HUMAN_PLAYER_ID,
  playerType: PlayerType.Human,
  groupId: PLAYER_GROUP_ID,
  isPlayer: true,
  isEntity: true,
  isMixin: true,
  isTurnGameplayPlayerDeclaration: true
}

