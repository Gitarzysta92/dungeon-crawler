import { ActivityService } from "../../base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ConditionService } from "../../cross-cutting/condition/condition.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { DealDamageActionHandler } from "./aspects/actions/deal-damage.action";
import { DealDamageModifierFactory } from "./aspects/modifiers/deal-damage.modifier";
import { DamageParameterFactory } from "./aspects/parameters/damage.parameter";
import { CombatStatisticFactory } from "./entities/combat-statistic/combat-statistic.factory";
import { DamageDealerFactory } from "./entities/damage-dealer/damage-dealer.factory";
import { DamageReciverFactory } from "./entities/damage-reciver/damage-reciver.factory";
import { DefeatableFactory } from "./entities/defeatable/defeatable.factory";

export class CombatModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService,
    private readonly _mixinService: MixinService,
    private readonly _conditionService: ConditionService
  ) { }
  
  public initialize() {

    this._mixinService.useFactories([
      new DamageParameterFactory(),
      new DealDamageModifierFactory()
    ]);

    this._entityService.useFactories([
      new DamageDealerFactory(),
      new DamageReciverFactory(),
      new DefeatableFactory(this._conditionService),
      new CombatStatisticFactory()
    ]);

    this._actionService.register(new DealDamageActionHandler(this._eventService))
  }
}