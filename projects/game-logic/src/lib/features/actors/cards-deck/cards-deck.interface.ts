import { Guid } from "../../../extensions/types";
import { IAffectable, IEffectBase } from "../../effects/commons/effect.interface";
import { IEffect } from "../../effects/resolve-effect.interface";
import { IActor } from "../actors.interface";


export interface ICardsDeckConfiguration {
  id: Guid;
  drawPerTurn: number;
  revealedCardIds: string[];
  cardDeclarations: ICardsDeckConfigurationCardDeclaration[];
  preventShuffleDeckOnInitialization: boolean;
}

export interface ICardsDeckConfigurationCardDeclaration {
  cardId: Guid;
  amount: number;
}

export interface ICardsDeck extends IActor, IAffectable<IEffect> {
  revealedCardIds: string[];
  cardsToUtilize: ICard<IEffect>[];
  cardsInDeck: ICard<IEffect>[];
  utilizedCards: ICard<IEffect>[];
  drawPerTurn: number;
}

export interface ICard<T extends IEffectBase> {
  id: Guid;
  name: string;
  effect: T;
}


export interface ICardsDeckDataFeed {
  getCards: (ids?: Guid[]) => Promise<ICard<IEffect>[]>;
  getCardsDecks: (ids?: Guid[]) => Promise<ICardsDeckConfiguration[]>;
}