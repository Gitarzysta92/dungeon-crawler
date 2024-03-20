import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";


export interface IDeck extends IDeckDeclaration {

}

export interface IDeckDeclaration extends IEntity {
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
