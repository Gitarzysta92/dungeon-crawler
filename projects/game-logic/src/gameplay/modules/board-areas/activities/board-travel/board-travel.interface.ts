import { IActivityDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { BOARD_TRAVEL_ACTIVITY } from "../../board-areas.constants";

export interface IBoardTravelActivity extends IActivityDeclaration {
  id: typeof BOARD_TRAVEL_ACTIVITY;
}

export interface IBoardTravelSupply {
  supplyUnits: number;
}

