import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { bouldersEdComposerDefinitionName } from "./boulders.constants";

export interface IBouldersEdComposerDefinition extends IBouldersEdDefinition {
  position: Vector3;
}

export interface IBouldersEdDefinition extends ISceneComposerDefinition<typeof bouldersEdComposerDefinitionName> {
  color: number;
}