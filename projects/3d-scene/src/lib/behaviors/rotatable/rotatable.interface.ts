import { Quaternion } from "three";
import { ROTATION_ANGLES } from "./rotatable.constants";

export interface IRotatable {
  isRotatable: boolean;
  rotate: (r: keyof typeof ROTATION_ANGLES) => void | Promise<void>;
  rotateAsync: (r: keyof typeof ROTATION_ANGLES) => Promise<void>;
  setRotation: (q: Quaternion) => void;
  getActualRotation: (r: keyof typeof ROTATION_ANGLES) => Quaternion;
}