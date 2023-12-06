import { hero, heroInventory } from "@game-logic/data/hero.data";
import { IHeroDataFeedEntity } from "../interfaces/data-feed-hero-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";
import { imagesPath } from "./data-feed-commons";
import { firstAreaId } from "@game-logic/data/common-identifiers.data";
import { basicAttackDataFeedEntity, curseDataFeedEntity, fireballDataFeedEntity, healingDataFeedEntity, meteorDataFeedEntity, moveDataFeedEntity, teleportDataFeedEntity, visionDataFeedEntity, weaknessDataFeedEntity } from "./data-feed-effects";

export const heroFirstDataFeedEntity: IHeroDataFeedEntity = Object.assign({...hero}, {
  id: "DF750CDB-22BF-4948-BCF9-7FCB1108D1E7",
  occupiedAreaId: firstAreaId,
  occupiedRootAreaId: firstAreaId,
  inventory: {
    itemSlots: heroInventory.slots,
    itemBindings: heroInventory.items.map(i => Object.assign(i, { itemId: i.sourceItemId })),
  },
  heroProgression: {} as any,
  heroSpellsAndAbilities: {
    learnedIds: [
      basicAttackDataFeedEntity.id,
      moveDataFeedEntity.id,
      fireballDataFeedEntity.id,
      teleportDataFeedEntity.id,
      healingDataFeedEntity.id,
      visionDataFeedEntity.id,
      weaknessDataFeedEntity.id,
      curseDataFeedEntity.id,
      meteorDataFeedEntity.id,
    ],
    preparedIds: [
      basicAttackDataFeedEntity.id,
      moveDataFeedEntity.id,
      fireballDataFeedEntity.id,
      teleportDataFeedEntity.id,
      healingDataFeedEntity.id,
      visionDataFeedEntity.id,
      weaknessDataFeedEntity.id,
      curseDataFeedEntity.id,
      meteorDataFeedEntity.id,
    ]
  },
  entityType: DataFeedEntityType.Actor,
  informative: { name: "hero", description: "string" },
  visualScene: {
    auxId: "DF750CDB-22BF-4948-BCF9-7FCB1108D1E7",
    mapTexture: { url: `${imagesPath}/hero.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: { url: `${imagesPath}/warior.png` }
  },
  sourceActorId: "DF750CDB-22BF-4948-BCF9-7FCB1108D1E7"
});

export const heroSecondDataFeedEntity: IHeroDataFeedEntity = Object.assign({...hero}, {
  id: "2F0AFD3F-A36F-4660-A46B-B99DB9FEFFC9",
  occupiedAreaId: firstAreaId,
  occupiedRootAreaId: firstAreaId,
  inventory: {
    itemSlots: heroInventory.slots,
    itemBindings: heroInventory.items.map(i => Object.assign(i, { itemId: i.sourceItemId })),
  },
  itemBindings: [],
  heroProgression: {} as any,
  heroSpellsAndAbilities: {
    learnedIds: [
      basicAttackDataFeedEntity.id,
      moveDataFeedEntity.id,
      fireballDataFeedEntity.id,
      teleportDataFeedEntity.id,
      healingDataFeedEntity.id,
      visionDataFeedEntity.id,
      weaknessDataFeedEntity.id,
      curseDataFeedEntity.id,
      meteorDataFeedEntity.id,
    ],
    preparedIds: [
      basicAttackDataFeedEntity.id,
      moveDataFeedEntity.id,
      fireballDataFeedEntity.id,
      teleportDataFeedEntity.id,
      healingDataFeedEntity.id,
      visionDataFeedEntity.id,
      weaknessDataFeedEntity.id,
      curseDataFeedEntity.id,
      meteorDataFeedEntity.id,
    ]
  },
  entityType: DataFeedEntityType.Actor,
  informative: { name: "hero", description: "string" },
  visualScene: {
    auxId: "2F0AFD3F-A36F-4660-A46B-B99DB9FEFFC9",
    mapTexture: { url: `${imagesPath}/hero.png` },
    color: 0x0002,
  },
  visualUi: {
    avatar: { url: `${imagesPath}/mage.png` }
  },
  sourceActorId: "2F0AFD3F-A36F-4660-A46B-B99DB9FEFFC9"
});
