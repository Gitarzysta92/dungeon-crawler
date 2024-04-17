import { IActivity, IActivityCost } from "../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../base/mixin/mixin.interface";
import { Constructor } from "../../../extensions/types";
import { StatisticsService } from "../../statistics/statistics.service";
import { CLAIM_REWARD_ACTIVITY } from "../rewards.constants";

export class ClaimRewardsActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === CLAIM_REWARD_ACTIVITY
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class StatisticsActivity extends c implements IActivity {

      id = CLAIM_REWARD_ACTIVITY
      cost?: IActivityCost[];
      isActivity = true as const;

      validate(bearer: any): boolean {
        return true;
      }
      perform(bearer: any, value: number): void {
      }
    }

    return StatisticsActivity;
  }
}