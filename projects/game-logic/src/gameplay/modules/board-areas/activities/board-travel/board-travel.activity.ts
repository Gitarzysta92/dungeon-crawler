import { IBoardTraveler } from "../../entities/board-traveler/board-traveler.interface";
import { BOARD_TRAVEL_ACTIVITY } from "../../board-areas.constants";
import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../../../lib/base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IArea } from "../../../../../lib/modules/areas/entities/area/area.interface";
import { BoardAreaService } from "../../board-area.service";
import { TRAVEL_SUPPLIES_ID } from "../../../../data/common-identifiers.data";
import { NotEnumerable } from "../../../../../lib/extensions/object-traverser";


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

      public id: string;
      get area(): IArea | undefined { return this.subject as IArea };
      public cost?: IActivityCost[];
      public isActivity = true as const;

      @NotEnumerable()
      public subject: IActivitySubject & IArea;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      public canPerform(c: IBoardTraveler): boolean {
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
        
        const connection = c.occupiedArea.hasConnection(this.area.id);
        if (!connection) {
          return false;
          //throw new Error('There is no connection to given area');
        }

        const cost = this.calculateCost(c.occupiedAreaId);
        return c.validateActivityResources(cost);
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
        this.canPerform(c);
        const cost = this.calculateCost(c.occupiedAreaId);
        c.consumeActivityResources(cost);
        c.travel(this.area.id)
      }
    }

    return TravelActivity;
  }

}