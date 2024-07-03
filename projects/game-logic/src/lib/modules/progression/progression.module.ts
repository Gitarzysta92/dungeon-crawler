import { EventService } from "../../cross-cutting/event/event.service"
import { ActionService } from "../../cross-cutting/action/action.service"
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service"
import { ModifierService } from "../../cross-cutting/modifier/modifier.service"
import { SelectorService } from "../../cross-cutting/selector/selector.service"
import { ProgressableFactory } from "./entities/progressable.factory"
import { GrantExperienceAction } from "./aspects/actions/grant-experience.action"
import { EntityService } from "../../base/entity/entity.service"

export class ProgressionModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
  
    this._entityService.useFactories([
      new ProgressableFactory(this._actionService, this._eventService)
    ]);

    this._actionService.register(new GrantExperienceAction())
  
  }
}