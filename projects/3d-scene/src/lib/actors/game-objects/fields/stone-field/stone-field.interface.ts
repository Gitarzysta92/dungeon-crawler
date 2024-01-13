import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { IFieldCreationDefinition } from "../common/field.interface";
import { stoneFieldComposerDefinitionName } from "./stone-field.constants";

export interface IStoneFieldComposerDefinition
  extends IStoneFieldCreationDefinition, ISceneComposerDefinition<typeof stoneFieldComposerDefinitionName>   {
  position: Vector3;
  initialAnimationDelay?: number;
}

export interface IStoneFieldCreationDefinition extends
  IFieldCreationDefinition<typeof stoneFieldComposerDefinitionName>,
  IStoneFieldDefinition { }

export interface IStoneFieldDefinition  { 
  primaryColor: number;
}