import { Guid } from "../../infrastructure/extensions/types";
import { IActivity } from "../activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../entity/entity.interface";

export interface IPawn extends IEntity, IPawnDeclaration {
  playerId: Guid;
  isPawn: true;
  canPerform(activity: IActivity): boolean;
  perform(activity: IActivity): void | Promise<boolean>;
  isAdjanced(s: any): boolean;
}


export interface IPawnDeclaration extends IEntityDeclaration {
  playerId: Guid;
  isPawn: true;
}