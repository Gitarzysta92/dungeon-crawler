import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { ICardOnPile, ICardsPile } from "../../entities/cards-pile/cards-pile.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";

export const DISCARD_ACTION = "DISCARD_ACTION";

export interface IDiscardActionPayload {
  target: ResolvableReference<IDeckBearer>;
  card: ResolvableReference<ICardOnPile>;
}

export interface IDiscardActionResult {
  target: IDeckBearer;
  card: ICardOnPile;
  pile: ICardsPile;
}

export class DiscardAction implements IActionHandler<IDiscardActionPayload, IDiscardActionResult> {

  constructor( ) { }

  public isApplicableTo(m: IActionDeclaration<IDiscardActionPayload>): boolean {
    return DISCARD_ACTION === m.delegateId;
  }

  public async process(
    payload: IDiscardActionPayload,
    ctx: unknown
  ): Promise<IDiscardActionResult> {
    let target = payload.target as IDeckBearer;
    let card = payload.card as ICardOnPile;
    if (JsonPathResolver.isResolvableReference(target)) {
      target = JsonPathResolver.resolveInline(target, ctx);
    }

    if (JsonPathResolver.isResolvableReference(card)) {
      card = JsonPathResolver.resolveInline(card, ctx);
    }

    target.hand.moveCard(target.deck.discardPile, card);

    return { target, card, pile: target.deck.discardPile }
  }

}