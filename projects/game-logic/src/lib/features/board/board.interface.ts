import { IDictionary } from "../../extensions/types";
import { ActorType } from "../actors/actors.constants";
import { IActor } from "../actors/actors.interface";

import { IAffectable } from "../effects/effects.interface";
import { IEffect } from "../effects/resolve-effect.interface";

export interface IField {
  id: string;
  coords: IBoardCoordinates;
}

export interface IBoardConfiguration {
  coords: IBoardCoordinates[],
  boardObjects: (IBoardObject & IActor)[];
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
  selectorOriginCoordinates?: IBoardCoordinates;
  selectorOriginDeterminant?: {
    originType: 'caster' | 'any',
    range?: number
  },
  selectorRange?: number;
  selectorBitmap?: any;
}

export interface IBoard extends IActor, IAffectable<IEffect>  {
  actorType: ActorType.Board;
  fields: IDictionary<string, IField>;
  objects: IDictionary<string, IBoardObject & IActor>;
}