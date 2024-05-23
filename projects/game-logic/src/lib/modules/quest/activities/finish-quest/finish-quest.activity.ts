import { IActivity, IActivityCost, IActivitySubject } from "../../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { CLAIM_REWARD_ACTIVITY } from "../../../rewards/rewards.constants";
import { FINISH_QUEST_ACTIVITY } from "../../quest.constants";


export class FinishQuestActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === FINISH_QUEST_ACTIVITY
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class FinishQuestActivity extends c implements IActivity {

      id = CLAIM_REWARD_ACTIVITY
      cost?: IActivityCost[];
      isActivity = true as const;

      @NotEnumerable()
      subject: IActivitySubject;;


      canPerform(bearer: any): boolean {
        return true;
      }
      perform(bearer: any, value: number): void {
      }
    }

    return FinishQuestActivity;
  }
}