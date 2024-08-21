import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IEquipableItem, IItem, IPossesedItem } from "../../entities/item/item.interface";
import { InventorySlotType } from "./inventory-slot.constants";
import { IInventorySlot, IInventorySlotDeclaration } from "./inventory-slot.interface";


export class InventorySlotFactory implements IMixinFactory<IInventorySlot> {

  constructor() { }

  public isApplicable(e: IInventorySlot): boolean {
    return e.isInventorySlot;
  };

  public create(bc: Constructor<IMixin>): Constructor<IInventorySlot> { 
    class InventorySlot extends bc implements IInventorySlot {
      public id: number;
      public isInventorySlot = true as const;
      public slotType: InventorySlotType;
      public stackSize: number;
      public stackMaxSize: number;

      @NotEnumerable()
      public get isOccupied() { return this.stackSize > 0 && !!this.item };

      @NotEnumerable()
      public get isReserved() { return !!this.reservationItem };

      @NotEnumerable()
      public reservationItem: IPossesedItem & Partial<IEquipableItem> | undefined;

      @NotEnumerable()
      public item: IPossesedItem & Partial<IEquipableItem> | undefined;


      constructor(d: IInventorySlotDeclaration) {
        super(d);
        this.id = d.id;
        this.slotType = d.slotType;
        this.isInventorySlot = d.isInventorySlot;
        this.stackSize = d.stackSize ?? 0;
        this.stackMaxSize = d.stackMaxSize ?? 100;
      }
  
      public addItem(amount: number, item: IItem): number {
        if (this.item && item !== this.item) {
          throw new Error("Selected slot is occupied")
        }

        if (amount + this.stackSize > this.stackMaxSize) {
          throw new Error("Amount exceeds stack max size.")
        }

        if (!this.item && item) {
          this.item = item as IPossesedItem;
          this.stackSize = amount;
          item.addSlot(this.id);
          return;
        }
        this.stackSize += amount
        let overflow = 0
        if (this.stackSize > this.stackMaxSize) {
          overflow = Math.abs(this.stackSize - this.stackMaxSize);
          this.stackSize = this.stackMaxSize;
        }

        return overflow;
      }

      public removeItem(amount?: number): number {
        console.log(this, amount)
        if (!this.item) {
          throw new Error("Cannot remove item from empty slot")
        }

        if (amount) {
          this.stackSize -= amount;
        } else {
          this.stackSize = 0;
        }

        let overflow = 0;
        if (this.stackSize < 0) {
          overflow = Math.abs(this.stackSize);
          this.stackSize = 0;
        }

        if (this.stackSize <= 0) {
      
          this.item.removeSlot(this.id);
          delete this.item;
        }

        return overflow;
      }

      public isAbleToTakeItems(amount: number, item: IItem & Partial<IEquipableItem>): boolean {
        if (!!this.item && this.item !== item) {
          return false;
        }

        if (this.slotType === InventorySlotType.Equipment &&
          ((item.equipableTo && item.equipableTo.every(e => e.slotId !== this.id)) || !item.equipableTo)) {
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