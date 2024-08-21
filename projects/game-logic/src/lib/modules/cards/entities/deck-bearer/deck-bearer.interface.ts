import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IPawnDeclaration } from "../../../../base/pawn/pawn.interface";
import { DiscardEvent } from "../../aspects/events/discard.event";
import { DrawEvent } from "../../aspects/events/draw.event";
import { TrashEvent } from "../../aspects/events/trash.event";
import { ICard, ICardDeclaration } from "../card/card.interface";
import { ICardsPile, ICardsPileDeclaration } from "../cards-pile/cards-pile.interface";
import { IDeck, IDeckDeclaration } from "../deck/deck.interface";

export interface IDeckBearer extends Omit<IDeckBearerDeclaration, 'entities'>, IActivityDoer, IEntity {
  deck: IDeck;
  drawPile: ICardsPile;
  trashPile: ICardsPile;
  discardPile: ICardsPile;
  hand: ICardsPile;
  temporaryPile: ICardsPile;
  addToCollection(card: ICard | ICardDeclaration, quantity: number): void;
  removeFromCollection(card: ICard, quantity: number): void;
  drawCards(): Promise<void>
  discardCards(): Promise<void>
  onDiscarded(cb: (e: DiscardEvent) => void): void;
  onTrashed(cb: (e: TrashEvent) => void): void;
  onDraw(cb: (e: DrawEvent) => void): void;
}


export interface IDeckBearerDeclaration extends IEntityDeclaration, IPawnDeclaration {
  isDeckBearer: true;
  deck: IDeckDeclaration;
  drawPile: ICardsPileDeclaration;
  trashPile: ICardsPileDeclaration;
  discardPile: ICardsPileDeclaration;
  hand: ICardsPileDeclaration;
  temporaryPile: ICardsPileDeclaration;
}