import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IResident, IResidentDeclaration } from "./resident.interface";

export class ResidentFactory implements IMixinFactory<IResident> {

  constructor() { }
    
  public isApplicable(e: IEntityDeclaration & Partial<IResident>): boolean {
    return e.isResident;
  };

  public create(e: Constructor<IEntity>): Constructor<IResident> {
    return class Resident extends e implements IResident {
      
      isResident = true as const;
      occupiedAreaId: Guid;

      constructor(d: IResidentDeclaration) {
        super(d);
        this.occupiedAreaId = d.occupiedAreaId;
      }

      public moveTo(areaId: Guid): void {
        this.occupiedAreaId = areaId;
      }
    }
  };
}