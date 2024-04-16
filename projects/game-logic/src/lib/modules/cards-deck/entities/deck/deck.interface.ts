import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IDeck extends IDeckDeclaration {
  preventShuffleDeckOnInitialization: any;
  revealedCardIds: string[];

}

export interface IDeckDeclaration extends IEntityDeclaration {
  isCardsDeck: true;
  drawPerTurn: number;
  cardDeclarations: ICardDeclaration[];
  cardsToUtilize?: ICard[];
  cardsInDeck?: ICard[];
  utilizedCards?: ICard[];
}


export interface ICard {
  id: Guid;
  isCard: true;
}

export interface ICardDeclaration {
  cardId: Guid;
  amount: number;
}
