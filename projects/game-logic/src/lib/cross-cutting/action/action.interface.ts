import { IProcedureStepDeclaration } from "../../base/procedure/procedure.interface";
import { IDelegateDeclaration, IDelegateHandler } from "../../infrastructure/delegate/delegate.interface";

export interface IMakeActionProcedureStepDeclaration extends IActionDeclaration<unknown>, IProcedureStepDeclaration {
  isMakeActionStep: true
}


export interface IActionHandler<P, O = unknown> extends IDelegateHandler {
  isApplicableTo: (d: IActionDeclaration<P>) => boolean;
  process(p: P): O;
}  

export interface IActionDeclaration<P> extends IDelegateDeclaration {
  delegateId: string,
  payload: P
}