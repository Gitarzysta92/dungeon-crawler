import { IItem } from "@game-logic/lib/features/items/items.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";

export interface IItemDataFeedEntity extends IDataFeedEntityBase, IItem {
  //entityType: DataFeedEntityType.Item,
  informative: { name: string, description: string }
}