import { Guid } from "../../infrastructure/extensions/types";
import { IItemDeclaration } from "./entities/item/item.interface";

export interface IItemsDataFeed {
  getItems: (ids?: Guid[]) => Promise<IItemDeclaration[]>;
  getItem: (id: Guid) => Promise<IItemDeclaration>;
}



