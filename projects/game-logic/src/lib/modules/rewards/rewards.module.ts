
import { EventService } from "../../cross-cutting/event/event.service"
import { ActionService } from "../../cross-cutting/action/action.service"
import { ModifierService } from "../../cross-cutting/modifier/modifier.service"
import { RewardService } from "./rewards.service"
import { RewarderFactory } from "./entities/rewarder/rewarder.factory"
import { ActivityService } from "../../base/activity/activity.service"
import { ClaimRewardsActivityFactory } from "./activities/claim-reward.activity"
import { EntityService } from "../../base/entity/entity.service"

export class RewardModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    const rewardsService = new RewardService(this._entityService);

    this._entityService.useFactories([
      new RewarderFactory(this._modifierService),
    ]);


    this._activityService.useFactories([new ClaimRewardsActivityFactory()]);

    return { rewardsService };
  }
}