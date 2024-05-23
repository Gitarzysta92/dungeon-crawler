import { EntityService } from "../../infrastructure/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ModifyPositionActionHandler } from "./aspects/actions/apply-status.action";
import { AffectableFactory } from "./entities/affectable/affectable.factory";
import { StatusesService } from "./statuses.service";

export class StatusesModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const statusService = new StatusesService();

    this._entityService.useFactories([
      new AffectableFactory(),
    ]);

    this._actionService.register(new ModifyPositionActionHandler());

    return { statusService }
  }
}