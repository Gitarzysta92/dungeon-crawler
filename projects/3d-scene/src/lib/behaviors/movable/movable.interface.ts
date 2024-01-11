import { Vector3 } from "three";
import { IRawVector3 } from "../../extensions/types/raw-vector3";

export interface IMovable {
  isMovable: boolean;
  move: (p: Vector3 | IRawVector3) => void;
  moveAsync: (p: Vector3) => Promise<void>;
  setPosition: (p: Vector3) => void;
}