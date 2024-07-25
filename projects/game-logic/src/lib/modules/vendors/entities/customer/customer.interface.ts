import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";

export interface ICustomer extends ICustomerDefinition, IActivityDoer, IInventoryBearer {

} 

export interface ICustomerDefinition {
  isCustomer: true
}