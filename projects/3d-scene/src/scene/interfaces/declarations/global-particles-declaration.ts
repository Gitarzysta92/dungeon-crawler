import { ITextureDefinition } from "../../../lib/helpers/interfaces/texture-definition";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export interface IGlobalParticlesDeclaration extends ISceneObjectDeclaration {
  mapTexture: ITextureDefinition;
}