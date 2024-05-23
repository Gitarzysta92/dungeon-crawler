
import { ActionService } from "../../cross-cutting/action/action.service";
import { ConditionService } from "../../cross-cutting/condition/condition.service";
import { ActivityService } from "../../base/activity/activity.service";
import { UnlockPerkAction } from "./aspects/actions/unlock-perk.action";
import { PerkUnlockedCondition } from "./aspects/conditions/perk-unlocked.condition";

import { PerkBearerFactory } from "./entities/perk-bearer/perk-bearer.factory";
import { UnlockPerkActivityFactory } from "./activities/unlock-perk.activity";
import { EntityService } from "../../base/entity/entity.service";


export class PerksModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _activityService: ActivityService,
    private readonly _conditionService: ConditionService
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new PerkBearerFactory(this._conditionService)
    ]);

    this._activityService.useFactories([new UnlockPerkActivityFactory()]);

    this._actionService.register(new UnlockPerkAction());
    this._conditionService.register(new PerkUnlockedCondition())

    return {};
  }
}