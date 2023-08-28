import { ColorRepresentation } from "three";
import { ITextureDefinition } from "../../../lib/helpers/interfaces/texture-definition";
import { MapVectorToRawVector } from "../../types/map-vector-to-raw-vector";


export interface ITerrainDeclaration {
  mapTexture: MapVectorToRawVector<ITextureDefinition>;
  normalMapTexture: MapVectorToRawVector<ITextureDefinition>;
  displacementMapTexture: MapVectorToRawVector<ITextureDefinition>;
  axisYOffset: number;
  color: ColorRepresentation;
}