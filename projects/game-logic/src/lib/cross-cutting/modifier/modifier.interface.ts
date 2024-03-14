import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";
import { IEntity } from "../../base/entity/entity.interface";
import { IConditionDeclaration } from "../condition/condition.interface";

export interface IModifierHandler<P, O = unknown> extends IDelegateHandler {
  isApplicableTo: (d: IModifierDeclaration<P>) => boolean
  process: (m: P, context: IEntity) => O;
}

export interface IModifierDeclaration<P> extends IDelegateDeclaration {
  payload: P;
  conditions?: IConditionDeclaration<unknown>[]
};

export interface IModificable { 
  modifiers: IModifierDeclaration<unknown>[]
};

export interface IModifierExposer { 
  exposeModifiers: IModifierDeclaration<unknown>[];
  
};

export interface IModifier { };