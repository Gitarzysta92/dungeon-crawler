import { boots, gold, magicPoo, meleeWeapoon, poo, potion, staff } from "@game-logic/data/items.data";
import { IItemDataFeedEntity } from "../interfaces/data-feed-item-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";

export const staffDataFeedEntity: IItemDataFeedEntity = Object.assign(staff, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});

export const potionDataFeedEntity: IItemDataFeedEntity = Object.assign(potion, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});

export const pooDataFeedEntity: IItemDataFeedEntity = Object.assign(poo, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});

export const magicPooDataFeedEntity: IItemDataFeedEntity = Object.assign(magicPoo, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});

export const goldDataFeedEntity: IItemDataFeedEntity = Object.assign(gold, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});

export const meleeWeapoonDataFeedEntity: IItemDataFeedEntity = Object.assign(meleeWeapoon, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});

export const bootsDataFeedEntity: IItemDataFeedEntity = Object.assign(boots, {
  entityType: DataFeedEntityType.Item,
  informative: { name: "string", description: "string" },
});