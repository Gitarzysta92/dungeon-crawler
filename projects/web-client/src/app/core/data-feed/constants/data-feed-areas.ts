import { IAreaDataFeedEntity } from "../interfaces/data-feed-area-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";
import { firstArea, firstAreaDungeon, firstAreaTavern, secondArea } from "@game-logic/data/areas.data";

export const firstAreaDataFeedEntity: IAreaDataFeedEntity = Object.assign(firstArea, {
  entityType: DataFeedEntityType.Area,
  informative: { name: "First area", description: "string" },
});

export const firstAreaTavernDataFeedEntity: IAreaDataFeedEntity = Object.assign(firstAreaTavern, {
  entityType: DataFeedEntityType.Area,
  informative: { name: "First area tavern", description: "string" },
});

export const firstAreaDungeonDataFeedEntity: IAreaDataFeedEntity = Object.assign(firstAreaDungeon, {
  entityType: DataFeedEntityType.Area,
  informative: { name: "First area dungeon", description: "string" },
});

export const secondAreaDataFeedEntity: IAreaDataFeedEntity = Object.assign(secondArea, {
  entityType: DataFeedEntityType.Area,
  informative: { name: "Second area", description: "string" },
});