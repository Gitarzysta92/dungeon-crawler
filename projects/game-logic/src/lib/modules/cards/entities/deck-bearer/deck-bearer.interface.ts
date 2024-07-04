import { ICard } from "../card/card.interface";
import { ICardsPile } from "../cards-pile/cards-pile.interface";
import { IDeck, IDeckDeclaration } from "../deck/deck.interface";

export interface IDeckBearer extends IDeckBearerDeclaration {
  deck: IDeck;
  hand: ICardsPile;
  drawAmount: number;
}


export interface IDeckBearerDeclaration {
  deck: IDeckDeclaration;
  cards: ICard[]
}