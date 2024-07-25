
import { IActivity, IActivityCost, IActivityDoer } from "../../../../base/activity/activity.interface"
import { IEntity } from "../../../../base/entity/entity.interface";
import { IPawn } from "../../../../base/pawn/pawn.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { AreaService } from "../../areas.service";
import { ITraveler, ITravelerDeclaration } from "./traveler.interface";

export class TravelerFactory implements IMixinFactory<ITraveler> {

  constructor(
    private readonly _areasService: AreaService
  ) { }
    
  public isApplicable(e: ITraveler): boolean {
    return e.isTraveler;
  };

  public create(e: Constructor<IPawn & IActivityDoer>): Constructor<ITraveler> {
    const areasService = this._areasService;
    return class Traveler extends e implements ITraveler {
      
      public playerId: string;
      public isTraveler = true as const;
      public occupiedAreaId: Guid;

      public get occupiedArea() { return areasService.getArea(a => a.id === this.occupiedAreaId) };

      constructor(d: ITravelerDeclaration) {
        super(d);
        this.occupiedAreaId = d.occupiedAreaId;
      }

      public travel(areaId: Guid): void {
        this.occupiedAreaId === areaId;
      }

      public consumeActivityResources(d: IActivityCost[]): void {
        if (super.consumeActivityResources) {
          super.consumeActivityResources(d);
        }
      }
    }
  };
}