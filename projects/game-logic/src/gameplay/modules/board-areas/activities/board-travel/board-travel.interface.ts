import { IActivityDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { ICubeCoordinates } from "../../../../../lib/modules/board/board.interface";
import { BOARD_TRAVEL_ACTIVITY } from "../../board-areas.constants";
import { IBoardArea } from "../../entities/board-area/board-area.interface";
import { IBoardTraveler } from "../../entities/board-traveler/board-traveler.interface";

export interface IBoardTravelActivity extends IActivityDeclaration {
  id: typeof BOARD_TRAVEL_ACTIVITY;
  readonly area: IBoardArea;
  perform2(traveler: IBoardTraveler): AsyncGenerator<{ from: ICubeCoordinates, to: ICubeCoordinates }>;

}

export interface IBoardTravelSupply {
  supplyUnits: number;
}

export interface IBoardTravelActivitySignature {

}
