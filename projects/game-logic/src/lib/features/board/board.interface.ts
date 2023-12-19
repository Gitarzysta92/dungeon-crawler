import { Guid, Dictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { Outlet, Size } from "./board.constants";

import { IActor } from "../actors/actors.interface";

import { IAffectable } from "../effects/commons/effect.interface";
import { IEffect } from "../effects/resolve-effect.interface";


export interface IField extends IActor, IAffectable<IEffect>  {
  actorType: ActorType.Field;
  position: IBoardCoordinates;
}

export interface IBoardConfiguration<T> {
  coords: IBoardCoordinates[],
  boardObjects: (T & IAassignedBoardObject)[];
}

export type IBoardCoordinates = { r: number, q: number, s: number };
export type IBoardObjectRotation = 0 | 1 | 2 | 3 | 4 | 5;

export interface IBoardObject {
  id: string;
  outlets: Outlet[];
  size: number;
}

export interface IBoardAssignmentSlot {
  rotation: IBoardObjectRotation;
  position: IBoardCoordinates;
}

export type IAassignedBoardObject = IBoardObject & IBoardAssignmentSlot;

export type IBoardSelectorOrigin = Partial<Omit<IAassignedBoardObject, 'id'>>;
export type IBoardSelectorDeterminant = Omit<IBoardSelector, 'selectorOriginDeterminant'> & {
  isCaster: false;
  requireOutlets: boolean;
} | { isCaster: true };

export interface IBoardSelector {
  selectorType: 'line' | 'cone' | 'radius' | 'global';
  selectorOrigin?: IBoardSelectorOrigin;
  selectorOriginDeterminant?: IBoardSelectorDeterminant;
  selectorRange?: number;
  traversableSize?: number;
}

export interface IBoardState<F extends IField, O extends IAassignedBoardObject> {
  fields: Dictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, F>;
  objects: Dictionary<`${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`, O>;
}

export interface IVectorAndDistanceEntry {
  coords: IBoardCoordinates;
  vector: IBoardObjectRotation;
  distanceToOrigin: number;
  isOrigin?: boolean;
}

