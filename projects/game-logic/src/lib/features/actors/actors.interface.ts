
import { Guid } from "../../extensions/types";
import { ActorType } from "./actors.constants";

export interface IActorsState {
  actors: IActor[]
}

export interface IActor {
  id: string;
  actorType: ActorType;
  groupId?: string;
  sourceActorId: string;
}




export interface ITreasure extends IActor {
  actorType: ActorType.Treasure;
  isOpened: boolean;
}

export interface IDungeonExit extends IActor {
  actorType: ActorType.DungeonExit;
  applyExitBonus: boolean;
}



export interface IObstacle extends IActor {
  actorType: ActorType.Obstacle;
}

export interface IActorsDataFeed {
  getActors: (ids?: Guid[]) => Promise<IActor>[];
  getActor: (id: Guid) => Promise<IActor>
}