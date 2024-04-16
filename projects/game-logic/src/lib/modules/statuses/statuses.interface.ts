import { IEntityDeclaration } from "../../base/entity/entity.interface";
import { IActionDeclaration } from "../../cross-cutting/action/action.interface";
import { IEventListenerDeclaration } from "../../cross-cutting/event/event.interface";
import { IModifierExposer } from "../../cross-cutting/modifier/modifier.interface";
import { ISelectorDeclaration } from "../../cross-cutting/selector/selector.interface";
import { Guid } from "../../extensions/types";

export interface IStatusDeclaration extends IModifierExposer {
  id: Guid;
  spread?: ISelectorDeclaration<unknown>[];
  makeActions?: Array<{ trigger: IEventListenerDeclaration<unknown>[] } & IActionDeclaration<unknown>>;
  duration: number;
  isPerpetual: boolean;
  isStackable: boolean;
}

export interface IAffector extends IEntityDeclaration { }

