
import { DeckInteractionType } from "./dungeon-deck-interaction.constants";

// export type IDeckInteraction =
//   IAddCardsToDeck |
//   IRemoveCardsFormDeck |
//   IScryDeck |
//   IRevealCardsFromDeck |
//   IShuffleDeck |
//   IReorderCards;


// export interface IDungeonDeckInteraction<T extends IDeckInteractionBase> extends IEffectBase {
//   effectName: EffectName.DungeonDeckInteraction;
//   deckInteraction: T
// }

// export interface IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType
// }

// export interface IAddCardsToDeck extends IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType.AddCards;
//   additions: { position: CardsDeckCardPosition, amount: number }[];
// }

// export interface IRemoveCardsFormDeck extends IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType.RemoveCards;
//   amountOfCardsToRemove: number;
// }

// export interface IScryDeck extends IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType.ScryDeck;
//   amountOfCardsToReveal: number;
//   amountOfCardsToReorder: number;
// }

// export interface IRevealCardsFromDeck extends IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType.RevealCards,
//   amountOfCardsToReveal: number;
// }

// export interface IShuffleDeck extends IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType.ShuffleDeck;
// }

// export interface IReorderCards extends IDeckInteractionBase {
//   deckInteractionType: DeckInteractionType.ReorderCards;
//   amountOfCards: number;
// }

// export interface IDeckInteractionDefinition {
//   effect: IDungeonDeckInteraction<IDeckInteraction>;
//   effectName: EffectName.DungeonDeckInteraction;
//   caster: IEffectCaster;
// }


// export interface IDeckInteractionPayload extends IDeckInteractionDefinition {
//   effect: IDungeonDeckInteraction<IDeckInteraction>;
//   effectName: EffectName.DungeonDeckInteraction;
//   caster: IEffectCaster;
//   payload: (IAddCardsToDeckPayload |
//     IRemoveCardsFormDeckPayload |
//     IScryDeckPayload |
//     IRevealCardsFromDeckPayload |
//     IReorderCardsPayload)
// }


// export interface IDeckInterationPayloadBase extends IEffectDeclarationBase {
//   effectName: EffectName.DungeonDeckInteraction;
//   deckInteractionType: DeckInteractionType;
// }

// export interface IAddCardsToDeckPayload extends IDeckInterationPayloadBase {
//   deckInteractionType: DeckInteractionType.AddCards;
//   placements: {
//     card: ICard<IEffect>,
//     position: CardsDeckCardPosition,
//     stack: CardsDeckStackType
//   }[]
// }

// export interface IRemoveCardsFormDeckPayload extends IDeckInterationPayloadBase {
//   deckInteractionType: DeckInteractionType.RemoveCards;
//   cardsToRemove: ICard<IEffect>[]
// }

// export interface IScryDeckPayload extends IDeckInterationPayloadBase {
//   deckInteractionType: DeckInteractionType.ScryDeck;
//   cardsToReorder: ICard<IEffect>[];
// }

// export interface IRevealCardsFromDeckPayload extends IDeckInterationPayloadBase {
//   deckInteractionType: DeckInteractionType.RevealCards;
//   cardsToReorder: ICard<IEffect>[];
// }

// export interface IReorderCardsPayload extends IDeckInterationPayloadBase {
//   deckInteractionType: DeckInteractionType.ReorderCards;
//   placement: { order: number, card: ICard<IEffect> }[] 
// }