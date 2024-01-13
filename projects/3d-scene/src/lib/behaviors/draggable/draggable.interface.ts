import { Vector3 } from "three";


export interface IDraggable {
  setPosition: (coords: Vector3) => void;
  coords: Vector3;
}
