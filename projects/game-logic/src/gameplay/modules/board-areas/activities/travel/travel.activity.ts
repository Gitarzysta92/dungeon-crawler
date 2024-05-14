import { IBoardTraveler } from "../../entities/board-traveler/board-traveler.interface";
import { BOARD_TRAVEL_ACTIVITY } from "../../board-areas.constants";
import { IActivity, IActivityCost, IActivityDeclaration } from "../../../../../lib/base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IArea } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { BoardAreaService } from "../../board-area.service";
import { TRAVEL_SUPPLIES_ID } from "../../../../data/common-identifiers.data";


export class BoardTravelActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _boardAreaService: BoardAreaService
  ) { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === BOARD_TRAVEL_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    const boardAreaService = this._boardAreaService;
    class TravelActivity extends c implements IActivity {

      id: string;
      area: IArea | undefined;
      cost?: IActivityCost[];
      isActivity = true as const;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      public validate(c: IBoardTraveler): boolean {
        if (!this.area) {
          throw new Error();
        }

        if (c.occupiedArea.id === this.area.id) {
          throw new Error('You are already in given area');
        }

        if (!this.area.isUnlocked) {
          throw new Error('Your hero does not matching access conditions for given area');
        }
        
        const connection = c.occupiedArea.hasConnection(this.area.id);
        if (!connection) {
          throw new Error('There is no connection to given area');
        }

        const cost = this.calculateCost(c.occupiedAreaId);
        c.validateActivityResources(cost);
        return true;
      }


      public calculateCost(fromId: string): IActivityCost[] {
        return this.cost.map(c => {
          if (c.resourceId !== TRAVEL_SUPPLIES_ID) {
            return c;
          }
          return Object.assign(c, { value: boardAreaService.calculateTravel(fromId, this.area.id) })
        });
      }


      public perform(c: IBoardTraveler) {
        this.validate(c);
        const cost = this.calculateCost(c.occupiedAreaId);
        c.consumeActivityResources(cost);
        c.travel(this.area.id)
      }
    }

    return TravelActivity;
  }

}