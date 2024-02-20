import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";

export interface IModifierHandler extends IDelegateHandler<IModifierDeclaration<unknown>, unknown> {
  process: (m: IModificable) => Promise<void>;
}

export interface IModifierDeclaration<P> extends IDelegateDeclaration<P> { };

export interface IModificable { };

export interface IModifierExposer { 
  exposedModifiers: IModifierDeclaration<unknown>[];
  
};

export interface IModifier { };