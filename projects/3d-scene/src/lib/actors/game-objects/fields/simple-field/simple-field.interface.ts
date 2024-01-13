import { Vector3 } from "three";
import { IFieldCreationDefinition } from "../common/field.interface";
import { simpleFieldComposerDefinitionName } from "./simple-field.constants";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";

export interface ISimpleFieldComposerDefinition
  extends ISimpleFieldCreationDefinition, ISceneComposerDefinition<typeof simpleFieldComposerDefinitionName>   {
  position: Vector3;
}

export interface ISimpleFieldCreationDefinition extends
  IFieldCreationDefinition<typeof simpleFieldComposerDefinitionName>,
  ISimpleFieldDefinition { }

export interface ISimpleFieldDefinition  { }