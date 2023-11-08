import { gatherItemQuest, slayEnemiesItemQuest } from "@game-logic/data/quests.data";
import { IQuestDataFeedEntity } from "../interfaces/data-feed-quest-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";


export const gatherItemQuestDataFeedEntity: IQuestDataFeedEntity = Object.assign(gatherItemQuest, {
  entityType: DataFeedEntityType.Quest,
  informative: { name: "string", description: "string" }
})


export const slayEnemiesItemQuestDataFeedEntity: IQuestDataFeedEntity = Object.assign(slayEnemiesItemQuest, {
  entityType: DataFeedEntityType.Quest,
  informative: { name: "string", description: "string" }
})