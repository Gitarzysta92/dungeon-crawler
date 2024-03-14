import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../extensions/types";
import { IAreasDataFeed } from "../../areas.interface";
import { IResident, IResidentDeclaration } from "./resident.interface";

export class ResidentFactory implements IEntityFactory<IResident> {

  constructor() { }
    
  public validate(e: IEntity & Partial<IResident>): boolean {
    return e.isResident;
  };

  public create(e: typeof Entity): Constructor<IResident> {
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