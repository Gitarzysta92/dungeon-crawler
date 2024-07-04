import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../infrastructure/mixin/mixin.interface";
import { USE_ABILITY_ACTIVITY } from "../abilities.constants";
import { IAbility } from "../entities/ability/ability.interface";
import { IAbilityPerformer } from "../entities/performer/ability-performer.interface";

export class UseAbilityActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === USE_ABILITY_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class UseAbilityActivity extends c implements IActivity {

      id = USE_ABILITY_ACTIVITY;
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

    return UseAbilityActivity;
  }
}