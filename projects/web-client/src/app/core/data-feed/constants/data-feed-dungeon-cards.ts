import { emptyCard, increaseEnemyAttackPowerCard, makeAttackCard, moveEnemyCard, spawnEnemyCard } from "@game-logic/data/dungeon-cards.data";
import { IDungeonCardDataFeedEntity } from "../interfaces/data-feed-dungeon-card-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";


export const emptyCardDataFeedEntity: IDungeonCardDataFeedEntity = Object.assign(emptyCard, {
  entityType: DataFeedEntityType.DungeonCard,
  informative: { name: "string", description: "string" },
});


export const makeAttackCardDataFeedEntity: IDungeonCardDataFeedEntity = Object.assign(makeAttackCard, {
  entityType: DataFeedEntityType.DungeonCard,
  informative: { name: "string", description: "string" },
});


export const increaseEnemyAttackPowerCardDataFeedEntity: IDungeonCardDataFeedEntity = Object.assign(increaseEnemyAttackPowerCard, {
  entityType: DataFeedEntityType.DungeonCard,
  informative: { name: "string", description: "string" },
});


export const moveEnemyCardDataFeedEntity: IDungeonCardDataFeedEntity = Object.assign(moveEnemyCard, {
  entityType: DataFeedEntityType.DungeonCard,
  informative: { name: "string", description: "string" },
});


export const spawnEnemyCardDataFeedEntity: IDungeonCardDataFeedEntity = Object.assign(spawnEnemyCard, {
  entityType: DataFeedEntityType.DungeonCard,
  informative: { name: "string", description: "string" },
});