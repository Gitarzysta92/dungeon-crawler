import { IEntityDeclaration } from "../../base/entity/entity.interface";
import { IDelegateDeclaration, IDelegateHandler } from "../../infrastructure/delegate/delegate.interface";

import { IConditionDeclaration } from "../condition/condition.interface";

export interface IModifierHandler<P, O = unknown> extends IDelegateHandler {
  isApplicableTo: (d: IModifierDeclaration) => boolean
  process: (m: P, context: IEntityDeclaration) => O;
}

export interface IModifier extends IModifierDeclaration { 

};


export interface IModifierDeclaration<T = unknown> extends IDelegateDeclaration {
  target: string;
  conditions?: IConditionDeclaration<unknown>[]
};

export interface IModificable {
  modifiers: IModifierDeclaration[]
}


export interface IModificableDeclaration {
  parameters?: any;
  modifiers?: any;
 
};

export interface IModifierExposer extends IModifierExposerDeclaration {
  getModifiers(target: string): IModifier[]
  modifiers: IModifier[];
};


export interface IModifierExposerDeclaration {
  isModifierExposer: true
  modifiers: IModifierDeclaration[];
}
