import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IResident extends IResidentDeclaration {
  occupiedAreaId: Guid;
  moveTo(areaId: Guid): void;
}


export interface IResidentDeclaration extends IEntity {
  occupiedAreaId: Guid;
  isResident: true;
}