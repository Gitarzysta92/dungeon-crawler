import { EntityLifecycle } from "../../../base/entity/entity.constants";
import { IDefeatable, IDefeater } from "./defeatable.interface";

export class Defeatable implements IDefeatable<[]> {
  id: string;
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;
  isDefeatable: true;
  isDefeated?: boolean;
  defeater?: IDefeater;

  constructor(data: IDefeatable<[]>) {
    Object.assign(this, data);
  }
}