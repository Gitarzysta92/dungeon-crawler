import { Guid } from "../../../../infrastructure/extensions/types";
import { IMixin } from "../../../../infrastructure/mixin/mixin.interface";

export interface ICardOnPile {
  id: Guid;
  isRevealed: boolean;
}


export interface ICardsPile extends ICardsPileDeclaration {
  shuffle(): void;
  revealFromTop(amount: number): void;
  revealAtPosition(index: number): void;
  moveCards(to: ICardsPile, amount?: number): number;
  moveCard(to: ICardsPile, card: ICardOnPile): void;
  takeCard(c: ICardOnPile): void
}


export interface ICardsPileDeclaration extends IMixin {
  isCardsPile: true;
  cards: ICardOnPile[],
}