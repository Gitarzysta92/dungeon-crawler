
import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";
import { ICustomer } from "./customer.interface";

export class CustomerFactory implements IMixinFactory<ICustomer> {

  constructor() { }

  public validate(e: ICustomer): boolean {
    return e.isCustomer;
  };

  public create(e: Constructor<IEntity & IActivityResourceProvider & IInventoryBearer>): Constructor<ICustomer> {
    return class Customer extends e implements ICustomer {
      isCustomer = true as const;
      
    } 
  };
}