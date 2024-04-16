import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor, Guid } from "../../../../extensions/types";
import { IResident, IResidentDeclaration } from "./resident.interface";

export class ResidentFactory implements IMixinFactory<IResident> {

  constructor() { }
    
  public validate(e: IEntityDeclaration & Partial<IResident>): boolean {
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