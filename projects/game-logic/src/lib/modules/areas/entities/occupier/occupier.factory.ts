import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../extensions/types";
import { AreaService } from "../../areas.service";
import { IAreaOccupier, IAreaOccupierDeclaration } from "./occupier.interface";

export class OccupierFactory implements IEntityFactory<IAreaOccupier> {

  constructor(
    private readonly _areasService: AreaService
  ) { }
    
  public validate(e: IEntity & Partial<IAreaOccupier>): boolean {
    return e.isOccupier;
  };

  public create(e: typeof Entity): Constructor<IAreaOccupier> {
    const areasService = this._areasService;
    return class AreaObject extends e implements IAreaOccupier {
      
      isOccupier = true as const;
      occupiedAreaId: Guid;

      private _areasService: AreaService = areasService;

      constructor(d: IAreaOccupierDeclaration) {
        super(d);
        this.occupiedAreaId = d.occupiedAreaId;
      }
    
      travel(areaId: Guid): void {
        const supplies = this._areasService.calculateTravel(this.occupiedAreaId, areaId);
        if (supplies > 0) {
          this.occupiedAreaId === areaId;
        }
     }
    }
  };
}