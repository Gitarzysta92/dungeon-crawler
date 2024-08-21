import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";
import { DrawEvent } from "../events/draw.event";


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

  constructor(
    private readonly _eventService: EventService
  ) { }

  public isApplicableTo(m: IActionDeclaration<IDrawCardsActionPayload>): boolean {
    return DRAW_CARDS_ACTION === m.delegateId;
  }

  public async process(
    payload: IDrawCardsActionPayload,
  ): Promise<IDrawCardsActionResult> {
    let target = payload.target as IDeckBearer;
    let amount = payload.amount as number;

    if (amount == null) {
      amount = target.deck.drawSize;
    }
    let movedCards = target.drawPile.moveCards(target.hand, amount);
    amount = amount - movedCards.length;
    if (amount > 0) {
      target.discardPile.moveCards(target.drawPile)
      target.drawPile.shuffle();
      movedCards = target.drawPile.moveCards(target.hand, amount).concat(movedCards);
    }

    this._eventService.emit(new DrawEvent(movedCards, target));
    return { target, amount }
  }

}