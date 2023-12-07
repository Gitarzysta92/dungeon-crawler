import { IDictionary } from "../../extensions/types";
import { ActorType, Outlet } from "../actors/actors.constants";
import { IActor } from "../actors/actors.interface";

import { IAffectable } from "../effects/commons/effects-commons.interface";
import { IEffect } from "../effects/resolve-effect.interface";


export interface IField extends IActor, IAffectable<IEffect>  {
  actorType: ActorType.Field;
  position: IBoardCoordinates;
  positionId: `${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`
}

export interface IBoardConfiguration {
  coords: IBoardCoordinates[],
  boardObjects: (IBoardObject & IActor)[];
}

export type IBoardCoordinates = { r: number, q: number, s: number };
export type IBoardObjectRotation = 0 | 1 | 2 | 3 | 4 | 5;

export interface IUnassignedBoardObject {
  id: string;
  outlets?: Outlet[];
}

export interface IBoardObject extends IUnassignedBoardObject {
  rotation: IBoardObjectRotation;
  position: IBoardCoordinates;
}

export type IBoardSelectorOrigin = Partial<Omit<IBoardObject, 'id'>>;
export type IBoardSelectorDeterminant = Omit<IBoardSelector, 'selectorOriginDeterminant'> & {
  isCaster: false;
  requireOutlets: boolean;
} | { isCaster: true };

export interface IBoardSelector {
  selectorType: 'line' | 'cone' | 'radius' | 'global';
  selectorOrigin?: IBoardSelectorOrigin;
  selectorOriginDeterminant?: IBoardSelectorDeterminant;
  selectorRange?: number;
}

export interface IBoard<T> {
  fields: IDictionary<string, IField>;
  objects: IDictionary<string, T & IBoardObject>;
}

export interface IVectorAndDistanceEntry {
  coords: IBoardCoordinates;
  vector: IBoardObjectRotation;
  distanceToOrigin: number;
  isOrigin?: boolean;
}