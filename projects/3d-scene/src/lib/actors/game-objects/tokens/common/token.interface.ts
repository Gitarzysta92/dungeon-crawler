import { Vector3 } from "three";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { ROTATION_ANGLES } from "../../../../behaviors/rotatable/rotatable.constants";
import { IAssignable } from "../../fields/common/field.interface";

export interface ITokenComposerDefinition<T> extends ITokenCreationDefinition<T>, IAssignable {
  position?: IRawVector3 | Vector3;
  rotation: keyof typeof ROTATION_ANGLES;
}

export interface ITokenCreationDefinition<T> extends ITokenDefinition<T> { 
  auxId: string,
  auxCoords: string;
}

export interface ITokenDefinition<T> extends ISceneComposerDefinition<T> { }
