import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { SpawnActorAction } from "./aspects/actions/spawn-actor.action";
import { ActorFactory } from "./actor.factory";
import { IActorDataFeed } from "./actor.interface";
import { ActorsService } from "./actor.service";
import { DefeatableFactory } from "./defeatable/defeatable.factory";
import { ActorGatheringHandler } from "./aspects/gatherers/actor.gatherer";
import { SourceActorGatheringHandler } from "./aspects/gatherers/source-actor.gatherer";
import { ActorSelector } from "./aspects/selectors/actor.selector";


export class ActorModule {
  constructor(
    private readonly _dataFeed: IActorDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
  ) { }
  
  public initialize() {
    const actorSevice = new ActorsService(this._entityService);

    this._entityService.useFactories([
      new ActorFactory(this._dataFeed),
      new DefeatableFactory()
    ])

    this._gathererService.register(new ActorGatheringHandler(this._selectorService));
    this._gathererService.register(new SourceActorGatheringHandler(this._selectorService));
    //this._modifierService.register(new DefeatModifier());
    this._actionService.register(new SpawnActorAction(this._dataFeed, actorSevice))

    this._selectorService.register(new ActorSelector());

    return {
      actorSevice,
    }
  }
}