import { IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardOnPile } from "../card-on-pile/card-on-pile.interface";
import { ICard } from "../card/card.interface";
import { IDeck } from "../deck/deck.interface";

export interface ICardsPile extends ICardsPileDeclaration {
  deck?: WeakRef<IDeck>;
  size: number;
  getCards(): ICard[]
  shuffle(): void;
  revealFromTop(amount: number): void;
  revealAtPosition(index: number): void;
  moveCards(to: ICardsPile, amount?: number): number;
  moveCard(to: ICardsPile, card: ICardOnPile): void;
  takeCard(c: ICardOnPile): void;
  hasCardOnPile(c: ICardOnPile): boolean;
  hasCard(c: ICard): boolean;
  initializeCards(p: ICard[]): void
}


export interface ICardsPileDeclaration extends IMixin {
  isCardsPile: true;
  pile: ICardOnPile[],
}