import { Vector2, Vector3 } from "three";
import { IRawVector2 } from "./raw-vector2";
import { IRawVector3 } from "./raw-vector3";

export type MapVectorToRawVector<T extends object> = {
  [P in keyof T] : T[P] extends Vector3 ?
    IRawVector3 : T[P] extends Vector2 ?
    IRawVector2 : T[P];
};