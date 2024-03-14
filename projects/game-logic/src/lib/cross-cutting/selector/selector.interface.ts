import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";

export interface ISelectorHandler<P, O = unknown> extends IDelegateHandler {
  select: (s: ISelectorDeclaration<P>, d: unknown[]) => O[];
}

export interface ISelectorDeclaration<P> extends IDelegateDeclaration {
  payload: P
}

export interface ISelectable { };