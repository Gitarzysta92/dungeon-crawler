import { ActivityService } from "../../base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { TravelActivityFactory } from "./activities/travel/travel.activity";
import { AreaService } from "./areas.service";
import { UnlockAreaAction } from "./aspects/actions/unlock-area.action";
import { AreaFactory } from "./entities/area/area.factory";
import { ResidentFactory } from "./entities/resident/resident.factory";
import { TravelerFactory } from "./entities/traveler/traveler.factory";


export class AreasModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    const areasService = new AreaService(this._entityService);

    this._entityService.useFactories([
      new TravelerFactory(areasService),
      new ResidentFactory(),
      new AreaFactory(this._eventService, areasService)
    ]);

    this._activityService.useFactories([
      new TravelActivityFactory(areasService)
    ])

    this._actionService.register(new UnlockAreaAction());

    return {
      areasService
    }
  }
}