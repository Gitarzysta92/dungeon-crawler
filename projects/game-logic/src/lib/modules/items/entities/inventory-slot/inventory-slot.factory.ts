import { IEntity } from "../../../../base/entity/entity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IInventory } from "../inventory/inventory.interface";
import { IEquipableItem, IItem, IPossesedItem } from "../item/item.interface";
import { InventorySlotType } from "./inventory-slot.constants";
import { IInventorySlot, IInventorySlotDeclaration } from "./inventory-slot.interface";


export class InventorySlotFactory implements IMixinFactory<IInventorySlot> {

  constructor() { }

  public validate(e: IInventorySlot): boolean {
    return e.isInventorySlot;
  };

  public create(bc: Constructor<IEntity>): Constructor<IInventorySlot> { 
    class InventorySlot extends bc implements IInventorySlot {
      public isInventorySlot = true as const;
      public id: string;
      public slotType: InventorySlotType;
      public stackSize: number;
      public stackMaxSize: number;

      @NotEnumerable()
      public get isOccupied() { return this.stackSize > 0 && !!this.item };

      @NotEnumerable()
      public get isReserved() { return !!this.associatedInventory.getReservationItem(this) };

      @NotEnumerable()
      public get reservationItem() { return this.associatedInventory.getReservationItem(this) };

      @NotEnumerable()
      public item: IPossesedItem & Partial<IEquipableItem> | undefined;

      @NotEnumerable()
      public associatedInventory: IInventory;

      constructor(d: IInventorySlotDeclaration) {
        super(d);
        this.id = d.id;
        this.slotType = d.slotType;
        this.isInventorySlot = d.isInventorySlot;
        this.stackSize = d.stackSize ?? 0;
        this.stackMaxSize = d.stackMaxSize ?? 100;
      }
  
      public addItem(amount: number, item?: IItem): number {
        if (this.item && item !== this.item) {
          throw new Error("Selected slot is occupied")
        }

        if (amount + this.stackSize > this.stackMaxSize) {
          throw new Error("Amount exceeds stack max size.")
        }

        if (!this.item && item) {
          this.item = item as IPossesedItem;
          this.stackSize = amount;
          return;
        }
        item.addSlot(this.id);
        return this.stackSize += amount;
      }

      public removeItem(amount?: number): number {        
        if (!this.item) {
          return 0;
        }

        if (amount) {
          this.stackSize -= amount;
        } else {
          this.stackSize = 0;
        }

        let overflow;
        if (this.stackMaxSize < 0) {
          overflow = this.stackMaxSize;
          this.stackMaxSize = 0;
        }

        if (this.stackSize <= 0) {
          this.item.removeSlot(this.id);
          delete this.item;
          return overflow;
        }

        return this.stackSize;
      }

      public isAbleToTakeItems(amount: number, item: IItem & Partial<IEquipableItem>): boolean {
        if (!!this.item && this.item !== item) {
          return false;
        }

        if (this.slotType === InventorySlotType.Equipment && item.equipableTo && item.equipableTo.every(e => e.slotId !== this.id)) {
          return false;
        }

        const amoutAllowed = this.stackSize + amount <= this.stackMaxSize;
        if (!this.item) {
          return amoutAllowed && !this.isReserved
        }
        return amoutAllowed
      }
    }
    return InventorySlot;
  }
}