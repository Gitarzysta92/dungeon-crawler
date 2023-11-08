import { IQuest } from "@game-logic/lib/features/quests/quests.interface";
import { DataFeedEntityType } from "../constants/data-feed-entity-type";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";

export interface IQuestDataFeedEntity extends IDataFeedEntityBase, IQuest {
  //entityType: DataFeedEntityType.Quest,
  informative: { name: string, description: string }
}