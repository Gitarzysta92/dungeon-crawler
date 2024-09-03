import { IEntity, IEntityDeclaration } from "../../base/entity/entity.interface";
import { ResolvableReference } from "../../infrastructure/extensions/types";
import { IMixin } from "../../infrastructure/mixin/mixin.interface";
import { IModificable, IModificableDeclaration } from "../modifier/modifier.interface";


export interface IParameterExposer extends IEntity {
  isParameterExposer: true;
  parameters: { [key: string]: IParameter }
}

export interface IParameterExposerDeclaration extends IEntityDeclaration {
  isParameterExposer: true;
  parameters: { [key: string]: IParameterDeclaration }
}

export interface IParameter extends IMixin, IModificable {
  id: number;
  isParameter: true;
  value: number;
}

export interface IParameterDeclaration extends IMixin, IModificableDeclaration {
  id: number
  isParameter: true
  value: number | ResolvableReference<number>
}