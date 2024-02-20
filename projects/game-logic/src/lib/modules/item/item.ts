import { EntityLifecycle } from "../../base/entity/entity.constants";
import { IItem } from "./item.interface";

export class Item implements IItem {
  isItem: true;
  id: string;
  maxStackSize: number;
  sourceItemId: string;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;

  constructor(
    private _data: IItem
  ) {}
}