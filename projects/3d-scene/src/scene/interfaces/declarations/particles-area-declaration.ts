import { IRawVector3 } from "../../types/raw-vector3";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export interface IParticlesAreaDeclaration extends ISceneObjectDeclaration {
  coords: IRawVector3;
}
