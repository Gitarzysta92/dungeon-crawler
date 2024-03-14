import { IEvent, IEventListenerDeclaration } from "./event.interface";

export abstract class EventBase implements IEvent<unknown> {
  public abstract delegateId: string;
  public abstract isApplicableTo(d: IEventListenerDeclaration<unknown>): boolean 
}