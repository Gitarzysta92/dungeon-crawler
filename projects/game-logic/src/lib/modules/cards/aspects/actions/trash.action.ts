import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { ICardOnPile, ICardsPile } from "../../entities/cards-pile/cards-pile.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";

export const TRASH_ACTION = "TRASH_ACTION";

export interface ITrashActionPayload {
  target: ResolvableReference<IDeckBearer>;
  card: ResolvableReference<ICardOnPile>;
}

export interface ITrashActionResult {
  target: IDeckBearer;
  card: ICardOnPile;
  pile: ICardsPile;
}

export class TrashAction implements IActionHandler<ITrashActionPayload, ITrashActionResult> {

  constructor( ) { }

  public isApplicableTo(m: IActionDeclaration<ITrashActionPayload>): boolean {
    return TRASH_ACTION === m.delegateId;
  }

  public async process(
    payload: ITrashActionPayload,
    ctx: unknown
  ): Promise<ITrashActionResult> {
    let target = payload.target as IDeckBearer;
    let card = payload.card as ICardOnPile;
    if (JsonPathResolver.isResolvableReference(target)) {
      target = JsonPathResolver.resolveInline(target, ctx);
    }

    if (JsonPathResolver.isResolvableReference(card)) {
      card = JsonPathResolver.resolveInline(card, ctx);
    }

    target.hand.moveCard(target.deck.trashPile, card);

    return { target, card, pile: target.deck.trashPile }
  }

}