import { v4 } from "uuid";
import { generateRandomNumbers } from "../../utils/utils";
import { DungeonDeck } from "./dungeon-deck";
import { IDungeonCard, IDungeonDeckConfiguration } from "./dungeon-deck.interface";
import { IEffect } from "../effects/resolve-effect.interface";

export function createDungeonDeck(config: IDungeonDeckConfiguration, cards: IDungeonCard<IEffect>[]): DungeonDeck {
  const revealedCards: { [key: string]: number } = {}
  for (let id of config.revealedCardIds) {
    if (id in revealedCards) {
      revealedCards[id] = 1;
    } else {
      revealedCards[id] += 1;
    }
  }

  for (let it of config.initialCards) {
    if (it.cardId in revealedCards) {
      it.amount -= revealedCards[it.cardId];
    }
  }

  const numberOfRevealedCards = Object.values(revealedCards).reduce((acc, rc) => rc + acc, 0); 
  const numberOfCardsToTake = config.initialCards.reduce((acc, it) => it.amount + acc, 0) - numberOfRevealedCards;
  const randomNumbers = generateRandomNumbers(numberOfCardsToTake, config.initialCards.length - 1);
  const cardsInDeck = randomNumbers.map(n => cards.find(c => c.id === config.initialCards[n].cardId));

  if (cardsInDeck.some(c => !c)) {
    throw new Error("Not all cards can be found during dungeon deck creation");
  }

  return new DungeonDeck({
    id: v4(),
    utilizedCards: [],
    cardsToUtilize: [],
    cardsInDeck: cardsInDeck,
    drawPerTurn: config.drawPerTurn,
    lastingEffects: [],
    revealedCardIds: [],
    sourceActorId: config.sourceActorId
  })
}