import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { IMixinFactory, IMixin } from "../../../base/mixin/mixin.interface";
import { NotEnumerable } from "../../../extensions/object-traverser";
import { Constructor } from "../../../extensions/types";
import { IStatistic } from "../../statistics/entities/statistic/statistic.interface";
import { IPerkBearer } from "../entities/perk-bearer/perk-bearer.interface";
import { UNLOCK_PERK_ACTIVITY } from "../perk.constants";


export class UnlockPerkActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === UNLOCK_PERK_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class UnlockPerkActivity extends c implements IActivity {

      id = UNLOCK_PERK_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];
      statistic: IStatistic | undefined;

      @NotEnumerable()
      subject: IActivitySubject;;;


      canPerform(bearer: IPerkBearer): boolean {
        return false;
      }

      perform(bearer: IPerkBearer, value: number): void {

      }
    }

    return UnlockPerkActivity;
  }
}