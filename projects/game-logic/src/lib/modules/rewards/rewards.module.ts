import { EntityService } from "../../base/entity/entity.service"
import { EventService } from "../../cross-cutting/event/event.service"
import { ActionService } from "../../cross-cutting/action/action.service"
import { ModifierService } from "../../cross-cutting/modifier/modifier.service"
import { SelectorService } from "../../cross-cutting/selector/selector.service"
import { RewardService } from "./rewards.service"
import { RewardFactory } from "./entities/reward/reward.factory"
import { RewarderFactory } from "./entities/rewarder/rewarder.factory"
import { ClaimRewardInteractionHandler } from "./aspects/interaction/claim-reward.interaction"
import { ActivityService } from "../../base/activity/activity.service"

export class RewardModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _interactionService: ActivityService
  ) { }
  
  public initialize() {
    const rewardsService = new RewardService(this._entityService);

    this._entityService.useFactories([
      new RewarderFactory(this._modifierService),
      new RewardFactory(this._modifierService, this._actionService, this._eventService)
    ]);


    this._interactionService.register(new ClaimRewardInteractionHandler());

    return { rewardsService };
  }
}