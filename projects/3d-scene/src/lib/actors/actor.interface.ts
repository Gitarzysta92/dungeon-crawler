import { Object3D } from "three";

export interface Actor {
  id: string;
  auxId?: string;
  object: Object3D
  init: () => Object3D;
  onDestroy: (onDestroy: (x: Actor) => void) => void;
}