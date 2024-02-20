import { IEntityFactory, IEntity } from "../../base/entity/entity.interface";
import { Item } from "./item";
import { IItem, IItemDataFeed } from "./item.interface";

export class ItemFactory implements IEntityFactory<Item> {

  public get classDefinition() { return Item };

  constructor(
    private readonly _dataFeed: IItemDataFeed
  ) { }
  
  public create(e: IItem): Item {
    return new Item(e);
  };

  public validate(e: IEntity & Partial<Item>): boolean {
    return e.isItem;
  };

}