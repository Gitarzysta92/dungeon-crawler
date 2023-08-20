import { ItemType, CurrencyType } from "./items.constants";
import { ICurrencyItem } from "./items.interface";

export class Currency implements ICurrencyItem {
  id: string;
  name!: string;
  itemType: ItemType.Currency;
  currencyType: CurrencyType.Gold;
  maxStackSize!: number;
  sourceItemId!: string;

  constructor() {
    this.id = ''
    this.itemType = ItemType.Currency;
    this.currencyType = CurrencyType.Gold;
  }
}