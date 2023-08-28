import { IAmbientLightDeclaration } from "./declarations/ambient-light-declaration";
import { IBoardDeclaration } from "./declarations/board-declaration";
import { IDirectionalLightDeclaration } from "./declarations/directional-light-declaration";
import { IHemisphereLightDeclaration } from "./declarations/hemisphere-light-declaration";
import { IPointLightDeclaration } from "./declarations/point-light-declaration";
import { ISceneObjectDeclaration } from "./declarations/scene-object-declaration";
import { ITerrainDeclaration } from "./declarations/terrain-declaration";


export interface ISceneComposerSetup {
  terrain: ITerrainDeclaration;
  board: IBoardDeclaration;
  objects: ISceneObjectDeclaration[];
  lights: ILightDeclaration[];
}

export type ILightDeclaration = IDirectionalLightDeclaration |
  IPointLightDeclaration |
  IAmbientLightDeclaration |
  IHemisphereLightDeclaration 
