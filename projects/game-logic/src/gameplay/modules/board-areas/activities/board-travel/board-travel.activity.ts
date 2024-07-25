import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { NotEnumerable } from "../../../../../lib/infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";

import { ICubeCoordinates } from "../../../../../lib/modules/board/board.interface";
import { TRAVEL_SUPPLIES_ID } from "../../../../data/common-identifiers.data";
import { BoardAreaService } from "../../board-area.service";
import { BOARD_TRAVEL_ACTIVITY } from "../../board-areas.constants";
import { IBoardArea } from "../../entities/board-area/board-area.interface";
import { IBoardTraveler } from "../../entities/board-traveler/board-traveler.interface";
import { IBoardTravelActivity } from "./board-travel.interface";


export class BoardTravelActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _boardAreaService: BoardAreaService
  ) { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === BOARD_TRAVEL_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    const boardAreaService = this._boardAreaService;
    class TravelActivity extends c implements IBoardTravelActivity {

      public id = BOARD_TRAVEL_ACTIVITY;
      get area(): IBoardArea | undefined { return this.subject as IBoardArea };
      public cost?: IActivityCost[];
      public isActivity = true as const;

      @NotEnumerable()
      public subject: IActivitySubject & IBoardArea;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.cost = d.cost ?? [];
      }

      public canBeDone(c: IBoardTraveler): boolean {
        if (!this.area) {
          //throw new Error();
          return false
        }

        if (c.occupiedArea.id === this.area.id) {
          return false;
          //throw new Error('You are already in given area');
        }

        if (!this.area.isUnlocked) {
          return false;
          //throw new Error('Your hero does not match access conditions for given area');
        }
   
        const connection = c.occupiedArea.hasConnection(this.area);
        if (!connection) {
          return false;
          //throw new Error('There is no connection to given area');
        }
        const cost = boardAreaService.calculateSummarizedTravelCost(c.occupiedArea, this.area);
        const activityCost = this.createActivityCost(cost);
        return c.validateActivityResources(activityCost);
      }


      public createActivityCost(value: number): IActivityCost[] {
        return this.cost.map(c => {
          if (c.resourceId !== TRAVEL_SUPPLIES_ID) {
            return c;
          }
          return Object.assign(c, { value: value })
        });
      }


      public async *doActivity(traveler: IBoardTraveler): AsyncGenerator<{ from: ICubeCoordinates, to: ICubeCoordinates }> {
        if (!this.canBeDone(traveler)) {
          throw new Error("Activity cannot be performed");
        }

        const connection = boardAreaService.getConnection(traveler.occupiedArea, this.area);
        for (let segment of connection.segments) {
          if (segment.isOrigin) {
            continue;
          }
          traveler.consumeActivityResources(this.createActivityCost(boardAreaService.calculateTravelCost(segment)));
          traveler.travel(segment);
          yield {
            from: this.area.position,
            to: segment.position
          };
        }
      }

    }

    return TravelActivity;
  }

}