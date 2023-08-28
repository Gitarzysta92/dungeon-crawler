import { ColorRepresentation } from "three";
import { ROTATION_ANGLES } from "../../../lib/constants/tile-rotation-radians";
import { ITextureDefinition } from "../../../lib/helpers/interfaces/texture-definition";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export interface ITileDeclaration extends ISceneObjectDeclaration {
  auxId: string;
  type: string;
  auxFieldId: string;
  mapTexture: ITextureDefinition;
  color: ColorRepresentation;
  rotation: keyof typeof ROTATION_ANGLES;
}