import { IEntity } from "../../../../base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../extensions/types";
import { IAreaOccupier } from "../occupier/occupier.interface";


export interface IArea extends IAreaDeclaration {
  nestedAreas?: INestedArea[];
  occupier: IAreaOccupier;
  getTravelCost(areaId): number;
  hasConnection(areaId: Guid): boolean
}
export interface IAreaDeclaration extends IEntity {
  id: string;
  areaConnections: IAreaConnection[];
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


export interface IAreaConnection {
  fromAreaId: string;
  toAreaId: string;
  distance: number;
}

export interface ITravelSupply {
  coverableDistance: number;
}
