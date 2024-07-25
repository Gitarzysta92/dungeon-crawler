import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { IProcedure, IProcedureExecutionStatus } from "../../../base/procedure/procedure.interface";
import { IGatheringController } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { USE_ABILITY_ACTIVITY } from "../abilities.constants";
import { IAbility } from "../entities/ability/ability.interface";
import { IAbilityPerformer } from "../entities/performer/ability-performer.interface";

export interface IUseAbilityActivity extends IActivity {
  id: typeof USE_ABILITY_ACTIVITY;
  subject: IActivitySubject & IAbility;
  doActivity(
    bearer: IAbilityPerformer,
    controller: IGatheringController
  ): AsyncGenerator<IProcedureExecutionStatus<unknown, unknown>>
}


export class UseAbilityActivityFactory implements IMixinFactory<IUseAbilityActivity> {

  constructor() { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === USE_ABILITY_ACTIVITY;
  }

  public create(c: Constructor<IProcedure>): Constructor<IUseAbilityActivity> {
    class UseAbilityActivity extends c implements IUseAbilityActivity {

      id = USE_ABILITY_ACTIVITY;
      isActivity = true as const;
      cost?: IActivityCost[];

      @NotEnumerable()
      subject: IActivitySubject & IAbility;

      public canBeDone(bearer: IAbilityPerformer): boolean {
        return bearer.abilities.some(a => a.id === this.subject.id);
      }

      public async *doActivity(
        performer: IAbilityPerformer,
        controller: IGatheringController
      ): AsyncGenerator<IProcedureExecutionStatus<unknown, unknown>>{
        if (!this.canBeDone(performer)) {
          throw new Error("UseAbility cannot be performed");
        }
        const data = Object.assign({ performer, subject: this.subject }, this);
        for await (let result of this.perform({ controller, data: data })) {
          yield result;
        }   
      }
    }

    return UseAbilityActivity;
  }
}