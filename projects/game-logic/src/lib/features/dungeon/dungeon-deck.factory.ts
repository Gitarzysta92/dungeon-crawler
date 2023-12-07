import { v4 } from "uuid";
import { DungeonDeck } from "./dungeon-deck";
import { IDungeonCard, IDungeonDeckConfiguration } from "./dungeon-deck.interface";
import { IEffect } from "../effects/resolve-effect.interface";
import { shuffleArray } from "../../utils/utils";

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

  const cardsInDeck = Object.entries(revealedCards)
    .map(rc => ({ cardId: rc[0], amount: rc[1] }))
    .concat(shuffleArray(config.initialCards.flatMap(item => Array(item.amount).fill(item))))
    .map(id => cards.find(c => c.id === id.cardId))
  
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