import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ConditionService } from "../../cross-cutting/condition/condition.service";
import { InteractionsService } from "../../cross-cutting/interaction/interaction.service";
import { UnlockPerkAction } from "./aspects/actions/unlock-perk.action";
import { PerkUnlockedCondition } from "./aspects/conditions/perk-unlocked.condition";
import { UnlockPerkInteractionHandler } from "./aspects/interactions/unlock-perk.interaction";
import { PerkBearerFactory } from "./entities/perk-bearer/perk-bearer.factory";


export class PerksModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _interactionService: InteractionsService,
    private readonly _conditionService: ConditionService
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new PerkBearerFactory(this._conditionService)
    ]);

    this._actionService.register(new UnlockPerkAction());
    this._interactionService.register(new UnlockPerkInteractionHandler());
    this._conditionService.register(new PerkUnlockedCondition())

    return {};
  }
}