import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
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

