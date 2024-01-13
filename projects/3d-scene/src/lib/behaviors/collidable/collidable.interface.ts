import { Vector3 } from "three";
import { IActor } from "../../actors/actor.interface";

export interface ICollidable {
  id: string;
  coords: Vector3;
  onDestroy: (cb: (x: IActor) => void) => void;
  mesh: any;

  collide: (...args: any[]) => void;
  escape: () => void;
}