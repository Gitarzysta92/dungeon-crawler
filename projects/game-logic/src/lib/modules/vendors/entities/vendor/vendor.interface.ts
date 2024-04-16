import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";

export interface IVendor extends IVendorDefinition, IActivityResourceProvider, IInventoryBearer {

} 

export interface IVendorDefinition {
  isVendor: true
}