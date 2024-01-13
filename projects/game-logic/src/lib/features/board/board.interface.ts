import { Outlet } from "./board.constants";

export interface IBoardTemplate {
  fields: { position: IBoardCoordinates }[]
}

export interface IBoardState extends IBoardTemplate {
  fields: IBoardField[];
  objects: IBoardObject[];
}

export interface IBoardField {
  position: IBoardCoordinates;
}

export interface IBoardObject {
  id: string;
  outlets: Outlet[];
  size: number;
}

export interface IBoardAssignment {
  rotation: IBoardObjectRotation;
  position: IBoardCoordinates;
}

export type IAassignedBoardObject = IBoardObject & IBoardAssignment;



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

export interface IVectorAndDistanceEntry {
  coords: IBoardCoordinates;
  vector: IBoardObjectRotation;
  distanceToOrigin: number;
  isOrigin?: boolean;
}


export type IBoardCoordinates = { r: number, q: number, s: number };
export type IBoardObjectRotation = 0 | 1 | 2 | 3 | 4 | 5;