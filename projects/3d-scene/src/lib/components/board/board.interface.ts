import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../helpers/scene-composer/scene-composer.interface";
import { boardComposerDefinitionName } from "./board.constants";

export interface IBoardComposerDefinition
  extends IBoardCreationDefinition, ISceneComposerDefinition<typeof boardComposerDefinitionName>   {
  position: Vector3;
}

export interface IBoardCreationDefinition extends
  ISceneComposerDefinition<typeof boardComposerDefinitionName>,
  IBoardDefinition { }

export interface IBoardDefinition  { 
  primaryColor: number;
  
}