import { ICardsDeckConfiguration } from "../lib/features/cards-deck/cards-deck.interface";
import { dungeonDeckId } from "./common-identifiers.data";
import { makeAttackCard, emptyCard, increaseEnemyAttackPowerCard, moveEnemyCard, spawnCreatureCard } from "./dungeon-cards.data";

export const dungeonDeckConfiguration: ICardsDeckConfiguration = {
  id: dungeonDeckId,
  drawPerTurn: 3,
  revealedCardIds: [
    spawnCreatureCard.id
  ],
  shuffleDeckOnInitialization: true,
  cardDeclarations: [
    { cardId: makeAttackCard.id, amount: 3 },
    { cardId: emptyCard.id, amount: 3 },
    { cardId: increaseEnemyAttackPowerCard.id, amount: 3 },
    { cardId: moveEnemyCard.id, amount: 3 },
    { cardId: spawnCreatureCard.id, amount: 3 }
  ]
}