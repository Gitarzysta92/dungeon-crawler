import { IActivityCost, IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ITEM_RESOURCE_TYPE } from "../../items.constants";
import { IEquipableItem, IItem, IPossesedItem } from "../item/item.interface";
import { IInventoryBearer, IInventoryBearerDeclaration } from "./inventory-bearer.interface";
import { IInventorySlot } from "../../mixins/inventory-slot/inventory-slot.interface";
import { InventorySlotType } from "../../mixins/inventory-slot/inventory-slot.constants";
import { ItemsService } from "../../items.service";
import { IRedistributionDeclaration } from "../../items.interface";


export class InventoryBearerFactory implements IMixinFactory<IInventoryBearer> {

  constructor(
    private readonly _itemService: ItemsService
  ) { }

  public isApplicable(e: IEntityDeclaration & Partial<IInventoryBearer>): boolean {
    return e.isInventoryBearer;
  };
  
  public create(bc: Constructor<IEntity & IActivityDoer>): Constructor<IInventoryBearer> {
    const itemsService = this._itemService;
    return class InventoryBearer extends bc implements IInventoryBearer, IActivityDoer {
      public isInventoryBearer = true as const;
      public inventorySlots: IInventorySlot[] = [];
      public get items() { return this.getEntities<IPossesedItem>(e => e.isItem) }
    
      constructor(d: IInventoryBearerDeclaration) {
        super(d);
        this.inventorySlots = d.inventorySlots as IInventorySlot[];
      }

      onInitialize(): void {
        for (let item of this.items) {
          item.setBearer(this);
          for (let slotId of item.associatedSlotIds) {
            const associatedSlot = this.inventorySlots.find(s => s.id === slotId);
            if (!!associatedSlot) {
              Object.defineProperty(associatedSlot, 'item', {
                value: item,
                enumerable: false
              })
            }
          }
        }
        if (super.onInitialize) {
          super.onInitialize();
        }
      }


      public validateActivityResources(cs: IActivityCost[]): boolean {
        const isValid = cs.filter(c => c.resourceType === ITEM_RESOURCE_TYPE)
          .every(c => this.possessItem(c.resourceId, c.value));
        if (super.validateActivityResources) {
          return super.validateActivityResources(cs) && isValid;
        }
        return isValid;
      }


      public consumeActivityResources(cs: IActivityCost[]): void {
        for (let c of cs.filter(c => c.resourceType === ITEM_RESOURCE_TYPE)) {
          this.removeItem(c.resourceId, c.value);
        }
        if (super.consumeActivityResources) {
          super.consumeActivityResources(cs);
        }
      }


      public possessItem(itemId: Guid, amount: number): boolean {
        return this.getEntities<IPossesedItem>(e => e.id === itemId && (amount ?? 0) < e.quantity).length > 0;
      }
    
    
      public getItem(itemId: Guid): IPossesedItem | undefined {
        return this.getEntity<IPossesedItem>(e => e.id === itemId);
      }
      

      public getEquippedItems(): IEquipableItem[] {
        const equipmentSlots = this.inventorySlots.filter(s => s.slotType === InventorySlotType.Equipment);
        return this.getEntities<IEquipableItem>(e => equipmentSlots.some(s => e.associatedSlotIds.includes(s.id)))
      }


      public addItem(i: IItem, amount: number, slot?: IInventorySlot): void {
        let item: IItem;
        if (typeof item === 'string') {
          item = this.getItem(item);
        } else {
          item = i as IItem;
        }
    
        if (!slot) {
          slot = this._trySelectSlot(this.inventorySlots, item, amount, slot);
        }
    
        if (!slot) {
          throw new Error("One of the provided slots not exists in given inventory or it is already occupied.");
        }
        const overflow = slot.addItem(amount, item);
        (item as IPossesedItem).setBearer(this);
        if (overflow > 0) {
          this.addItem(item, overflow);
        }
      }
    
    
      public removeItem(itemId: Guid, amount: number): void {
        const slot = this.inventorySlots.find(s => s.item?.id === itemId);
        slot.removeItem(amount);
      }

      public redistributeItems(defs: Array<IRedistributionDeclaration>): void {
        itemsService.redistributeItems(defs, this);
      }

      public validateRedistribution(defs: Array<IRedistributionDeclaration>): boolean {
        return itemsService.validateRedistribution(defs, this.inventorySlots);
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
  };
}