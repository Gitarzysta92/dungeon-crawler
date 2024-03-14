import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IAreaOccupier extends IAreaOccupierDeclaration {
  occupiedAreaId: Guid;
}


export interface IAreaOccupierDeclaration extends IEntity {
  isOccupier: true;
  occupiedAreaId: Guid;
}