import { IActor } from "../actors/actors.interface";
import { IEffect } from "../effects/effects-commons.interface";
import { IAffectable, IEffectBase } from "../effects/effects.interface";

export interface IDungeonDeckConfiguration {
  initialCardsAmount: number;
  drawPerTurn: number;
  emptyCardsAmount: number;
  revealedCardIds: string[];
  possibleCardIds: string[];
  groupId?: string;
}


export interface IDungeonDeck extends IActor, IAffectable<IEffect> {
  revealedCardIds: string[];
  cardsToUtilize: IDungeonCard<IEffect>[];
  cardsInDeck: IDungeonCard<IEffect>[];
  utilizedCards: IDungeonCard<IEffect>[];
  drawPerTurn: number;
}

export interface IDungeonCard<T extends IEffectBase> {
  id: string;
  name: string;
  effect: T;
}
