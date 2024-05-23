import { Guid } from "../../../../infrastructure/extensions/types";


export interface IDeckBuilderRecipe {
  preventShuffleDeckOnInitialization: boolean;
  revealedCardIds: Guid[];
  cardIds: Guid[];
}
