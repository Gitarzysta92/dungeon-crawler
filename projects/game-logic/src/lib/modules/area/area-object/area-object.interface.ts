import { IEntity } from "../../../base/entity/entity.interface";
import { Guid } from "../../../extensions/types";


export interface IAreaObject extends IEntity {
  isAreaObject: true;
  occupiedAreaId: Guid;
}
