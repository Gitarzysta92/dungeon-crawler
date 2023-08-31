import { IActor } from "../actors/actors.interface";
import { IAffectable } from "../effects/effects.interface";

export interface IDungeonDeckConfiguration {
  initialCardsAmount: number;
  drawPerTurn: number;
  emptyCardsAmount: number;
  revealedCardIds: string[];
  possibleCardIds: string[];
  groupId?: string;
}


export interface IDungeonDeck extends IActor, IAffectable {
  cardsToUtilize: IDungeonCard<unknown>[];
  cardsInDeck: IDungeonCard<unknown>[];
  utilizedCards: IDungeonCard<unknown>[];
  drawPerTurn: number;
}

export interface IDungeonCard<T> {
  id: string;
  name: string;
  effects: Array<T>;
}
