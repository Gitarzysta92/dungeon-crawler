import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { ICardOnPile } from "../../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";

export const DISCARD_ACTION = "DISCARD_ACTION";

export interface IDiscardActionPayload {
  target: ResolvableReference<IDeckBearer>;
  card?: ResolvableReference<ICardOnPile>;
  amount?: ResolvableReference<number>;
}

export interface IDiscardActionResult {
  target: IDeckBearer;
  cards: ICardOnPile[];
}

export class DiscardAction implements IActionHandler<IDiscardActionPayload, IDiscardActionResult> {

  constructor( ) { }

  public isApplicableTo(m: IActionDeclaration<IDiscardActionPayload>): boolean {
    return DISCARD_ACTION === m.delegateId;
  }

  public async process(payload: IDiscardActionPayload): Promise<IDiscardActionResult> {
    let target = payload.target as IDeckBearer;
    let card = payload.card as ICardOnPile;
    let amount = payload.amount as number;
    
    if (!amount && !card) {
      throw new Error("Not all parameters are provieded for discard action");
    } 

    if (amount != null && !!card) {
      throw new Error("To many parameters provided. Card and Amount parameter must not be provided simultaneously")
    }

    if (amount != null) {
      const cards = target.deck.hand.pile;
      target.deck.hand.moveCards(target.deck.discardPile, amount);
      return { target, cards: cards }
    } else if (card) {
      target.deck.hand.moveCard(target.deck.discardPile, card);
      return { target, cards: [card]}
    }
  }

}