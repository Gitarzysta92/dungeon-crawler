import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ICard } from "../card/card.interface";
import { ICardsPileDeclaration } from "../cards-pile/cards-pile.interface";
import { IDeckBearer } from "../deck-bearer/deck-bearer.interface";


export interface IDeck extends IDeckDeclaration, IEntity {
  bearer?: WeakRef<IDeckBearer>;
  selectedCards: ISelectedCardDeclaration[]
  hasCard(c: ICard): boolean;
  addCard(c: ICard, quantity: number): void;
  removeCard(c: ICard, quantity: number): void;
}

export interface IDeckState extends IEntityDeclaration, IModificableDeclaration {
  isCardsDeck: true;
  drawPile: ICardsPileDeclaration;
  trashPile: ICardsPileDeclaration;
  discardPile: ICardsPileDeclaration;
  hand: ICardsPileDeclaration;
  drawSize: number;
  isPrepared?: boolean;
}


export interface IDeckDeclaration {
  isCardsDeck: true;
  drawSize: number;
  isMixin: true
  selectedCards: ISelectedCardDeclaration[]
}


export interface ISelectedCardDeclaration {
  cardId: Guid;
  qunatitiy: number
}