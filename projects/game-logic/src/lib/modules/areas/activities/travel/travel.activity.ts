import { IActivity, IActivityCost, IActivityDeclaration } from "../../../../base/activity/activity.interface";
import { IMixin, IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { AreaService } from "../../areas.service";
import { IArea } from "../../entities/area/area.interface";
import { ITraveler } from "../../entities/traveler/traveler.interface";
import { TRAVEL_ACTIVITY } from "../../areas.constants";
import { IConnection } from "../../areas.interface";


export class TravelActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _areaService: AreaService
  ) { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === TRAVEL_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
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

      public validate(c: ITraveler): boolean {
        if (!this.area) {
          throw new Error();
        }

        if (c.occupiedArea.id === this.area.id) {
          throw new Error('You are already in given area');
        }

        if (!this.area.isUnlocked) {
          throw new Error('Your hero does not matching access conditions for given area');
        }
        
        const connection = c.occupiedArea.getConnection(this.area.id);
        if (!connection) {
          throw new Error('There is no connection to given area');
        }

        const cost = this.calculateCost(connection);

        c.validateActivityResources(cost);
        return true;
      }


      public calculateCost(con: IConnection): IActivityCost[] {
        return this.cost.map(c => Object.assign({ ...c }, { value: c.value * con.totalDistance }));
      }


      public perform(c: ITraveler) {
        this.validate(c);
        const connection = c.occupiedArea.getConnection(this.area.id);
        const cost = this.calculateCost(connection);
        c.consumeActivityResources(cost);
        c.travel(this.area.id)
      }
    }

    return TravelActivity;
  }

}