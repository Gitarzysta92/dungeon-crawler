import { ICard } from "../card/card.interface";
import { ICardsPile, ICardsPileDeclaration } from "../cards-pile/cards-pile.interface";
import { IDeck, IDeckDeclaration } from "../deck/deck.interface";

export interface IDeckBearer extends IDeckBearerDeclaration {
  deck: IDeck;
  hand: ICardsPile;
}


export interface IDeckBearerDeclaration {
  isDeckBearer: true;
  deck: IDeckDeclaration;
  hand: ICardsPileDeclaration;
  drawSize: number;
  cards: ICard[];
}