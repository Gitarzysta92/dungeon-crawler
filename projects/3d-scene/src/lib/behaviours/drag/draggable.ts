import { Vector3 } from "three";


export interface Draggable {
  setCoords: (coords: Vector3) => void;
  coords: Vector3;
}
