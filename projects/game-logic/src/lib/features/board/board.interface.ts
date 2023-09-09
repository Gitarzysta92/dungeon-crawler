import { IDictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { IActor } from "../actors/actors.interface";
import { IEffect } from "../effects/effect-commons.interface";
import { IAffectable } from "../effects/effects.interface";

export interface IField {
  id: string;
  coords: IBoardCoordinates;
}

export interface IBoardConfiguration {
  coords: IBoardCoordinates[],
  boardObjects: IBoardObject[];
}

export type IBoardCoordinates = { r: number, q: number, s: number };
export type IBoardObjectRotation = 0 | 1 | 2 | 3 | 4 | 5;

export interface IBoardObject {
  id: string;
  rotation: IBoardObjectRotation;
  position: IBoardCoordinates | null;
}

export interface IBoardSelector {
  selectorType: 'line' | 'cone' | 'radius' | 'global';
  selectorOrigin?: IBoardCoordinates;
  selectorRange?: number;
  selectorBitmap?: any;
  selectorDirection?: IBoardObjectRotation;
}

export interface IBoard extends IActor, IAffectable<IEffect>  {
  actorType: ActorType.Board;
  fields: IDictionary<string, IField>;
  objects: IDictionary<string, IBoardObject>;
}