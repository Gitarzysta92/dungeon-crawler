import { Guid } from "../../infrastructure/extensions/types";
import { IEntity } from "../entity/entity.interface";

export interface IPawn extends IEntity {
  playerId: Guid;
}