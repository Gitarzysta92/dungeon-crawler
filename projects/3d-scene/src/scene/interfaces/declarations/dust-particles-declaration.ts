import { ITextureDefinition } from "../../../lib/helpers/interfaces/texture-definition";
import { IRawVector3 } from "../../types/raw-vector3";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export interface IDustParticlesDeclaration extends ISceneObjectDeclaration {
  mapTexture: ITextureDefinition;
  type: string;
  coords: IRawVector3;
}
