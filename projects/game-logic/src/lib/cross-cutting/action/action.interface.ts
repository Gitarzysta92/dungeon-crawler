import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";

export interface IActionHandler<P extends IActionDefaultPayload, R extends IActionReceiver = {}>
  extends IDelegateHandler<IDelegateDeclaration<P>, P> {
  process(p: P, r?: R): unknown;
}  

export interface IActionDefaultPayload {
  tags?: string[];
}

export interface IActionReceiver { };