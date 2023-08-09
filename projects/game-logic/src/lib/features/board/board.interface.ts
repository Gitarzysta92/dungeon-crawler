import { IDictionary } from "../../extensions/types";

export interface IField {
  id: string;
  coords: IBoardCoordinates;
}

export type IBoardCoordinates = { r: number, q: number, s: number };
export type BoardObjeectRotation = 0 | 1 | 2 | 3 | 4 | 5;
export interface IBoardObject {
  id: string;
  rotation: BoardObjeectRotation;
  position: IBoardCoordinates;
}

export interface IBoardSelector {
  selectorType: 'line' | 'cone' | 'radius' | 'global';
  selectorTargets: 'single' | 'multiple' | 'all';
  selectorOrigin?: IBoardCoordinates | 'hero';
  selectorRange?: number;
  selectorBitmap?: any;
  selectionThreshold?: number;
  selectorDirection?: BoardObjeectRotation;
}

export interface IBoard {
  fields: IDictionary<IField>;
  objects: IDictionary<IBoardObject>;
}