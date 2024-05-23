
import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";
import { IVendor } from "./vendor.interface";


export class VendorFactory implements IMixinFactory<IVendor> {

  constructor() { }

  public validate(e: IVendor): boolean {
    return e.isVendor;
  };

  public create(e: Constructor<IEntity & IActivityResourceProvider & IInventoryBearer>): Constructor<IVendor> {
    return class Vendor extends e implements IVendor {
      isVendor = true as const;
    }
  };
}