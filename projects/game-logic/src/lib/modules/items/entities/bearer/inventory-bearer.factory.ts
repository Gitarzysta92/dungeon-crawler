import { Entity } from "../../../../base/entity/entity";
import { IEntity, IEntityFactory } from "../../../../base/entity/entity.interface";
import { IInteractionCost, IInteractionResourceProvider } from "../../../../cross-cutting/interaction/interaction.interface";
import { Constructor } from "../../../../extensions/types";
import { IInventory } from "../inventory/inventory.interface";
import { IItem } from "../item/item.interface";
import { IInventoryBearer, IInventoryBearerDeclaration } from "./inventory-bearer.interface";


export class InventoryBearerFactory implements IEntityFactory<IInventoryBearer> {

  constructor() { }

  public validate(e: IEntity & Partial<IInventoryBearer>): boolean {
    return e.isInventoryBearer;
  };
  
  public create(bc: typeof Entity & Constructor<IInteractionResourceProvider>): Constructor<IInventoryBearer> {
    return class InventoryBearer extends bc implements IInventoryBearer {
      public isInventoryBearer: true;
      public inventory: IInventory;
    
      constructor(d: IInventoryBearerDeclaration) {
        super(d);
      }

      public validateInteractionResources(cs: IInteractionCost[]): boolean {
        let isValid = true;
        for (let c of cs) {
          isValid = this.inventory.hasItem(c.resourceId, c.value);
        }

        if (super.validateInteractionResources) {
          return super.validateInteractionResources(cs) && isValid;
        }
        return isValid;
      }

      public consumeInteractionResources(cs: IInteractionCost[]): void {
        for (let c of cs) {
          this.inventory.removeItem(c.resourceId, c.value);
        }
        if (super.consumeInteractionResources) {
          super.consumeInteractionResources(cs);
        }
      }

      public possessItem(item: IItem, amount: number): boolean {
        return this.inventory.hasItem(item, amount);
      }
    }
  };
}