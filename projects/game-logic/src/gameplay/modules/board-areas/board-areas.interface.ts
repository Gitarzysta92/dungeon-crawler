import { IPathSegment } from "../../../lib/modules/board/pathfinding/pathfinding.interface";
import { IBoardArea } from "./entities/board-area/board-area.interface";

export interface IBoardAreaTravelPath {
  segments: Array<IBoardAreaTravelSegment>;
  origin: IBoardAreaTravelSegment;
  destination: IBoardAreaTravelSegment;
}

export interface IBoardAreaTravelSegment extends IPathSegment, IBoardArea {}