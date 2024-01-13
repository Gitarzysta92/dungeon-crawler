import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface";
import { pointLightComposerDefinitionName } from "./point-light.constants";
import { IActorDefinition } from "../../actor.interface";

export interface IPointLightComposerDefinition extends IPointLightCreationDefinition {
  position: Vector3
}

export interface IPointLightCreationDefinition extends
  ISceneComposerDefinition<typeof pointLightComposerDefinitionName>,
  IPointLightDefinition,
  IActorDefinition { }


export interface IPointLightDefinition {
  color: number,
  intensity: number,
  distance: number,
  decay: number,
  radius?: number,
  castShadow?: boolean,
}