import { IDataFeedEntityBase } from "./data-feed-entity.interface";

export interface IUiActivityDataFeedEntity extends IDataFeedEntityBase {
  informative: { name: string, description: string }
}