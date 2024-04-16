import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { IEntity } from "../../../../base/entity/entity.interface";
import { IVendor } from "./vendor.interface";
import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";


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