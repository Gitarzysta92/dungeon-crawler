import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { SpawnActorAction } from "./aspects/actions/spawn-actor.action";
import { ActorFactory } from "./entities/actor/actor.factory";
import { IActorDataFeed } from "./actors.interface";
import { ActorsService } from "./actors.service";
import { DefeatableFactory } from "./entities/defeatable/defeatable.factory";
import { ActorGatheringHandler, IActorGatherer } from "./aspects/gatherers/actor.gatherer";
import { ISourceActorGatherer, SourceActorGatheringHandler } from "./aspects/gatherers/source-actor.gatherer";
import { ActorSelector } from "./aspects/selectors/actor.selector";
import { EventService } from "../../cross-cutting/event/event.service";


export class ActorModule {
  constructor(
    private readonly _dataFeed: IActorDataFeed,
    private readonly _dataGatherer: IActorGatherer & ISourceActorGatherer,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const actorSevice = new ActorsService(this._entityService, this._eventService);

    this._entityService.useFactories([
      new ActorFactory(this._dataFeed),
      new DefeatableFactory(this._entityService)
    ])

    this._gathererService.register(new ActorGatheringHandler(this._dataGatherer, this._selectorService));
    this._gathererService.register(new SourceActorGatheringHandler(this._dataGatherer, this._selectorService));
    //this._modifierService.register(new DefeatModifier());
    this._actionService.register(new SpawnActorAction(this._dataFeed, actorSevice))

    this._selectorService.register(new ActorSelector());

    return {
      actorSevice,
    }
  }
}