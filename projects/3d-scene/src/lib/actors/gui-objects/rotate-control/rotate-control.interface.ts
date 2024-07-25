import { IRawVector3 } from "../../../extensions/types/raw-vector3";
import { ISceneComposerDefinition } from "../../../helpers/scene-composer/scene-composer.interface";
import { rotateControlDefinitionName } from "./rotate-control.constants";

export interface IRotateControlComposerDefinition extends IRotateControlDefinition, IRotateControlCreationDefinition {
}

export interface IRotateControlCreationDefinition extends
  ISceneComposerDefinition<typeof rotateControlDefinitionName>,
  IRotateControlDefinition { }

export interface IRotateControlDefinition {  
}
