import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface";
import { rotateArrowDefinitionName } from "./rotate-arrow.constants";
import { IActorDefinition } from "../../actor.interface";

export interface IRotateArrowComposerDefinition extends IRotateArrowCreationDefinition {
  position: Vector3,
}

export interface IRotateArrowCreationDefinition extends
  ISceneComposerDefinition<typeof rotateArrowDefinitionName>,
  IRotateArrowDefinition,
  IActorDefinition { }

export interface IRotateArrowDefinition { 
  color: number;
}
