import { BOARD_TRAVEL_ACTIVITY } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { ENTER_DUNGEON_ACTIVITY } from "@game-logic/gameplay/modules/dungeon/dungeon.constants";
import { TRADE_ACTIVITY } from "@game-logic/lib/modules/vendors/vendors.constants";
import { ICON_NAMES } from "src/app/shared/icons/constants/icons";

export const activitesMap = {
  [BOARD_TRAVEL_ACTIVITY]: {
    icon: ICON_NAMES.map
  },
  [TRADE_ACTIVITY]: {
    icon: ICON_NAMES.coins
  },
  [ENTER_DUNGEON_ACTIVITY]: {
    icon: ICON_NAMES.dungeon
  }
}