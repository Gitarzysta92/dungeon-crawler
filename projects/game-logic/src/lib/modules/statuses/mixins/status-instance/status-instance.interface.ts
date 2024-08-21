import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IProcedureDeclaration } from "../../../../base/procedure/procedure.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IModifierDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";


export interface IStatusInstance extends Omit<IStatusInstanceDeclaration, 'entities'>, IEntity {
  canBeStacked(): boolean;
  stack(): void;
}

export interface IStatusInstanceDeclaration extends IEntityDeclaration {
  duration: number;
  isPerpetual: boolean;
  isStackable: boolean;
  modifiers?: IModifierDeclaration[];
  pocedures?: Array<{
    triggers: IEventListenerDeclaration<unknown>[];
  } & IProcedureDeclaration>
  statusInstanceId: string;
  associatedStatusId: true;
}