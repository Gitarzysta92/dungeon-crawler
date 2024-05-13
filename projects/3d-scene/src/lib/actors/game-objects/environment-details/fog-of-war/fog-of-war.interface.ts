import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { fogOfWarComposerDefinitionName } from "./fog-of-war.constants";

export interface IFogOfWarComposerDefinition extends IFogOfWarCreationDefinition {
  position: Vector3,
}


export interface IFogOfWarCreationDefinition extends
  ISceneComposerDefinition<typeof fogOfWarComposerDefinitionName>,
  IFogOfWarDefinition {}


export interface IFogOfWarDefinition {
}