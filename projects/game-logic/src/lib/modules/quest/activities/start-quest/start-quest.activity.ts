import { IActivity, IActivityCost } from "../../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { CLAIM_REWARD_ACTIVITY } from "../../../rewards/rewards.constants";
import { START_QUEST_ACTIVITY } from "../../quest.constants";


export class StartQuestActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === START_QUEST_ACTIVITY
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class StartQuestActivity extends c implements IActivity {

      id = CLAIM_REWARD_ACTIVITY
      cost?: IActivityCost[];
      isActivity = true as const;

      validate(bearer: any): boolean {
        return true;
      }
      perform(bearer: any, value: number): void {
      }
    }

    return StartQuestActivity;
  }
}