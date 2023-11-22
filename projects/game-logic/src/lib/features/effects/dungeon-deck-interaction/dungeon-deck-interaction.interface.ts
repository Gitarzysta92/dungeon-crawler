import { DungeonDeckCardPosition, DungeonDeckStackType } from "../../dungeon/dungeon-deck.constants";
import { IDungeonCard } from "../../dungeon/dungeon-deck.interface";
import { DeckInteractionType } from "./dungeon-deck-interaction.constants";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";
import { IEffect } from "../resolve-effect.interface";

export type IDeckInteraction =
  IAddCardsToDeck |
  IRemoveCardsFormDeck |
  IScryDeck |
  IRevealCardsFromDeck |
  IShuffleDeck |
  IReorderCards;


export interface IDungeonDeckInteraction<T extends IDeckInteractionBase> extends IEffectBase {
  effectName: EffectName.DungeonDeckInteraction;
  deckInteraction: T
}

export interface IDeckInteractionBase {
  deckInteractionType: DeckInteractionType
}

export interface IAddCardsToDeck extends IDeckInteractionBase {
  deckInteractionType: DeckInteractionType.AddCards;
  additions: { position: DungeonDeckCardPosition, amount: number }[];
}

export interface IRemoveCardsFormDeck extends IDeckInteractionBase {
  deckInteractionType: DeckInteractionType.RemoveCards;
  amountOfCardsToRemove: number;
}

export interface IScryDeck extends IDeckInteractionBase {
  deckInteractionType: DeckInteractionType.ScryDeck;
  amountOfCardsToReveal: number;
  amountOfCardsToReorder: number;
}

export interface IRevealCardsFromDeck extends IDeckInteractionBase {
  deckInteractionType: DeckInteractionType.RevealCards,
  amountOfCardsToReveal: number;
}

export interface IShuffleDeck extends IDeckInteractionBase {
  deckInteractionType: DeckInteractionType.ShuffleDeck;
}

export interface IReorderCards extends IDeckInteractionBase {
  deckInteractionType: DeckInteractionType.ReorderCards;
  amountOfCards: number;
}


export interface IDeckInteractionPayload {
  effect: IDungeonDeckInteraction<IDeckInteraction>;
  effectName: EffectName.DungeonDeckInteraction;
  caster: IEffectCaster;
  payload: (IAddCardsToDeckPayload |
    IRemoveCardsFormDeckPayload |
    IScryDeckPayload |
    IRevealCardsFromDeckPayload |
    IReorderCardsPayload)
}


export interface IDeckInterationPayloadBase extends IEffectDefinitionBase {
  effectName: EffectName.DungeonDeckInteraction;
  deckInteractionType: DeckInteractionType;
}

export interface IAddCardsToDeckPayload extends IDeckInterationPayloadBase {
  deckInteractionType: DeckInteractionType.AddCards;
  placements: {
    card: IDungeonCard<IEffect>,
    position: DungeonDeckCardPosition,
    stack: DungeonDeckStackType
  }[]
}

export interface IRemoveCardsFormDeckPayload extends IDeckInterationPayloadBase {
  deckInteractionType: DeckInteractionType.RemoveCards;
  cardsToRemove: IDungeonCard<IEffect>[]
}

export interface IScryDeckPayload extends IDeckInterationPayloadBase {
  deckInteractionType: DeckInteractionType.ScryDeck;
  cardsToReorder: IDungeonCard<IEffect>[];
}

export interface IRevealCardsFromDeckPayload extends IDeckInterationPayloadBase {
  deckInteractionType: DeckInteractionType.RevealCards;
  cardsToReorder: IDungeonCard<IEffect>[];
}

export interface IReorderCardsPayload extends IDeckInterationPayloadBase {
  deckInteractionType: DeckInteractionType.ReorderCards;
  placement: { order: number, card: IDungeonCard<IEffect> }[] 
}