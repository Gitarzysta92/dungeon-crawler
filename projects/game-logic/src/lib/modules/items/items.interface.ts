import { Guid } from "../../extensions/types";
import { IItem } from "./entities/item/item.interface";

export interface IItemsDataFeed {
  getItems: (ids?: Guid[]) => Promise<IItem[]>;
  getItem: (id: Guid) => Promise<IItem>;
}



