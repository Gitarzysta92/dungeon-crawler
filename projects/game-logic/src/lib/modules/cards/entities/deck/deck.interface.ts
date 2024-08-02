import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { DiscardEvent } from "../../aspects/events/discard.event";
import { DrawEvent } from "../../aspects/events/draw.event";
import { TrashEvent } from "../../aspects/events/trash.event";
import { ICard, ICardDeclaration } from "../card/card.interface";
import { ICardsPile, ICardsPileDeclaration } from "../cards-pile/cards-pile.interface";
import { IDeckBearer } from "../deck-bearer/deck-bearer.interface";


export interface IDeck extends IDeckDeclaration, IEntity {
  bearer?: WeakRef<IDeckBearer>;
  cards: ICard[];
  hand: ICardsPile;
  drawPile: ICardsPile;
  trashPile: ICardsPile;
  discardPile: ICardsPile;
  hasCard(c: ICard): boolean;
  drawCards(): Promise<void>
  discardCards(): Promise<void>
  onDiscarded(cb: (e: DiscardEvent) => void): void;
  onTrashed(cb: (e: TrashEvent) => void): void;
  onDraw(cb: (e: DrawEvent) => void): void;
}

export interface IDeckDeclaration extends IEntityDeclaration, IModificableDeclaration {
  isCardsDeck: true;
  cards: ICardDeclaration[];
  drawPile: ICardsPileDeclaration;
  trashPile: ICardsPileDeclaration;
  discardPile: ICardsPileDeclaration;
  hand: ICardsPileDeclaration;
  drawSize: number;
  isPrepared?: boolean;
}

