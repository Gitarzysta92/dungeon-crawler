import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { IActorDefinition } from "../../../actor.interface";
import { commonCharacterDefinitionName } from "./common-character.constants";

export interface ICommonCharacterComposerDefinition extends
  ISceneComposerDefinition<typeof commonCharacterDefinitionName>,
  ICommonCharacterDefinition,
  IActorDefinition {
  position: Vector3;
}

export interface ICommonCharacterDefinition {
  definitionName: typeof commonCharacterDefinitionName;
}
