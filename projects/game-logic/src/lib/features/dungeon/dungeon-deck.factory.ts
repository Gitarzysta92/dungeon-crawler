import { v4 } from "uuid";
import { generateRandomNumbers, generateRandomNumbersFromZeroTo } from "../../utils/utils";
import { DungeonDeck } from "./dungeon-deck";
import { IDungeonCard, IDungeonDeckConfiguration } from "./dungeon-deck.interface";

export function createDungeonDeck(config: IDungeonDeckConfiguration, cards: IDungeonCard<unknown>[]): DungeonDeck {
  
  const cardToUtilizeIds = config.revealedCardIds;
  const numberOfCardsToTake = config.initialCardsAmount - config.revealedCardIds.length;

  const cardIdsToTake = config.possibleCardIds.filter(id => !cardToUtilizeIds.some(rid => rid === id));
  const randomNumbers = generateRandomNumbers(numberOfCardsToTake, cardIdsToTake.length - 1);
  const cardsToUtilize = randomNumbers.map(n => cards.find(c => c.id === cardIdsToTake[n])!);


  if (cardsToUtilize.some(c => !c)) {
    throw new Error("Not cards can be found during dungeon deck creation");
  }

  return new DungeonDeck({
    id: v4(),
    cardsToUtilize: cardsToUtilize,
    drawPerTurn: config.drawPerTurn,
    effects: []
  })
}