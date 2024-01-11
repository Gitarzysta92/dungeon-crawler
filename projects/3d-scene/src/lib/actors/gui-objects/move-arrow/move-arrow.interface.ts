import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface";
import { IActorDefinition } from "../../actor.interface";
import { moveArrowComposerDefinitionName } from "./move-arrow.constants";

export interface IMoveArrowComposerDefinition extends IMoveArrowDefinition, IMoveArrowCreationDefinition {
  fromPosition: Vector3,
  toPosition: Vector3,
}

export interface IMoveArrowCreationDefinition extends
  ISceneComposerDefinition<typeof moveArrowComposerDefinitionName>,
  IMoveArrowDefinition,
  IActorDefinition { }

export interface IMoveArrowDefinition {
  length: number;
  color: number;
}
