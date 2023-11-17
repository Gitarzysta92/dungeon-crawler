import { DungeonDeck } from "../../dungeon/dungeon-deck";
import { DungeonDeckCardPosition, DungeonDeckStackType } from "../../dungeon/dungeon-deck.constants";
import { DeckInteractionType } from "./dungeon-deck-interaction.constants";
import { IDeckInteraction, IDeckInteractionPayload } from "./dungeon-deck-interaction.interface";


export function makeDungeonDeckInteraction(dungeonDeck: DungeonDeck, interaction: IDeckInteraction, payload?: IDeckInteractionPayload): void {
  if (interaction.deckInteractionType === DeckInteractionType.AddCards && !!payload && payload.deckInteractionType === DeckInteractionType.AddCards) {

    const possibleAdditionsAmount = interaction.additions.reduce((c, a) => c += a.amount, 0);
    if (interaction.additions.length > possibleAdditionsAmount) {
      throw new Error(`Provided additions exceed possible additions amount`);
    } 

    for (let placement of payload.placements) {
      dungeonDeck.addCard(placement.card, placement.stack, placement.position);
    }
  }

  if (interaction.deckInteractionType === DeckInteractionType.RemoveCards && !!payload && payload.deckInteractionType === DeckInteractionType.RemoveCards) {
    if (interaction.amountOfCardsToRemove !== payload.cardsToRemove.length) {
      throw new Error("Amount of cards to remove exceeds limit");
    }

    for (let card of payload.cardsToRemove) {
      dungeonDeck.removeCard(card);
    }
  }

  if (interaction.deckInteractionType === DeckInteractionType.ScryDeck && !!payload && payload.deckInteractionType === DeckInteractionType.ScryDeck) {
    if (interaction.amountOfCardsToReveal !== payload.cardsToReorder.length) {
      throw new Error("Amount of cards to reveal exceeds limit");
    }
    for (let card of payload.cardsToReorder) {
      if (!dungeonDeck.isInStack(card, DungeonDeckStackType.CardsInDeck)) {
        throw new Error("Cannot move card that is not in the deck");
      }
      dungeonDeck.moveCard(card, DungeonDeckStackType.CardsInDeck, DungeonDeckCardPosition.Bottom);
    }
  }

  if (interaction.deckInteractionType === DeckInteractionType.ReorderCards && !!payload && payload.deckInteractionType === DeckInteractionType.ReorderCards) {
    if (interaction.amountOfCards !== payload.placement.length) {
      throw new Error("Amount of cards to reorder exceeds limit");
    }
  }

  if (interaction.deckInteractionType === DeckInteractionType.RevealCards) {
    dungeonDeck.revealAmountOfCards(interaction.amountOfCardsToReveal);
  }

  if (interaction.deckInteractionType === DeckInteractionType.ShuffleDeck) {
    dungeonDeck.shuffleUtilizedTilesToDeck();
  }

}