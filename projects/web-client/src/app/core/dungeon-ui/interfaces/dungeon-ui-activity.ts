import { IDataFeedEntityBase } from "../../data-feed/interfaces/data-feed-entity.interface";

export interface IDungeonUiActivity {
  id: string,
  name: string,
  iconUrl: string,
  isHighlighted: boolean,
  isDisabled: boolean,
  isSelected: boolean;
  isContextual: boolean;
  isStatic: boolean;
  data: IDataFeedEntityBase
}