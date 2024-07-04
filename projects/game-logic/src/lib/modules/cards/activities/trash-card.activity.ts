import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../infrastructure/mixin/mixin.interface";
import { PLAY_CARD_ACTIVITY } from "../cards.constants";

export class TrashCardActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === PLAY_CARD_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class TrashCardActivity extends c implements IActivity {

      id = PLAY_CARD_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];

      @NotEnumerable()
      subject: IActivitySubject & IAbility;


      canBePerformed(bearer: IAbilityPerformer): boolean {
        //       if (effect.isAbility && !actor?.isAbleToUseAbility(effect as IAbility)) {
//         throw new Error();
        //       }
        return true;
      }

      perform(bearer: IAbilityPerformer): void {
        //       if (effect.isAbility) {
//         effect.calculateAbilityParameters()
//       }
      }
    }

    return TrashCardActivity;
  }
}