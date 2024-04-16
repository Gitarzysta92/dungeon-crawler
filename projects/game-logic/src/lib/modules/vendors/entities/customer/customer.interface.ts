import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";

export interface ICustomer extends ICustomerDefinition, IActivityResourceProvider, IInventoryBearer {

} 

export interface ICustomerDefinition {
  isCustomer: true
}