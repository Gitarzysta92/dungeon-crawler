import { IDelegateDeclaration, IDelegateHandler } from "../../base/delegate/delegate.interface";


export interface IEvent<P> extends IDelegateHandler {
  isApplicableTo: (d: IEventListenerDeclaration<P>) => boolean;
}  

export interface IEventListenerDeclaration<P> extends IDelegateDeclaration {
  payload: P
}