
import { IActivityResourceProvider } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/extensions/types";
import { IBoardObject, IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardArea } from "../board-area/board-area.interface";


export interface IBoardTraveler extends IBoardTravelerDeclaration, IActivityResourceProvider, IBoardObject {
  occupiedAreaId: Guid;
  occupiedArea: IBoardArea
  travel(areaId: Guid);
}


export interface IBoardTravelerDeclaration extends IEntityDeclaration, IBoardObjectDeclaration {
  isTraveler: true;
  occupiedAreaId: Guid;
}