import { Vector3 } from "three";
import { Actor } from "../../actors/actor.interface";

export interface Collidable {
  id: string;
  coords: Vector3;
  onDestroy: (cb: (x: Actor) => void) => void;
  mesh: any;

  collide: (...args: any[]) => void;
  escape: () => void;
}