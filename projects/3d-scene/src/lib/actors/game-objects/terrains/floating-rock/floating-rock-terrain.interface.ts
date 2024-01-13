import { Vector3 } from "three";
import { floatingRockTerrainComposerDefinitionName } from "./floating-rock-terrain.constants";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";

export interface IFloatingRockComposerDefinition extends IFloatingRockDefinition {
  position: Vector3;
}

export interface IFloatingRockDefinition extends ISceneComposerDefinition<typeof floatingRockTerrainComposerDefinitionName> {
  color: number;
}