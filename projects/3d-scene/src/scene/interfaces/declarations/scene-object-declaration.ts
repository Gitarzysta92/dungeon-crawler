import { IRawVector2 } from "../../types/raw-vector2";
import { IRawVector3 } from "../../types/raw-vector3";

export interface ISceneObjectDeclaration {
  type: string;
  coords?: IRawVector3 | IRawVector2;
}