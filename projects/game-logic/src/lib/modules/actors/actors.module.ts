
import { ActionService } from "../../cross-cutting/action/action.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { SpawnActorAction } from "./aspects/actions/spawn-actor.action";
import { ActorFactory } from "./entities/actor/actor.factory";
import { IActorDataFeed } from "./actors.interface";
import { ActorsService } from "./actors.service";
import { DefeatableFactory } from "./entities/defeatable/defeatable.factory";
import { ActorSelector } from "./aspects/selectors/actor.selector";
import { EventService } from "../../cross-cutting/event/event.service";
import { EntityService } from "../../base/entity/entity.service";
import { DefeatableIndicatorFactory } from "./entities/defeat-indicator/defeat-indicator.factory";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering.service";
import { ActorDataProvider } from "./aspects/gathering/actor.data-provider";


export class ActorModule {
  constructor(
    private readonly _dataFeed: IActorDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _eventService: EventService,
    private readonly _gatheringService: DataGatheringService
  ) { }
  
  public initialize() {
    const actorSevice = new ActorsService(this._entityService, this._eventService);

    this._entityService.useFactories([
      new ActorFactory(this._dataFeed),
      new DefeatableFactory(this._entityService),
      new DefeatableIndicatorFactory(this._entityService)
    ])

    this._actionService.register(new SpawnActorAction(this._dataFeed, actorSevice))
    this._selectorService.register(new ActorSelector());
    this._gatheringService.registerProvider(new ActorDataProvider(this._selectorService,actorSevice))

    return {
      actorSevice,
    }
  }
}