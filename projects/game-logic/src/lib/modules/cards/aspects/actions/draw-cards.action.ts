import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";


export const DRAW_CARDS_ACTION = "DRAW_CARDS_ACTION";

export interface IDrawCardsActionPayload {
  target: ResolvableReference<IDeckBearer>;
  amount?: ResolvableReference<number>;
}

export interface IDrawCardsActionResult {
  target: IDeckBearer;
  amount: number;
}

export class DrawCardsAction implements IActionHandler<IDrawCardsActionPayload, IDrawCardsActionResult> {

  constructor( ) { }

  public isApplicableTo(m: IActionDeclaration<IDrawCardsActionPayload>): boolean {
    return DRAW_CARDS_ACTION === m.delegateId;
  }

  public async process(
    payload: IDrawCardsActionPayload,
    ctx: unknown
  ): Promise<IDrawCardsActionResult> {
    let target = payload.target as IDeckBearer;
    let amount = payload.amount as number;
    if (JsonPathResolver.isResolvableReference(target)) {
      target = JsonPathResolver.resolveInline(target, ctx);
    }

    if (JsonPathResolver.isResolvableReference(amount)) {
      amount = JsonPathResolver.resolveInline(amount, ctx);
    }

    if (amount == null) {
      amount = target.drawSize;
    }

    amount = target.deck.drawPile.moveCards(target.hand, amount);
    if (amount > 0) {
      target.deck.discardPile.moveCards(target.deck.drawPile)
      target.deck.drawPile.shuffle();
      target.deck.drawPile.moveCards(target.hand, amount);
    }

    return { target, amount }
  }

}