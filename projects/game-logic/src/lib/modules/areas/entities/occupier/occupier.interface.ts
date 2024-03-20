import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface ITraveler extends ITravelerDeclaration {
  occupiedAreaId: Guid;
}


export interface ITravelerDeclaration extends IEntity {
  isTraveler: true;
  occupiedAreaId: Guid;
}