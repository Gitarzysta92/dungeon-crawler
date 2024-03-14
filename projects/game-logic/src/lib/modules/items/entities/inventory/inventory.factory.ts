import { Constructor, Guid } from "../../../../extensions/types";
import { IEquipableItem, IPossesedItem } from "../item/item.interface";
import { IItem } from "../item/item.interface";
import { IInventory, IInventoryDeclaration } from "./inventory.interface";
import { IInventorySlot } from "../inventory-slot/inventory-slot.interface";
import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { InventorySlotType } from "../inventory-slot/inventory-slot.constants";

export class InventoryFactory implements IEntityFactory<IInventory> {
  constructor(
  ) { }
  
  public validate(e: IEntity & Partial<IInventory>): boolean {
    return e.isInventory;
  };

  public create(bc: typeof Entity): Constructor<IInventory> { 
    class Inventory extends bc implements IInventory {

      public id!: string;
      public items: IPossesedItem[];
      public slots: IInventorySlot[];
      public isInventory: true = true;
    
      constructor(d: IInventoryDeclaration) { 
        super(d);
        this.id = d.id;
        this.slots = d.slots as IInventorySlot[];
        this.items = d.items as IPossesedItem[];
      }


      protected onInitialize() { 
        this.slots.forEach(s => s.associatedInventory = this);
      };


      public hasItem(item: IPossesedItem, amount: number): boolean {
        return this.items.some(i => i.id === item.id && (amount ?? 0) < i.amount);
      }
    

      public getItem(item: IItem | string): IPossesedItem | undefined {
        if (typeof item === 'string') {
          return this.items.find(i => i.id === item); 
        } else {
          return this.items.find(i => i.id === item.id); 
        }
      }


      public getItems(slots?: IInventorySlot[]): IPossesedItem[] {
        return this.slots.filter(s => !!slots ? slots.includes(s) : true).map(s => s.item);
      }


      public getAllEquippedItems(): IEquipableItem[] {
        return this.getItems().filter((i: IEquipableItem) => i.isEquipped) as IEquipableItem[];
      }


      public hasSlot(slot: IInventorySlot): boolean {
        return this.slots.some(s => s === slot);
      }


      public getSlot(query: { slotId: Guid, slotType: InventorySlotType }): IInventorySlot {
        return this.slots.find(s => s.id === query.slotId && s.slotType === query.slotType);
      }


      public getSlotsByItem(item: IPossesedItem): IInventorySlot[]{
        return this.slots.filter(s => s.item.id === item.id);
      }


      public getEmptyCommonSlot(): IInventorySlot {
        return this.slots.find(s => !s.isOccupied && s.slotType === InventorySlotType.Common);
      }


      public validateRedistribution(defs: Array<{ from: IInventorySlot; to?: IInventorySlot; amount: number; }>): boolean {
        const itemsMismatched = defs.filter(d => !!d.to).some(d => d.from.item !== d.to.item);
        if (itemsMismatched) {
          return false;
        }
        if (defs.some(d => d.from.stackSize < d.amount)) {
          return false;
        }
        const newAssignments = defs.filter(d =>
          !d.to && !this.slots.some(s => s.item === d.from.item && s.canBeAssigned(d.amount)) ||
          d.to && !d.to.isOccupied ||
          d.to && !d.to.canBeAssigned(d.amount)
        );
        const released = defs.filter(d => d.from.stackSize === d.amount);
        const emptyFields = this.slots.filter(s => !s.isOccupied && s.slotType === InventorySlotType.Common);
        return newAssignments.length <= (emptyFields.length + released.length);
      }


      public redistributeItems(defs: Array<{ from: IInventorySlot; to?: IInventorySlot; amount: number; }>): void {
        if (!this.validateRedistribution(defs)) {
          throw new Error("Cannot redistribute items");
        }
        for (let def of defs) {
          const item = def.from.removeItem(def.amount);
          this.addItem(item, def.amount, def.to);
        }
      }

      public tryAddItem(item: IItem, amount: number): boolean {
        return true;
      }


      public addItem(item: IItem, amount: number, slot?: IInventorySlot): void {
        if (slot) {
          slot = this.slots.find(s => s.id === slot.id && s.canBeAssigned(amount));
        }
        if (!slot) {
          slot = this.slots.find(s => s.item?.id === item.id && s.canBeAssigned(amount));
        }
        if (!slot) {
          slot = this.slots.find(s => s.canBeAssigned(amount));
        }
        if (!slot) {
          throw new Error("One of the provided slots not exists in given inventory or it is occupied");
        }
        const overflow = slot.addItem(amount, item);
        if (overflow > 0) {
          this.addItem(item, overflow);
        }
      }
    

      public removeItem(item: IPossesedItem, amount: number): void {
        const slot = this.slots.find(s => s.item?.id === item.id);
        slot.removeItem(amount);
      }

    }
    return Inventory;
  }
}