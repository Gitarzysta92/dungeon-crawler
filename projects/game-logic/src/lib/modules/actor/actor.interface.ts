import { IEntity } from "../../base/entity/entity.interface";
import { Guid } from "../../extensions/types";

export interface IActor extends IEntity {
  id: string;
  groupId?: string;
  controllable?: boolean;
  sourceActorId?: string;
  isActor: true;
}

export interface IActorDataFeed {
  getActors: (ids?: Guid[]) => Promise<IActor[]>;
  getActor: (id: Guid) => Promise<IActor>;
}
