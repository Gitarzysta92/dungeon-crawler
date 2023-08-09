import { IInventory, IItemSlot, IPossesedItem } from "./inventory.interface";
import { IItem } from "./items.interface";


export class Equipment implements IInventory {

  id: string;
  actorId: string;
  slots: IItemSlot[];
  items: Array<IPossesedItem & IItem>;

  constructor(data: IInventory) {
    this.id = data.id;
    this.actorId = data.actorId;
    this.slots = data.slots;
    this.items = data.items;
  }

  public equipItem<T extends IItem>(item: T): void {
  
  }

  public unequipItem<T extends IItem>(item: T): void {
    return
  }
}