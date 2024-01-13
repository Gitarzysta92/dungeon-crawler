import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface";
import { IActorDefinition } from "../../actor.interface";
import { ambientLightComposerDefinitionName } from "./ambient-light.constants";

export interface IAmbientLightComposerDefinition extends IAmbientLightCreationDefinition {
  position: Vector3
}

export interface IAmbientLightCreationDefinition extends
  ISceneComposerDefinition<typeof ambientLightComposerDefinitionName>,
  IAmbientLightDefinition,
  IActorDefinition { }


export interface IAmbientLightDefinition {
  color: number;
  intensity: number;
}