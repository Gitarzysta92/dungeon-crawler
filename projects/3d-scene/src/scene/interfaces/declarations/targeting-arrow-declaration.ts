import { ColorRepresentation } from "three";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export interface ITargetingArrowDeclaration extends ISceneObjectDeclaration {
  color: ColorRepresentation;
  fromFieldAuxId: string;
  toFieldAuxId: string;
}
