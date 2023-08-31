import { EffectName } from "./effects.constants";
import { IEffectBase } from "./effects.interface";

export interface IModifyDungeonDeck<T extends IDeckInteraction> extends IEffectBase {
  effectName: EffectName.ModifyDungeonDeck;
  deckInteraction: T
}

export interface IModifyDungeonDeckPa {

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