import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IResident extends IResidentDeclaration {
  occupiedAreaId: Guid;
  moveTo(areaId: Guid): void;
}


export interface IResidentDeclaration extends IEntityDeclaration {
  occupiedAreaId: Guid;
  isResident: true;
}