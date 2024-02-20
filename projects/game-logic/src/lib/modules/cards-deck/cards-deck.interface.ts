import { IEntity } from "../../base/entity/entity.interface";
import { Guid } from "../../extensions/types";


export interface ICardsDeck extends IEntity {
  isCardsDeck: true;
  drawPerTurn: number;
  revealedCardIds: string[];
  cardDeclarations: ICardDeclaration[];
  preventShuffleDeckOnInitialization: boolean;
  cardsToUtilize?: ICard[];
  cardsInDeck?: ICard[];
  utilizedCards?: ICard[];
}


export interface ICardDeclaration {
  cardId: Guid;
  amount: number;
}


export interface ICard {
  id: Guid;
  isCard: true;
}


export interface ICardsDeckDataFeed {
  getCards: (ids?: Guid[]) => Promise<ICard[]>;
}