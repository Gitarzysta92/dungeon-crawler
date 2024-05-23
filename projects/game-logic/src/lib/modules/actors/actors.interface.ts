
import { Guid } from "../../infrastructure/extensions/types";
import { IActor } from "./entities/actor/actor.interface";

export interface IActorDataFeed {
  getActors: (ids?: Guid[]) => Promise<IActor[]>;
  getActor: (id: Guid) => Promise<IActor>;
}
