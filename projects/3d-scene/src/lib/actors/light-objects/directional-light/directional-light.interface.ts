import { Vector3 } from "three"
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface"
import { IActorDefinition } from "../../actor.interface"
import { ShadowCameraSetting } from "../common/light.interface"
import { directionalLightComposerDefinitionName } from "./directional-light.constants"

export interface IDirectionalLightComposerDefinition extends IDirectionalLightCreationDefinition {
  position: Vector3;
}

export interface IDirectionalLightCreationDefinition extends 
  ISceneComposerDefinition<typeof directionalLightComposerDefinitionName>,
  IDirectionalLightDefinition,
  IActorDefinition { }

export interface IDirectionalLightDefinition {
  color: number,
  intensity: number,
  radius: number,
  castShadow?: boolean,
  shadow?: ShadowCameraSetting
}