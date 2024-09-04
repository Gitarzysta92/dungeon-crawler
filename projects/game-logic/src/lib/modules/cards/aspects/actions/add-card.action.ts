import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ICardsDeckDataFeed } from "../../cards.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";

export const ADD_CARD_ACTION = "ADD_CARD_ACTION";

export interface IAddCardActionPayload {
  target: IDeckBearer;
  cardId?: Guid;
  quantity?: number;
}

export interface IAddCardActionResult {
  target: IDeckBearer;
  cardId?: Guid;
  quantity?: number;
}

export class AddCardAction implements IActionHandler<IAddCardActionPayload, IAddCardActionResult> {

  constructor( 
    private readonly _eventService: EventService,
    private readonly _dataFeed: ICardsDeckDataFeed,
  ) { }

  public isApplicableTo(m: IActionDeclaration<IAddCardActionPayload>): boolean {
    return ADD_CARD_ACTION === m.delegateId;
  }

  public canBeProcessed(payload: IAddCardActionPayload): boolean {
    return true;
  }

  public async process(payload: IAddCardActionPayload): Promise<IAddCardActionResult> {
    if (!payload.target) {
      throw new Error("Target not provided");
    } 

    if (payload.cardId) {
      throw new Error("CardId not provided");
    }

    const card = await this._dataFeed.getCard(payload.cardId);
    if (!card) {
      throw new Error("Cannod find card with given id");
    }

    payload.target.addToCollection(card, payload.quantity);
    
    return payload;
  }

}