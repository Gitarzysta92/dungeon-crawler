import { IActivityCost, IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ITEM_RESOURCE_TYPE } from "../../items.constants";
import { IInventory } from "../inventory/inventory.interface";
import { IItem } from "../item/item.interface";
import { IInventoryBearer, IInventoryBearerDeclaration } from "./inventory-bearer.interface";


export class InventoryBearerFactory implements IMixinFactory<IInventoryBearer> {

  constructor() { }

  public validate(e: IEntityDeclaration & Partial<IInventoryBearer>): boolean {
    return e.isInventoryBearer;
  };
  
  public create(bc: Constructor<IEntity & IActivityResourceProvider>): Constructor<IInventoryBearer> {
    return class InventoryBearer extends bc implements IInventoryBearer, IActivityResourceProvider {
      public isInventoryBearer = true as const;
      public inventory: IInventory;
    
      constructor(d: IInventoryBearerDeclaration) {
        super(d);
        this.inventory = d.inventory as IInventory;
      }

      public validateActivityResources(cs: IActivityCost[]): boolean {
        const isValid = cs.filter(c => c.resourceType === ITEM_RESOURCE_TYPE)
          .every(c => this.inventory.hasItem(c.resourceId, c.value));
        if (super.validateActivityResources) {
          return super.validateActivityResources(cs) && isValid;
        }
        return isValid;
      }

      public consumeActivityResources(cs: IActivityCost[]): void {
        for (let c of cs) {
          this.inventory.removeItem(c.resourceId, c.value);
        }
        if (super.consumeActivityResources) {
          super.consumeActivityResources(cs);
        }
      }

      public possessItem(item: IItem | Guid, amount: number): boolean {
        return this.inventory.hasItem(item, amount);
      }
    }
  };
}