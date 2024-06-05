import { IActivityResourceProvider, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IInventoryBearer } from "../../../items/entities/bearer/inventory-bearer.interface";

export interface IVendor extends IVendorDeclaration, IActivityResourceProvider, IInventoryBearer {

} 

export interface IVendorDeclaration extends IActivitySubjectDeclaration {
  isVendor: true
}