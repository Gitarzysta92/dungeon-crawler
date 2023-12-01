import { IArea } from "@game-logic/lib/features/adventure/area.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";

export interface IAreaDataFeedEntity extends IDataFeedEntityBase, IArea {
  //entityType: DataFeedEntityType.Area,
  informative: { name: string, description: string }
}