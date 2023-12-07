import { IActor } from "../actors/actors.interface";
import { IAffectable, IEffectBase } from "../effects/commons/effects-commons.interface";
import { IEffect } from "../effects/resolve-effect.interface";

export interface IDungeonDeckConfiguration {
  drawPerTurn: number;
  revealedCardIds: string[];
  initialCards: {
    cardId: string;
    amount: number;
  }[];
  groupId?: string;
  sourceActorId: string;
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
