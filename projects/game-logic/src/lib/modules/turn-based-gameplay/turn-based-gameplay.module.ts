

import { ActivityService } from "../../base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { FinishTurnActivityFactory } from "./activities/finish-turn.activity";
import { StartTurnActivityFactory } from "./activities/start-turn.activity";
import { FinishTurnActionHandler } from "./aspects/actions/finish-turn.action";
import { StartTurnActionHandler } from "./aspects/actions/start-turn.action";
import { TurnGameplayPlayerMixin } from "./mixins/turn-based-player/turn-based-player.mixin";


export class TurnBasedGameplayModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _eventService: EventService,
    private readonly _actionService: ActionService,
    private readonly _mixinService: MixinService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    const startTurnAction = new StartTurnActionHandler(this._eventService);
    const finishTurnAction = new FinishTurnActionHandler(this._eventService);

    this._actionService.register(finishTurnAction);

    this._entityService.useFactories([
      new TurnGameplayPlayerMixin()
    ]);

    this._activityService.useFactories([
      new FinishTurnActivityFactory(finishTurnAction),
      new StartTurnActivityFactory(startTurnAction)
    ])

    //this._actionService.register();
  }
}