import { Vector3 } from "three";
import { IFieldCreationDefinition } from "../common/field.interface";
import { blankFieldComposerDefinitionName } from "./blank-field.constants";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";

export interface IBlankFieldComposerDefinition
  extends IBlankFieldCreationDefinition, ISceneComposerDefinition<typeof blankFieldComposerDefinitionName>  {
  position: Vector3;
}

export interface IBlankFieldCreationDefinition extends
  IFieldCreationDefinition<typeof blankFieldComposerDefinitionName>,
  IBlankFieldDefinition { }

export interface IBlankFieldDefinition  {
  primaryColor: number;
}