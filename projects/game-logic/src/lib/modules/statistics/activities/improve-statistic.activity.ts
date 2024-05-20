import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../base/mixin/mixin.interface";
import { NotEnumerable } from "../../../extensions/object-traverser";
import { Constructor } from "../../../extensions/types";
import { IStatisticBearer } from "../entities/bearer/statistic-bearer.interface";
import { IStatistic } from "../entities/statistic/statistic.interface";
import { IMPROVE_STATISTIC_ACTIVITY } from "../statistics.constants";
import { StatisticsService } from "../statistics.service";


export class ImproveStatisticActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _statisticService: StatisticsService
  ) { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === IMPROVE_STATISTIC_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class StatisticsActivity extends c implements IActivity {

      id = IMPROVE_STATISTIC_ACTIVITY;
      cost?: IActivityCost[];
      statistic: IStatistic | undefined;
      isActivity = true as const;

      @NotEnumerable()
      subject: IActivitySubject;;;


      canPerform(bearer: IStatisticBearer): boolean {
        return bearer.hasStatistic(this.statistic.id) && bearer.validateActivityResources(this.cost);
      }


      perform(bearer: IStatisticBearer, value: number): void {
        bearer.consumeActivityResources(this.cost);
        const statistic = bearer.getStatisticById(this.statistic.id);
        statistic.add(value);
      }

     
    }

    return StatisticsActivity;
  }

}