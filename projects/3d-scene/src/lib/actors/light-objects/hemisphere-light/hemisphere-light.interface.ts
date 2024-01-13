import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface";
import { IActorDefinition } from "../../actor.interface";
import { hemisphereLightComposerDefinitionName } from "./hemisphere-light.constants";

export interface IHemisphereLightComposerDefinition extends IHemisphereLightCreationDefinition {
  position: Vector3
}

export interface IHemisphereLightCreationDefinition extends
  ISceneComposerDefinition<typeof hemisphereLightComposerDefinitionName>,
  IHemisphereLightDefinition,
  IActorDefinition { }

  
export interface IHemisphereLightDefinition {
  skyColor: number,
  groundColor: number,
  intensity: number
}