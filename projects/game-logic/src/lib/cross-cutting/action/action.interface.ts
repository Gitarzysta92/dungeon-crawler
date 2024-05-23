import { IDelegateDeclaration, IDelegateHandler } from "../../infrastructure/delegate/delegate.interface";

export interface IActionHandler<P, O = unknown> extends IDelegateHandler {
  isApplicableTo: (d: IActionDeclaration<P>) => boolean;
  process(p: P): O;
}  

export interface IActionDeclaration<P> extends IDelegateDeclaration {
  payload: P
}