import { EntityLifecycle } from "../../base/entity/entity.constants";
import { Guid } from "../../extensions/types";
import { IActor } from "./actor.interface";

export class Actor implements IActor {
  
  isActor: true;
  id: string;
  groupId?: string;
  controllable?: boolean;
  sourceActorId?: string;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;

  constructor(
    private _data: IActor
  ) {}

  public isInGroup(groupId: Guid): boolean {
    return true;
  }
}