import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IProcedureDeclaration } from "../../../../base/procedure/procedure.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IModifierDeclaration, IModifierExposer, IModifierExposerDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IAffectable } from "../affectable/affectable.interface";
import { IStatusExposer } from "../status-exposer/status-exposer.interface";

export interface IStatus extends Omit<IStatusDeclaration, 'entities'>, IEntity, Partial<IModifierExposer> {
  exposer: ResolvableReference<IStatusExposer>
  affect(target: IAffectable): void;
  canAffect(target: IAffectable): boolean;
}


export interface IStatusDeclaration extends IEntityDeclaration, Partial<IModifierExposerDeclaration> {
  id: Guid;
  isStatus: true;
  isPerpetual: boolean;
  isStackable: boolean;
  duration?: number;
  selectors?: ISelectorDeclaration<unknown>[];
  modifiers?: IModifierDeclaration[];
  procedures?: Array<{
    triggers: IEventListenerDeclaration<unknown>[];
  } & IProcedureDeclaration>
};



