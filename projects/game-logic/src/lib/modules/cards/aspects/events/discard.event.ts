import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ICardOnPile } from "../../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";


export const DISCARD_EVENT = "DISCARD_EVENT";

export interface IDiscardEventListenerPayload {
  playerId: Guid;
}

export class DiscardEvent extends EventBase {
  public delegateId = DISCARD_EVENT;

  constructor(

    public readonly cards: ICardOnPile[],
    public readonly deckBearer: IDeckBearer
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IDiscardEventListenerPayload>): boolean {
    return false;
  }
}