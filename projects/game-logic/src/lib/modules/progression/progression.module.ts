import { EntityService } from "../../base/entity/entity.service"
import { EventService } from "../../base/event/event.service"
import { ActionService } from "../../cross-cutting/action/action.service"
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service"
import { ModifierService } from "../../cross-cutting/modifier/modifier.service"
import { SelectorService } from "../../cross-cutting/selector/selector.service"
import { ProgressionService } from "./progression.service"

export class ProgressionModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const progressionService = new ProgressionService()

    return { progressionService }
  }
}