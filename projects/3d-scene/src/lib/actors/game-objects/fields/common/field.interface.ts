import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";

export interface IFieldComposerDefinition<T> extends IFieldCreationDefinition<T> {
  position: IRawVector3 | Vector3;
}

export interface IFieldCreationDefinition<T> extends IFieldDefinition<T> {
  auxId: string,
}

export interface IFieldDefinition<T> extends ISceneComposerDefinition<T> { 
  offsetY?: number;
}


export interface IAssignable {
  takenFieldId: string | undefined;
}