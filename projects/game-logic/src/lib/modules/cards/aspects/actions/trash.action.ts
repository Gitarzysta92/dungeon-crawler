import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { ICardsPile } from "../../entities/cards-pile/cards-pile.interface";
import { ICardOnPile } from "../../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { TrashEvent } from "../events/trash.event";

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

  constructor( 
    private readonly _eventService: EventService
  ) { }

  public isApplicableTo(m: IActionDeclaration<ITrashActionPayload>): boolean {
    return TRASH_ACTION === m.delegateId;
  }

  public async process(payload: ITrashActionPayload): Promise<ITrashActionResult> {
    let target = payload.target as IDeckBearer;
    let card = payload.card as ICardOnPile;

    target.hand.moveCard(target.trashPile, card);

    this._eventService.emit(new TrashEvent([card], target))

    return { target, card, pile: target.trashPile }
  }

}