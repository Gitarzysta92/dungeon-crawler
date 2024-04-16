import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";
import { IArea } from "../area/area.interface";


export interface ITraveler extends ITravelerDeclaration, IActivityResourceProvider {
  occupiedAreaId: Guid;
  occupiedArea: IArea
  travel(areaId: Guid);
}


export interface ITravelerDeclaration extends IEntityDeclaration {
  isTraveler: true;
  occupiedAreaId: Guid;
}