import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";

export interface ISelectorHandler<P extends ISelectorDefaultPayload, R extends ISelectable>
  extends IDelegateHandler<IDelegateDeclaration<P>, P> {
  select: (s: ISelectorDefaultPayload, d: unknown[]) => R[];
}

export interface ISelectorDefaultPayload {
  tags?: string[];
}

export interface ISelectable { };