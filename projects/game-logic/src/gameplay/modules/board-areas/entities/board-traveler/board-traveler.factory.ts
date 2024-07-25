
import { IActivityDoer } from "../../../../../lib/base/activity/activity.interface";
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardAssignment, IBoardObject } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { CubeCoordsHelper } from "../../../../../lib/modules/board/helpers/coords.helper";
import { BoardAreaService } from "../../board-area.service";
import { IBoardAreaTravelSegment } from "../../board-areas.interface";
import { IBoardAreaResident } from "../board-resident/resident.interface";
import { IBoardTraveler, IBoardTravelerDeclaration } from "./board-traveler.interface";

export class BoardTravelerFactory implements IMixinFactory<IBoardTraveler> {

  constructor(
    private readonly _areasService: BoardAreaService
  ) { }
    
  public validate(e: IBoardTraveler): boolean {
    return e.isTraveler && e.isBoardObject;
  };

  public create(e: Constructor<IEntity & IActivityDoer & IBoardObject & IBoardAssignment>): Constructor<IBoardTraveler> {
    const areasService = this._areasService;
    return class Traveler extends e implements IBoardTraveler {
      
      public isTraveler = true as const;
      public get occupiedArea() { return areasService.getArea(a => CubeCoordsHelper.isCoordsEqual(a.position, this.position)) };

      constructor(d: IBoardTravelerDeclaration) {
        super(d);
      }

      public onInitialize(): void {
        areasService.unlockAreas(this.occupiedArea);
        super.onInitialize();
      }

      public travel(area: IBoardAreaTravelSegment): void {
        areasService.travel(this, area);
        areasService.unlockAreas(this.occupiedArea);
      }

      public isAdjanced(s: IBoardAssignment & IBoardAreaResident): boolean {
        if (s.position) {
          return super.isAdjanced(s);
        }

        if (!s.occupiedAreaId) {
          return false;
        }

        const nestedArea = areasService.getArea(a => a.id === s.occupiedAreaId);
        const rootArea = areasService.getRootArea(nestedArea);
        return super.isAdjanced(s) || rootArea.position ? CubeCoordsHelper.isCoordsEqual(rootArea.position, this.position) : false
      }
    }
  };
}