import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { hexagonalPlainsComposerDefinitionName, hexagonalPlainsFieldComposerDefinitionName } from "./hexagonal-plains.constants";

export interface IHexagonalPlainsComposerDefinition extends IHexagonalPlainsDefinition {
  position: Vector3;
}

export interface IHexagonalPlainsDefinition extends ISceneComposerDefinition<typeof hexagonalPlainsComposerDefinitionName | typeof hexagonalPlainsFieldComposerDefinitionName> {
  color: number;
}

export interface IHexagonalPlainsFieldDefinition extends ISceneComposerDefinition<typeof hexagonalPlainsFieldComposerDefinitionName> {
  defaultColor: number;
  highlightColor: number;
  hoverColor: number;
  selectColor: number;
  position: Vector3;
}