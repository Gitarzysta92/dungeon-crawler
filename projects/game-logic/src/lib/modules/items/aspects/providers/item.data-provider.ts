import { IGatherableDataProvider } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { IItem } from "../../entities/item/item.interface";
import { ITEM_DATA_TYPE } from "../../items.constants";
import { ItemsService } from "../../items.service";


export class ItemDataProvider implements IGatherableDataProvider {

  constructor(
    private readonly _itemsService: ItemsService,
    private readonly _selectorService: SelectorService
  ) { }

  validate(dataType: string): boolean {
    return ITEM_DATA_TYPE === dataType;
  }

  public getData(s: ISelectorDeclaration<unknown>[], dataSource: IInventoryBearer): IItem[] {
    if (!dataSource) {
      throw new Error("Cannot get data: Data source not provided")
    }

    return this._selectorService.process2<IItem>(s, dataSource.items);
  }
}
