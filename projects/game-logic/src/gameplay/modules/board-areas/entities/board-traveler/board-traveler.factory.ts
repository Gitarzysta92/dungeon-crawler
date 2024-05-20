import { IActivityResourceProvider } from "../../../../../lib/base/activity/activity.interface";
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor, Guid } from "../../../../../lib/extensions/types";
import { IBoardObject } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { BoardAreaService } from "../../board-area.service";
import { IBoardTraveler, IBoardTravelerDeclaration } from "./board-traveler.interface";

export class BoardTravelerFactory implements IMixinFactory<IBoardTraveler> {

  constructor(
    private readonly _areasService: BoardAreaService
  ) { }
    
  public validate(e: IBoardTraveler): boolean {
    return e.isTraveler && e.isBoardObject;
  };

  public create(e: Constructor<IEntity & IActivityResourceProvider & IBoardObject>): Constructor<IBoardTraveler> {
    const areasService = this._areasService;
    return class Traveler extends e implements IBoardTraveler {
      
      public isTraveler = true as const;
      public occupiedAreaId: Guid;

      public get occupiedArea() { return areasService.getArea(a => a.id === this.occupiedAreaId) };

      constructor(d: IBoardTravelerDeclaration) {
        super(d);
        this.occupiedAreaId = d.occupiedAreaId;
      }

      public onInitialize(): void {
        areasService.unlockAreas(this.occupiedArea);
      }

      public travel(areaId: Guid): void {
        this.occupiedAreaId === areaId;
        areasService.unlockAreas(this.occupiedArea);
      }
    }
  };
}