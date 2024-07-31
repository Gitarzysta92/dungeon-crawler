import { IDelegateDeclaration, IDelegateHandler } from "../../infrastructure/delegate/delegate.interface";


export interface IEvent<P> extends IDelegateHandler {
  delegateId: string;
  isApplicableTo: (d: IEventListenerDeclaration<P>) => boolean;
}  

export interface IEventListenerDeclaration<P> extends IDelegateDeclaration {
  payload: P
}