
import { IActivityDoer } from "../../../../../lib/base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IBoardObject, IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardAreaTravelSegment } from "../../board-areas.interface";
import { IBoardArea } from "../board-area/board-area.interface";


export interface IBoardTraveler extends Omit<IBoardTravelerDeclaration, 'entities'>, IActivityDoer, IBoardObject {
  occupiedArea: IBoardArea
  travel(area: IBoardAreaTravelSegment);
}


export interface IBoardTravelerDeclaration extends IEntityDeclaration, IBoardObjectDeclaration {
  isTraveler: true;
}