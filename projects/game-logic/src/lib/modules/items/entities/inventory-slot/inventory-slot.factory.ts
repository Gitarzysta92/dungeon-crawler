import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../extensions/types";
import { InventorySlotType } from "./inventory-slot.constants";
import { IItem, IPossesedItem } from "../item/item.interface";
import { IInventorySlot, IInventorySlotDeclaration } from "./inventory-slot.interface";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { IInventory } from "../inventory/inventory.interface";


export class InventorySlotFactory implements IEntityFactory<InventorySlotType> {

  constructor() { }

  public validate(e: IEntity & Partial<IInventorySlot>): boolean {
    return e.isInventorySlot;
  };

  public create(bc: typeof Entity): Constructor<IInventorySlot> { 
    class InventorySlot extends bc implements IInventorySlot {
      isInventorySlot: true;
      id: string;
      slotType: InventorySlotType;
      isOccupied?: boolean;
      stackSize: number;
      stackMaxSize: number;

      @NotEnumerable()
      item: IPossesedItem | undefined;
      @NotEnumerable()
      public associatedInventory: IInventory;

      constructor(d: IInventorySlotDeclaration) {
        super(d);
      }

      public canBeAssigned(amount: number): boolean {
        throw new Error("Method not implemented.");
      }

      protected onInitialize() { 
        this.item.associatedInventory = this.associatedInventory;
      };
  
      public addItem(amount: number, item?: IItem): number {
        if (!this.item && !item || item !== this.item) {
          return;
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

      public removeItem(amount?: number): IPossesedItem {
        const item = this.item;
        if (amount && item) {
          this.stackSize -= amount;
        } else {
          this.item = undefined;
          this.stackSize = 0;
        }
        item.removeSlot(this.id);
        return item;
      }

      public isAbleToTakeItems(amount: number): boolean {
        return this.item.amount + amount <= this.stackMaxSize;
      }
    }
    return InventorySlot;
  }
}