import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { ICardOnPile } from "../../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";

export const TRASH_EVENT = "TRASH_EVENT";


export class TrashEvent extends EventBase {
  public delegateId = TRASH_EVENT;

  constructor(
    public readonly cards: ICardOnPile[],
    public readonly deckBearer: IDeckBearer
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<unknown>): boolean {
    return false;
  }
}