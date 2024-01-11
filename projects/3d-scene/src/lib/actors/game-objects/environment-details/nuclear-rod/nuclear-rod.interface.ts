import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { nuclearRodComposerDefinitionName } from "./nuclear-rod.constants";

export interface INuclearRodComposerDefinition extends INuclearRodCreationDefinition {
  rotation: Vector3,
  position: Vector3,
}


export interface INuclearRodCreationDefinition extends
  ISceneComposerDefinition<typeof nuclearRodComposerDefinitionName>,
  INuclearRodDefinition {}


export interface INuclearRodDefinition {
  color: number;
}