import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { InventorySlotType } from "../inventory-slot/inventory-slot.constants";
import { IInventorySlot } from "../inventory-slot/inventory-slot.interface";
import { IEquipableItem, IItem, IPossesedItem } from "../item/item.interface";
import { IInventory, IInventoryDeclaration, IRedistributionDeclaration } from "./inventory.interface";

export class InventoryFactory implements IMixinFactory<IInventory> {
  constructor(
  ) { }
  
  public validate(e: IEntityDeclaration & Partial<IInventory>): boolean {
    return e.isInventory;
  };

  public create(bc: Constructor<IEntity>): Constructor<IInventory> { 
    class Inventory extends bc implements IInventory {

      public id!: string;
      public items: Array<IPossesedItem & Partial<IEquipableItem>>;
      public slots: IInventorySlot[];
      public isInventory: true = true;
    
      constructor(d: IInventoryDeclaration) { 
        super(d);
        this.id = d.id;
        this.slots = d.slots as IInventorySlot[];
        this.items = d.items as IPossesedItem[];
      }

      public onInitialize() { 
        this.slots.forEach(s => {
          Object.defineProperty(s, 'associatedInventory', { enumerable: false, value: this, writable: true });
          Object.defineProperty(s, 'item', { enumerable: false, writable: true, value: this.items.find(i => i.associatedSlotIds.some(id => id === s.id)) });
        });
        this.items.forEach(i => Object.defineProperty(i, 'associatedInventory', { enumerable: false, value: this }));
        super.onInitialize();
      };


      public hasItem(item: IPossesedItem, amount: number): boolean {
        return this.items.some(i => (i.id === item.id || i.id === item as unknown as string) && (amount ?? 0) < i.amount);
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


      public getSlot(query: { slotId: Guid, slotType?: InventorySlotType }): IInventorySlot {
        return this.slots.find(s => s.id === query.slotId && (!query.slotType || s.slotType === query.slotType));
      }


      public getSlotsByItem(item: IPossesedItem): IInventorySlot[]{
        return this.slots.filter(s => s.item.id === item.id);
      }


      public getEmptyCommonSlot(): IInventorySlot {
        return this.slots.find(s => !s.isOccupied && s.slotType === InventorySlotType.Common);
      }


      public validateRedistribution(decs: Array<IRedistributionDeclaration>): boolean {
        if (decs.filter(d => !!d.to && !!d.to.item).some(d => d.from.item !== d.to.item)) {
          return false;
        }
        if (decs.some(d => d.from.stackSize < d.amount)) {
          return false;
        }

        const canBeAssignedToAnySlotWithSameItem = (d: IRedistributionDeclaration) =>
          (!d.to && this.slots.some(s => s.isAbleToTakeItems(d.amount, d.from.item))) || (d.to && d.to.isAbleToTakeItems(d.amount, d.from.item));
        const canBeAssignedToAnySlot = (d: IRedistributionDeclaration) =>
          (!d.to && this.slots.some(s => s.isAbleToTakeItems(d.amount, d.from.item))) || (d.to && !d.to.isOccupied && d.to.isAbleToTakeItems(d.amount, d.from.item));
        if (decs.some(d => !canBeAssignedToAnySlot(d) && !canBeAssignedToAnySlotWithSameItem(d))) {
          return false;
        }

        const releasedSlots = decs.filter(d => d.from.stackSize === d.amount).map(d => d.from);
        const reservedSlotMap = new Map<IInventorySlot, number>();
        for (let d of decs) {
          let targetSlot = d.to
          if (!targetSlot) {
            const reservedSlots = Array.from(reservedSlotMap.entries())
            targetSlot = reservedSlots.find(([slot, v]) => slot.isAbleToTakeItems(d.amount + v,d.from.item))[0]
            if (!targetSlot) {
              targetSlot = this.slots.find(slot => slot.isAbleToTakeItems(d.amount, d.from.item))
            }
            if (!targetSlot) {
              targetSlot = reservedSlots.find(([slot, v]) => !slot.isOccupied && slot.isAbleToTakeItems(d.amount + v, d.from.item))[0]
            }
            if (!targetSlot) {
              targetSlot = this.slots.find(slot => !slot.isOccupied && slot.isAbleToTakeItems(d.amount, d.from.item))
            }
            if (!targetSlot) {
              targetSlot = releasedSlots.find(slot => !slot.isOccupied && slot.isAbleToTakeItems(d.amount, d.from.item))
            }
          }

          if (!targetSlot) {
            return false;
          }
          const sv = reservedSlotMap.get(d.to);
          const v = sv != null ? sv + d.to.stackSize : d.to.stackSize;
          // Check multiple redistributions to the same slot
          if (v > d.to.stackMaxSize) {
            return false;
          }
          reservedSlotMap.set(d.to, v);
        }

        return true;
      }


      public redistributeItems(defs: Array<{ from: IInventorySlot; to?: IInventorySlot; amount: number; }>): void {
        if (!this.validateRedistribution(defs)) {
          throw new Error("Cannot redistribute items");
        }
        for (let def of defs) {
          const item = def.from.item;
          def.from.removeItem(def.amount);
          this.addItem(item, def.amount, def.to);
        }
      }


      public addItem(i: IItem | Guid, amount: number, slot?: IInventorySlot): void {
        let item: IItem;
        if (typeof item === 'string') {
          item = this.getItem(item);
        } else {
          item = i as IItem;
        }

        if (!slot) {
          slot = this._trySelectSlot(this.slots, item, amount, slot);
        }

        if (!slot) {
          throw new Error("One of the provided slots not exists in given inventory or it is already occupied.");
        }
        const overflow = slot.addItem(amount, item);
        if (overflow > 0) {
          this.addItem(item, overflow);
        }
      }
    

      public removeItem(item: IPossesedItem | Guid, amount: number): void {
        const id = (item as IPossesedItem).id ?? item;
        const slot = this.slots.find(s => s.item?.id === id);
        slot.removeItem(amount);
      }

      public getReservationItem(slot: IInventorySlot): IEquipableItem | undefined {
        return this.items.find(i => i.reservedSlotIds?.includes(slot.id)) as IEquipableItem
      }

      private _trySelectSlot(slots: IInventorySlot[], item: IItem, amount: number, slot?: IInventorySlot): IInventorySlot {
        //Try select preffered slot
        slot = slots.find(s => s.id === slot.id && s.isAbleToTakeItems(amount, item));

        if (!slot) {
          //Try select slot with same item
          slot = slots.find(s => s.item?.id === item.id && s.isAbleToTakeItems(amount, item));
        }
        if (!slot) {
          //Try select any available slot
          slot = slots.find(s => s.isAbleToTakeItems(amount, item));
        }
        return slot;
      }

    }
    return Inventory;
  }
}