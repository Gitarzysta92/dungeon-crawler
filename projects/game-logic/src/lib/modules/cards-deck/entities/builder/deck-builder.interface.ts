import { Guid } from "../../../../extensions/types";


export interface IDeckBuilderRecipe {
  preventShuffleDeckOnInitialization: boolean;
  revealedCardIds: Guid[];
  cardIds: Guid[];
}
