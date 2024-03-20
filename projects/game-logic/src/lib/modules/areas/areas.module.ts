import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { TravelerFactory } from "./entities/occupier/occupier.factory";
import { IAreasDataFeed } from "./areas.interface";
import { AreaService } from "./areas.service";
import { ResidentFactory } from "./entities/resident/resident.factory";
import { AreaFactory } from "./entities/area/area.factory";
import { EventService } from "../../cross-cutting/event/event.service";
import { UnlockAreaAction } from "./aspects/actions/unlock-area.action";
import { InteractionsService } from "../../cross-cutting/interaction/interaction.service";
import { TravelInteractionHandler } from "./aspects/interactions/travel.interaction";


export class AreaModule {
  constructor(
    private readonly _dataFeed: IAreasDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _selectorService: SelectorService,
    private readonly _eventService: EventService,
    private readonly _interactionService: InteractionsService
  ) { }
  
  public initialize() {
    const areasService = new AreaService(this._entityService);

    this._entityService.useFactories([
      new TravelerFactory(areasService),
      new ResidentFactory(),
      new AreaFactory(this._eventService, areasService)
    ]);

    this._actionService.register(new UnlockAreaAction());
    this._interactionService.register(new TravelInteractionHandler())

    return {
      areasService
    }
  }
}