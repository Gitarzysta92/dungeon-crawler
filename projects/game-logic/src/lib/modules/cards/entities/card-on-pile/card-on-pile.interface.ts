import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ICard } from "../card/card.interface";
import { ICardsPile } from "../cards-pile/cards-pile.interface";

export interface ICardOnPile extends IActivitySubject {
  id: Guid;
  isCardOnPile: true;
  isRevealed?: boolean;
  isTrashed: boolean;
  isDiscarded: boolean;
  isInHand: boolean;
  isReadyToDraw: boolean;
  currentPile: ICardsPile;
  previousPile: ICardsPile;
  ref: ICard
  initializeCard(p: ICard): void
  setPiles(currPile: ICardsPile, prevPile: ICardsPile): void;
  wasDrawn(): boolean;
}
