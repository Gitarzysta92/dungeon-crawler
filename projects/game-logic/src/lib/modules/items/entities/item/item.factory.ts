import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ItemRarity } from "../../items.constants";
import { ItemsService } from "../../items.service";
import { InventorySlotType } from "../../mixins/inventory-slot/inventory-slot.constants";
import { IInventorySlot } from "../../mixins/inventory-slot/inventory-slot.interface";
import { IInventoryBearer } from "../bearer/inventory-bearer.interface";
import { IDisposableItem, IDisposableItemDclaration, IEquipableItem, IEquipableItemDeclaration, IItem, IItemDeclaration, IPossesedItem, IPossesedItemDeclaration } from "./item.interface";



export class ItemFactory implements IMixinFactory<IItem> {

  constructor(
    private readonly _itemsService: ItemsService
  ) { }

  public isApplicable(e: IEntityDeclaration & Partial<IItem>): boolean {
    return e.isItem;
  };

  public create(e: Constructor<IEntity>): Constructor<IItem> {
    const itemsService = this._itemsService;
    class Item extends e implements IPossesedItem, IDisposableItem, IEquipableItem {

      public id: string;
      public isItem = true as const;
      public isEntity = true as const;
      public isMixin = true as const;
      public sourceItemId: string;
      public rarity: ItemRarity;
      public associatedSlotIds: number[];
      public equipableTo: Array<{ slotId: number, reserveSlotId?: number[] }>;
      public quantity: number;

      @NotEnumerable()
      public bearer: IInventoryBearer;
      @NotEnumerable()
      public get associatedSlots(): IInventorySlot[] { return this.associatedSlotIds.map(id => this.bearer.inventorySlots.find(s => s.id === id)) };
      @NotEnumerable()
      public get reservedSlotIds(): number[] { return this._getReservedSlots() }
      @NotEnumerable()
      public get isEquipped(): boolean { return this.associatedSlots.some(s => s.slotType === InventorySlotType.Equipment) };
      @NotEnumerable()
      public get associatedEquipmentSlot(): IInventorySlot { return this.associatedSlots.find(s => s.slotType === InventorySlotType.Equipment && !s.isReserved) };

      constructor(d: IItemDeclaration & Partial<IDisposableItemDclaration> & Partial<IEquipableItemDeclaration> & Partial<IPossesedItemDeclaration>) {
        super(d)
        this.id = d.id;
        this.sourceItemId = d.sourceItemId;
        this.equipableTo = d.equipableTo;
        this.associatedSlotIds = d.associatedSlotIds ?? [];
        this.rarity = d.rarity;
        this.quantity = d.quantity;
      }

      public setBearer(bearer: IInventoryBearer): void {
        Object.defineProperty(this, 'bearer', {
          value: bearer,
          enumerable: false
        })
      }
  

      public addSlot(slotId: number): void {
        if (!this.associatedSlotIds.includes(slotId)) {
          this.associatedSlotIds.push(slotId);
        }
      }

      public removeSlot(slotId: number): void {
        const index = this.associatedSlotIds.indexOf(slotId);
        if (index >= 0) {
          this.associatedSlotIds.splice(index, 1);
        }
      }

      public equip(toSlot: IInventorySlot, fromSlot: IInventorySlot): void {
        if (!this.equipableTo || !this.validateEquipPossiblity(toSlot, fromSlot)) {
          throw new Error("Selected item is not equipable");
        }
        itemsService.redistributeItems(this._prepareEquipData(toSlot, fromSlot), this.bearer)
      }
      

      public unequip(): void {
        const data = [{ from: this.associatedEquipmentSlot, to: undefined, amount: this.associatedEquipmentSlot.stackSize }];
        if (!itemsService.validateRedistribution(data, this.bearer.inventorySlots)) {
          throw new Error("Cannot unequip item");
        }
        itemsService.redistributeItems(data, this.bearer)
      }


      public validateEquipPossiblity(toSlot: IInventorySlot, fromSlot: IInventorySlot): boolean {
        if (!this.equipableTo.some(e => e.slotId === toSlot.id)) {
          return false;
        } 
        if (!this.associatedSlots.includes(fromSlot)) {
          return false;
        }
        const data = this._prepareEquipData(toSlot, fromSlot);
        return itemsService.validateRedistribution(data, this.bearer.inventorySlots);
      }

      
      private _prepareEquipData(toSlot: IInventorySlot, fromSlot: IInventorySlot) {
        const slotsToReserve = this.equipableTo.find(e => e.slotId === toSlot.id)?.reserveSlotId;
        if (!slotsToReserve) {
          throw new Error("Cannot find equipable declaration");
        }
        const itemsToUnequipForReservation = slotsToReserve.reduce((acc, id) => {
          const s = this.bearer.inventorySlots.find(s => s.id === id)
          return !!s ? acc.concat({ from: s, to: undefined, amount: s.stackSize }) : acc
        }, []);
        return !!toSlot.item ?
          itemsToUnequipForReservation.concat({ from: toSlot, to: undefined, amount: toSlot.stackSize }) :
          itemsToUnequipForReservation
      }


      private _getReservedSlots(): number[] {
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