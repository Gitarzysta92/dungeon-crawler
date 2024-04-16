import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor, Guid } from "../../../../extensions/types";
import { AreaService } from "../../areas.service";
import { ITraveler, ITravelerDeclaration } from "./traveler.interface";

export class TravelerFactory implements IMixinFactory<ITraveler> {

  constructor(
    private readonly _areasService: AreaService
  ) { }
    
  public validate(e: ITraveler): boolean {
    return e.isTraveler;
  };

  public create(e: Constructor<IEntity & IActivityResourceProvider>): Constructor<ITraveler> {
    const areasService = this._areasService;
    return class Traveler extends e implements ITraveler {
      
      public isTraveler = true as const;
      public occupiedAreaId: Guid;

      public get occupiedArea() { return this._areasService.getArea(a => a.id === this.occupiedAreaId) };

      private _areasService: AreaService = areasService;

      constructor(d: ITravelerDeclaration) {
        super(d);
        this.occupiedAreaId = d.occupiedAreaId;
      }

      public travel(areaId: Guid): void {
        this.occupiedAreaId === areaId;
      }
    }
  };
}