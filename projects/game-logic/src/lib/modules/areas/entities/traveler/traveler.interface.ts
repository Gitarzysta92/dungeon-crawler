import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IPawn } from "../../../../base/pawn/pawn.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IArea } from "../area/area.interface";


export interface ITraveler extends ITravelerDeclaration, IActivityDoer, IPawn {
  occupiedAreaId: Guid;
  occupiedArea: IArea
  travel(areaId: Guid);
}


export interface ITravelerDeclaration extends IEntityDeclaration {
  isTraveler: true;
  occupiedAreaId: Guid;
}