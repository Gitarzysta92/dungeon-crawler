import { IActor } from "../actors/actors.interface";
import { IAffectable } from "../effects/effects.interface";
import { DeckInteractionType } from "./dungeon.constants";

export interface IDungeonDeckConfiguration {
  initialCardsAmount: number;
  drawPerTurn: number;
  noopCardsAmount: number;
  revealedCardIds: string[];
  possibleCardIds: string[];
  groupId?: string;
}


export interface IDungeonDeck extends IActor, IAffectable {
  cardsToUtilize: IDungeonCard<unknown>[];
  utilizedCards: IDungeonCard<unknown>[];
  drawPerTurn: number;
}

export interface IDungeonCard<T> {
  id: string;
  name: string;
  effects: Array<T>;
}


export interface IDeckInteraction {
  deckInteractionType: DeckInteractionType
}

export interface IPushCardsToDeck extends IDeckInteraction {
  deckInteractionType: DeckInteractionType.Push,
  cards: IDungeonCard<unknown>[]
}

export interface IRevealCardsFromDeck extends IDeckInteraction {
  deckInteractionType: DeckInteractionType.Reveal,
  amount: number;
}