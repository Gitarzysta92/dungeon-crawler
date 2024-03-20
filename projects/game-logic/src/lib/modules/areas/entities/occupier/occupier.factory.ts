import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../extensions/types";
import { AreaService } from "../../areas.service";
import { ITraveler, ITravelerDeclaration } from "./occupier.interface";

export class TravelerFactory implements IEntityFactory<ITraveler> {

  constructor(
    private readonly _areasService: AreaService
  ) { }
    
  public validate(e: IEntity & Partial<ITraveler>): boolean {
    return e.isTraveler;
  };

  public create(e: typeof Entity): Constructor<ITraveler> {
    const areasService = this._areasService;
    return class AreaObject extends e implements ITraveler {
      
      isTraveler = true as const;
      occupiedAreaId: Guid;

      private _areasService: AreaService = areasService;

      constructor(d: ITravelerDeclaration) {
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