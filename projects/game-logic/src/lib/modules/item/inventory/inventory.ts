import { Dictionary } from "../../../extensions/types";
import { equipableSlotTypes, InventorySlotType } from "./inventory.constants";
import { IInventory, IInventorySlot, IItemSlotAssignment } from "./inventory.interface";
import { IItem, IPossesedItem } from "../item.interface";


type InventoryItem = IItem & IPossesedItem & { getAssociatedSlots: () => InventoryItemSlot[] };
type InventoryItemSlot = IInventorySlot & { getAssociatedItem: () => InventoryItem | undefined };

export class Inventory implements IInventory {

  public id!: string;
  public actorId!: string;
  public items: Array<InventoryItem>;
  public slots: InventoryItemSlot[];

  constructor(data: IInventory) {
    this.items = data.items.map(i => i.amountInStack == null ? Object.assign(i, { amountInStack: 1 }) : i)
      .map(i => Object.assign(i, { getAssociatedSlots: () => this.slots.filter(s => i.slotIds.some(id => id === s.id)) }));
    this.slots = data.slots.map(s => Object.assign(s, { getAssociatedItem: () => this.items.find(i => i.slotIds.some(id => id == s.id)) }));
  }

  public moveItem() {
    state.heroInventory.removeItem(item, payload.amount);
    state.heroInventory.addItem(item, payload.amount, payload.slot);
  }

  public getFirstEmptyCommonSlot(): InventoryItemSlot | undefined {
    return this.slots.find(s => !s.isOccupied && s.slotType === InventorySlotType.Common);
  }

  public hasItem(itemId: string): boolean {
    return this.items.some(i => i.id === itemId);
  }

  public getItem<T extends IItem>(item: T | string): T & InventoryItem | undefined {
    if (typeof item === 'string') {
      return this.items.find(i => i.id === item) as T & InventoryItem; 
    } else {
      return this.items.find(i => i.id === item.id) as T & InventoryItem; 
    }
    
  }

  public addItem(item: IItem, amount: number, slot?: IInventorySlot[] | IInventorySlot): void {
    let slots;
    if (!!slot &&!Array.isArray(slot)) {
      slots = [slot];
    } else {
      slots = slot;
    }

    const sameItem = this.items.find(i => i.sourceItemId === item.sourceItemId)

    if (Array.isArray(slots) && slots.length > 0) {
      const mappedSlots = slots.map(ps => this.slots.find(s => ps.id === s.id && !s.isOccupied)).filter(s => !!s)
      if (mappedSlots.length !== slots.length) {
        throw new Error("One of the provided slots not exists in given inventory or it is occupied");
      }
      slots = mappedSlots as IInventorySlot[];
    } else if (!!sameItem && sameItem.amountInStack + amount <= sameItem.maxStackSize) {
      slots = sameItem.getAssociatedSlots();
    }  

    if (slots?.length === 0) {
      throw new Error("Cannot find empty item slot during addItem operation");
    }

    const itemInInventory = this.items.find(i => i.id === item.id);
    if (itemInInventory) {
      itemInInventory.amountInStack += amount;
    } else {
      this.items.push(Object.assign(item, {
        slotIds: slots!.map(s => s.id),
        amountInStack: amount,
        getAssociatedSlots: () => slots as InventoryItemSlot[]
      }));
    }

    slots!.forEach(s => s.isOccupied = true);
  }

  public removeItem(item: IItem & IPossesedItem, amount: number): void {
    const slots = this.slots.filter(s => item.slotIds.some(id => id === s.id));
    if (slots.length !== item.slotIds.length) {
      throw new Error("One of the associated slots not exists in given inventory");
    }

    const itemInInventory = this.items.find(i => i.id === item.id);
    if (!itemInInventory) {
      throw new Error(`Cannot find item to remove: ${item.name}`);
    }

    if (itemInInventory.amountInStack < amount) {
      throw new Error(`Trying to remove: ${item.name} in amount: ${amount}, but there is only: ${itemInInventory.amountInStack} in inventory`)
    }

    if (itemInInventory.amountInStack === amount) {
      this.items = this.items.filter(i => i.id !== item.id);
      slots.forEach(s => s.isOccupied = false);
      item.slotIds = [];
    } else {
      itemInInventory.amountInStack -= amount;
    }
  }


  public getAllSpecifiedSlots(requiredSlots: IItemSlotAssignment[]): InventoryItemSlot[] {
    let slots: Dictionary<string, string[]> = {};

    for (let slot of this.slots) {
      if (!slots[slot.slotType]) {
        slots[slot.slotType] = [];
      }
      slots[slot.slotType].push(slot.id);
    }

    return requiredSlots
      .filter(q => slots[q.slotType].length >= q.amount)
      .reduce((p, c) => p.concat(slots[c.slotType].map(id => this.slots.find(s => s.id === id)) as any), [])
      .filter(s => !!s)
  }

  public getAllAssociatedItems(slots: InventoryItemSlot[]): InventoryItem[] {
    return this.items.filter(i => i.slotIds.some(id => slots.some(s => s.id == id)));
  }

  public getAllAssociatedSlots(items: (IItem & IPossesedItem)[] | (IItem & IPossesedItem)): InventoryItemSlot[] {
    if (!Array.isArray(items)) {
      items = [items];
    }
    return this.slots.filter(s => (items as (IItem & IPossesedItem)[]).some(i => i.slotIds.some(id => id === s.id)));
  }

  public getAllEquippedItems(): InventoryItem[] {
    return this.items.filter(i => i.getAssociatedSlots().some(s => equipableSlotTypes.some(eq => eq === s.slotType)));
  }

  public getAllItems<T extends IItem>(): (T & IPossesedItem)[] {
    return this.items as unknown as (T & IPossesedItem)[];
  }
}




// public getCurrency(type: CurrencyType): IPossesedItem & ICurrencyItem | undefined {
//   return (this.items as Array<InventoryItem & ICurrencyItem>)
//     .find(i => i.itemType === ItemType.Currency && i.currencyType === type);
// }

// public increaseCurrencyAmount(amount: number, currencyType: CurrencyType): void {
//   const gold = this.getCurrency(currencyType)!;
//   this.addItem(gold, amount)
// }

// public reduceCurrencyAmount(amount: number, currencyType: CurrencyType): void {
//   const gold = this.getCurrency(currencyType)!;
//   this.removeItem(gold, amount) 
// }


// slots = [];
//       if (item.itemType === ItemType.Currency) {
//         const currencySlot = this.slots.find(s => s.slotType === InventorySlotType.Currency);
//         if (!!currencySlot) {
//           slots.push(currencySlot);
//         }
//       } else {
//         const commonSlot = this.slots.find(s => s.slotType === InventorySlotType.Common && !s.isOccupied);
//         if (!!commonSlot) {
//           slots.push(commonSlot);
//         }
//       }