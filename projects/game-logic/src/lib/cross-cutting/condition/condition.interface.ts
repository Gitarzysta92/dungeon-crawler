import { IDelegateDeclaration, IDelegateHandler } from "../../infrastructure/delegate/delegate.interface";

export interface IConditionHandler<P> extends IDelegateHandler {
  isApplicableTo: (d: IConditionDeclaration<P>) => boolean;
  process(p: P): boolean;
}  

export interface IConditionDeclaration<P> extends IDelegateDeclaration {
  payload: P
}