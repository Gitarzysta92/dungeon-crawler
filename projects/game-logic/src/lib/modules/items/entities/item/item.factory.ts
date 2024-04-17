import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { Constructor, Guid } from "../../../../extensions/types";
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
      @NotEnumerable()
      public associatedInventory: IInventory;

      public slotIds: string[];
      @NotEnumerable()
      public get associatedSlots(): IInventorySlot[] { return this.slotIds.map(id => this.associatedInventory.getSlot({ slotId: id}))};
      public get amount(): number { return this.associatedSlots.reduce((acc, curr) => acc + curr.stackSize, 0) };

      public equipableTo:  Array<{ slotId: Guid, denyEquppingFor?: [{ slotId: Guid }] }>;
      public denyEquppingFor: [{ slotId: Guid }];
      public get isEquipped(): boolean { return this.associatedSlots.some(s => s.slotType === InventorySlotType.Equipment) };

      @NotEnumerable()
      public get associatedEquipmentSlot(): IInventorySlot { return this.associatedSlots.find(s => s.slotType === InventorySlotType.Equipment) };

      public isItem = true as const;
      public isEntity = true as const;
      public isMixin = true as const;

      constructor(d: IItemDeclaration & Partial<IDisposableItemDclaration> & Partial<IEquipableItemDeclaration> & Partial<IPossesedItemDeclaration>) {
        super(d)
        this.id = d.id;
        this.sourceItemId = d.sourceItemId;
        this.equipableTo = d.equipableTo;
        this.slotIds = d.slotIds ?? []
      }
  

      addSlot(slotId: string): void {
        if (!this.slotIds.includes(slotId)) {
          this.slotIds.push(slotId);
        }
      }

      removeSlot(slotId: string): void {
        const index = this.slotIds.indexOf(slotId);
        if (!!index) {
          this.slotIds.slice(index, 1);
        }
      }

      public validateEquipPossiblity(slot?: IInventorySlot): boolean { 
        const data = this._prepareEquipData(slot);
        if (!slot) {
          slot = this.equipableTo.map(e => this.associatedInventory.getSlot(e)).find(s => !!s);
        }
        if (!slot) {
          return false;
        }

        const equipDenials = this.associatedInventory.slots
          .filter(s => s.slotType === InventorySlotType.Equipment && (s.item as IEquipableItem).equipableTo.some(e => e.denyEquppingFor?.length > 0))
          .flatMap(s => (s.item as IEquipableItem).equipableTo
            .flatMap(e => e.denyEquppingFor.map(df => this.associatedInventory.getSlot({ slotId: df.slotId }))))
        
        if (equipDenials.some(d => d.id === slot.id)) {
          slot = undefined;
        }
        return this.associatedInventory.validateRedistribution(data) && !!slot;
      }


      public equip(slot?: IInventorySlot): void {
        if (!this.equipableTo ||
          !this.validateEquipPossiblity(slot)
        ) {
          return;
        }
        this.associatedInventory.redistributeItems(this._prepareEquipData(slot));
      }
      

      public unequip(): void {
        const data = [{ from: this.associatedEquipmentSlot, to: undefined, amount: this.associatedEquipmentSlot.stackSize }];
        if (this.associatedInventory.validateRedistribution(data)) {
          this.associatedInventory.redistributeItems(data);
        }
      }

      
      private _prepareEquipData(slot?: IInventorySlot) {
        if (!slot) {
          slot = this.equipableTo.map(e => this.associatedInventory.getSlot(e)).find(s => !!s);
        };
        const data = this.denyEquppingFor.map(d => this.associatedInventory
          .getSlot(Object.assign(d, { slotType: InventorySlotType.Equipment })))
          .map(s => ({ from: s, to: undefined, amount: s.stackSize }))
          .concat([{ from: this.associatedSlots.find(s => s.stackSize >= 1), to: slot, amount: 1 }]);
        
        if (!!slot.item) {
          data.push({ from: slot, to: undefined, amount: slot.stackSize })
        }
        return data;
      }
    }
    return Item;
  };
}