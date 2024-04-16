import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../extensions/types";
import { IConnection } from "../../areas.interface";
import { ITraveler } from "../traveler/traveler.interface";


export interface IArea extends IAreaDeclaration {
  nestedAreas?: INestedArea[];
  isOccupied: boolean;
  areaConnections: IAreaConnection[]
  traveler: ITraveler;
  getTravelCost(areaId): number;
  hasConnection(areaId: Guid): boolean
  getConnection(id: string): IConnection;
}
export interface IAreaDeclaration extends IEntityDeclaration, IActivitySubjectDeclaration {
  id: Guid;
  areaConnections: IAreaConnectionDeclaration[];
  nestedAreas?: INestedAreaDeclaration[];
  isArea: true;
  unlockWhen: IEventListenerDeclaration<unknown>[];
  isUnlocked: boolean;
}


export interface INestedArea extends INestedAreaDeclaration {
  nestedAreas?: INestedArea[];
}
export interface INestedAreaDeclaration {
  nestedAreas?: INestedAreaDeclaration[];
  unlockWhen: IEventListenerDeclaration<unknown>[];
  isUnlocked: boolean;
}

export interface IAreaConnection extends IAreaConnectionDeclaration {
  toArea: IArea;
}


export interface IAreaConnectionDeclaration {
  toAreaId: Guid;
  distance: number;
}

export interface ITravelSupply {
  coverableDistance: number;
}
