import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { ICard, ICardDeclaration } from "../card/card.interface";
import { ICardsPile, ICardsPileDeclaration } from "../cards-pile/cards-pile.interface";


export interface IDeck extends IDeckDeclaration {
  cards: ICard[];
  drawPile: ICardsPile;
  trashPile: ICardsPile;
  discardPile: ICardsPile;
}

export interface IDeckDeclaration extends IMixin, IModificableDeclaration {
  isCardsDeck: true;
  cards: ICardDeclaration[];
  drawPile: ICardsPileDeclaration;
  trashPile: ICardsPileDeclaration;
  discardPile: ICardsPileDeclaration;
}

