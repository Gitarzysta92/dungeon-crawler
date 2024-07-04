import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IDefeatable, IDefeater } from "../../entities/defeatable/defeatable.interface";

export const DEFEATED_EVENT = "DEFEATED_EVENT";

export interface IDefeatedEventListenerPayload {
  defeater: IDefeater;
  defeated: IDefeatable;
}

export class DefeatedEvent extends EventBase {
  public delegateId = DEFEATED_EVENT;

  constructor(
    private readonly _defeated: IDefeatable
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IDefeatedEventListenerPayload>): boolean {
    const isApplicable = d.delegateId === this.delegateId;
    return isApplicable && this._defeated.defeater === d.payload.defeater && this._defeated === d.payload.defeated; 
  }
}