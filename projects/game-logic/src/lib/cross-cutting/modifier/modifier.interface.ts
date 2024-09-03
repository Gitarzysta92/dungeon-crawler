import { IEntity, IEntityDeclaration } from "../../base/entity/entity.interface";
import { IDelegateDeclaration } from "../../infrastructure/delegate/delegate.interface";
import { IClonable } from "../../infrastructure/extensions/interfaces";
import { IMixin } from "../../infrastructure/mixin/mixin.interface";

import { IConditionDeclaration } from "../condition/condition.interface";


export interface IModifier extends IModifierDeclaration {
  isApplicable(target: IModificable): boolean;
  applyModifier(target: IModificable): void;
};


export interface IModifierDeclaration extends IDelegateDeclaration, IMixin {
  isModifier: true;
  conditions?: IConditionDeclaration<unknown>[];
};

export interface IModificable extends IModificableDeclaration {
  appliedModifiers: Map<IModifier, IModifier>;
}

export interface IModificableDeclaration extends IMixin {
  isModificable: true;
};

export interface IModifierExposer extends Omit<IModifierExposerDeclaration, 'entities'>, IEntity {
  assingModifiers<T extends IModificable & IClonable>(target: T): T; 
  getModifiers(target: IModificable): IModifier[];
  getAllModifiers(): IModifier[]
  modifiers: IModifier[];
};


export interface IModifierExposerDeclaration extends IEntityDeclaration {
  isModifierExposer: true
  modifiers: IModifierDeclaration[];
}
