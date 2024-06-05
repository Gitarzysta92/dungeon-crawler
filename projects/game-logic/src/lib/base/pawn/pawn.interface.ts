import { Guid } from "../../infrastructure/extensions/types";
import { IActivity } from "../activity/activity.interface";
import { IEntity } from "../entity/entity.interface";

export interface IPawn extends IEntity {
  playerId: Guid;

  canPerform(activity: IActivity): boolean | Promise<boolean>;
  perform(activity: IActivity): void | Promise<boolean>;
}