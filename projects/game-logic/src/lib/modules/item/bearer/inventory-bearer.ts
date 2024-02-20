import { Inventory } from "../inventory/inventory";
import { IInventorySlot } from "../inventory/inventory.interface";
import { IEquipable, IItem } from "../item.interface";
import { IInventoryBearer } from "./inventory-bearer.interface";


export class InventoryBearer implements IInventoryBearer {
  isInventoryBearer: true;
  inventory: Inventory;

  constructor(data: IInventoryBearer) {
    this.inventory = data.inventory as any;
  }

  public possessItem(item: IItem, amount: number = 1): boolean {
    return true;
  }

  public isAbleToUseItem(item: IItem): boolean {
    return true;
  }

  public equipItem(item: IItem, slots: IInventorySlot[]): void {
    // if (!!payload.slots && payload.slots?.length > 0) {
    //   slots = state.heroInventory.slots.filter(s => payload.slots!.some(ps => ps.id === s.id))
    // } else {
    //   slots = state.heroInventory.getAllSpecifiedSlots(payload.item.requiredSlots)
    // }

    // const numberOfRequiredSlots = payload.item.requiredSlots.reduce((a, c) => a += c.amount, 0);
    // if (slots.length < numberOfRequiredSlots) {
    //   throw new Error(`Cannot find all required slots for given item`);
    // }

    
    // state.heroInventory.removeItem(payload.item, 1);

    // const associatedItems = state.heroInventory.getAllAssociatedItems(slots);
    // for (let associatedItem of associatedItems) {
    //   state.heroInventory.removeItem(associatedItem, 1);
    //   state.heroInventory.addItem(associatedItem, 1);
    //   (associatedItem as unknown as IEquipable).isEquipped = false; 
    // }

    // state.heroInventory.addItem(payload.item, 1, slots);
    // payload.item.isEquipped = true;
  }

  public unequipItem(item: IItem, slots: IInventorySlot[]): void {

  }
}