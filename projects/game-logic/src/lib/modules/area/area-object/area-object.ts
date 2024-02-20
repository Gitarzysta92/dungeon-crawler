import { EntityLifecycle } from "../../../base/entity/entity.constants";
import { IAreaObject } from "./area-object.interface";

export class AreaObject implements IAreaObject {
  isAreaObject: true;
  id: string;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
  occupiedAreaId: string;

  constructor(d: IAreaObject) {
    Object.assign(this, d);
  }

  shareAreaWith(vendor: any) {
    throw new Error("Method not implemented.");
  }
}