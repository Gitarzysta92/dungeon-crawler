import { DataFeedEntityType } from "../constants/data-feed-entity-type";

export interface IDataFeedEntityBase {
  id: string;
  entityType: DataFeedEntityType;
  informative: { name: string, description: string } & any;
  visualCommon?: unknown;
  visualUi?: unknown;
  visualScene?: unknown;
}
