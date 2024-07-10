
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ItemRarity } from "../../items.constants";
import { InventorySlotType } from "../inventory-slot/inventory-slot.constants";
import { IInventorySlot } from "../inventory-slot/inventory-slot.interface";
import { IInventory } from "../inventory/inventory.interface";
import { IDisposableItem, IDisposableItemDclaration, IEquipableItem, IEquipableItemDeclaration, IItem, IItemDeclaration, IPossesedItem, IPossesedItemDeclaration } from "./item.interface";



export class ItemFactory implements IMixinFactory<IItem> {

  constructor() { }

  public validate(e: IEntityDeclaration & Partial<IItem>): boolean {
    return e.isItem;
  };

  public create(e: Constructor<IEntity>): Constructor<IItem> {
    class Item extends e implements IPossesedItem, IDisposableItem, IEquipableItem  {

      public id: string;
      public sourceItemId: string;
      public rarity: ItemRarity;
      public associatedSlotIds: string[];
      public equipableTo: Array<{ slotId: Guid, reserveSlotId?: Guid[] }>;

      @NotEnumerable()
      public associatedInventory: IInventory;
      @NotEnumerable()
      public get associatedSlots(): IInventorySlot[] { return this.associatedSlotIds.map(id => this.associatedInventory.getSlot({ slotId: id })) };
      @NotEnumerable()
      //public get quantity(): number { return this.associatedSlots.reduce((acc, curr) => acc + curr.stackSize, 0) };
      public quantity: number;
      @NotEnumerable()
      public get reservedSlotIds(): Guid[] { return this._getReservedSlots() }
      @NotEnumerable()
      public get isEquipped(): boolean { return this.associatedSlots.some(s => s.slotType === InventorySlotType.Equipment) };
      @NotEnumerable()
      public get associatedEquipmentSlot(): IInventorySlot { return this.associatedSlots.find(s => s.slotType === InventorySlotType.Equipment && !s.isReserved) };

      public isItem = true as const;
      public isEntity = true as const;
      public isMixin = true as const;
      

      constructor(d: IItemDeclaration & Partial<IDisposableItemDclaration> & Partial<IEquipableItemDeclaration> & Partial<IPossesedItemDeclaration>) {
        super(d)
        this.id = d.id;
        this.sourceItemId = d.sourceItemId;
        this.equipableTo = d.equipableTo;
        this.associatedSlotIds = d.associatedSlotIds ?? [];
        this.rarity = d.rarity;

        // temp
        this.quantity = 100
      }
  

      public addSlot(slotId: string): void {
        if (!this.associatedSlotIds.includes(slotId)) {
          this.associatedSlotIds.push(slotId);
        }
      }

      public removeSlot(slotId: string): void {
        const index = this.associatedSlotIds.indexOf(slotId);
        if (index >= 0) {
          this.associatedSlotIds.splice(index, 1);
        }
      }

      public equip(toSlot: IInventorySlot, fromSlot: IInventorySlot): void {
        if (!this.equipableTo || !this.validateEquipPossiblity(toSlot, fromSlot)) {
          throw new Error("Selected item is not equipable");
        }
        this.associatedInventory.redistributeItems(this._prepareEquipData(toSlot, fromSlot));
      }
      

      public unequip(): void {
        const data = [{ from: this.associatedEquipmentSlot, to: undefined, amount: this.associatedEquipmentSlot.stackSize }];
        if (!this.associatedInventory.validateRedistribution(data)) {
          throw new Error("Cannot unequip item");
        }
        this.associatedInventory.redistributeItems(data);
      }


      public validateEquipPossiblity(toSlot: IInventorySlot, fromSlot: IInventorySlot): boolean {
        if (!this.equipableTo.some(e => e.slotId === toSlot.id)) {
          return false;
        } 
        if (!this.associatedSlots.includes(fromSlot)) {
          return false;
        }
        const data = this._prepareEquipData(toSlot, fromSlot);
        return this.associatedInventory.validateRedistribution(data);
      }

      
      private _prepareEquipData(toSlot: IInventorySlot, fromSlot: IInventorySlot) {
        const slotsToReserve = this.equipableTo.find(e => e.slotId === toSlot.id)?.reserveSlotId;
        if (!slotsToReserve) {
          throw new Error("Cannot find equipable declaration");
        }
        const itemsToUnequipForReservation = slotsToReserve.reduce((acc, id) => {
          const s = this.associatedInventory.getSlot({ slotId: id });
          return !!s ? acc.concat({ from: s, to: undefined, amount: s.stackSize }) : acc
        }, []);
        return !!toSlot.item ?
          itemsToUnequipForReservation.concat({ from: toSlot, to: undefined, amount: toSlot.stackSize }) :
          itemsToUnequipForReservation
      }


      private _getReservedSlots(): Guid[] {
        return this.equipableTo
          ?.reduce((acc, c) => {
            if (!this.associatedSlotIds.includes(c.slotId) || !c.reserveSlotId) {
              return acc;
            }
            return acc.concat(c.reserveSlotId)
          },[]) ?? []
      }


    }
    return Item;
  };
}