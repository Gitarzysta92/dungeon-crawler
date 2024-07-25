import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ICard } from "../card/card.interface";
import { IDeckBearer } from "../deck-bearer/deck-bearer.interface";

export interface ICardOnPile extends IActivitySubject {
  id: Guid;
  isCardOnPile: true;
  isRevealed?: boolean;
  ref: ICard
  initializeCard(p: ICard): void
}
