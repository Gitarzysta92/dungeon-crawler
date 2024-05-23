
import { DeckInteractionType } from "./dungeon-deck-interaction.constants";


// export function makeDungeonDeckInteraction(
//   dungeonDeck: DungeonDeck,
//   interaction: IDeckInteraction,
//   interactionDefinition?: IDeckInteractionPayload
// ): void {
//   if (interaction.deckInteractionType === DeckInteractionType.AddCards && !!interactionDefinition && interactionDefinition.payload.deckInteractionType === DeckInteractionType.AddCards) {

//     const possibleAdditionsAmount = interaction.additions.reduce((c, a) => c += a.amount, 0);
//     if (interaction.additions.length > possibleAdditionsAmount) {
//       throw new Error(`Provided additions exceed possible additions amount`);
//     } 

//     for (let placement of interactionDefinition.payload.placements) {
//       dungeonDeck.addCard(placement.card, placement.stack, placement.position);
//     }
//   }

//   if (interaction.deckInteractionType === DeckInteractionType.RemoveCards && !!interactionDefinition && interactionDefinition.payload.deckInteractionType === DeckInteractionType.RemoveCards) {
//     if (interaction.amountOfCardsToRemove !== interactionDefinition.payload.cardsToRemove.length) {
//       throw new Error("Amount of cards to remove exceeds limit");
//     }

//     for (let card of interactionDefinition.payload.cardsToRemove) {
//       dungeonDeck.removeCard(card);
//     }
//   }

//   if (interaction.deckInteractionType === DeckInteractionType.ScryDeck && !!interactionDefinition && interactionDefinition.payload.deckInteractionType === DeckInteractionType.ScryDeck) {
//     if (interaction.amountOfCardsToReveal !== interactionDefinition.payload.cardsToReorder.length) {
//       throw new Error("Amount of cards to reveal exceeds limit");
//     }
//     for (let card of interactionDefinition.payload.cardsToReorder) {
//       if (!dungeonDeck.isInStack(card, CardsDeckStackType.CardsInDeck)) {
//         throw new Error("Cannot move card that is not in the deck");
//       }
//       dungeonDeck.moveCard(card, CardsDeckStackType.CardsInDeck, CardsDeckCardPosition.Bottom);
//     }
//   }

//   if (interaction.deckInteractionType === DeckInteractionType.ReorderCards && !!interactionDefinition && interactionDefinition.payload.deckInteractionType === DeckInteractionType.ReorderCards) {
//     if (interaction.amountOfCards !== interactionDefinition.payload.placement.length) {
//       throw new Error("Amount of cards to reorder exceeds limit");
//     }
//   }

//   if (interaction.deckInteractionType === DeckInteractionType.RevealCards) {
//     dungeonDeck.revealAmountOfCards(interaction.amountOfCardsToReveal);
//   }

//   if (interaction.deckInteractionType === DeckInteractionType.ShuffleDeck) {
//     dungeonDeck.shuffleUtilizedTilesToDeck();
//   }

// }