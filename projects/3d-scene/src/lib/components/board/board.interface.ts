import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../helpers/scene-composer/scene-composer.interface";
import { boardComposerDefinitionName } from "./board.constants";
import { hexagonalPlainsFieldComposerDefinitionName } from "../../actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.constants";

export interface IBoardComposerDefinition
  extends IBoardCreationDefinition {
  position: Vector3;
}

export interface IBoardCreationDefinition extends
  ISceneComposerDefinition<typeof boardComposerDefinitionName | typeof hexagonalPlainsFieldComposerDefinitionName>,
  IBoardDefinition { }

export interface IBoardDefinition  { 
  primaryColor: number;
  
}