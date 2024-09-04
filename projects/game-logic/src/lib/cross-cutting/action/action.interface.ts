import { IProcedureStepDeclaration } from "../../base/procedure/procedure.interface";
import { IDelegateDeclaration, IDelegateHandler } from "../../infrastructure/delegate/delegate.interface";

export interface IMakeActionStepDeclaration<T = unknown> extends IActionDeclaration<T>, IProcedureStepDeclaration {
  isMakeActionStep: true
}


export interface IActionHandler<P, O = unknown> extends IDelegateHandler {
  isApplicableTo: (d: IActionDeclaration<P>) => boolean;
  canBeProcessed(payload: P): boolean
  process(p: P): O | Promise<O> | AsyncGenerator<unknown, O, O>;
}  

export interface IActionDeclaration<P> extends IDelegateDeclaration {
  delegateId: string,
  payload: P
}