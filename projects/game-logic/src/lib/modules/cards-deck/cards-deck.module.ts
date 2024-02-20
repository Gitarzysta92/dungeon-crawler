import { CardsDeckFactory } from "./cards-deck.factory";

export class CardsDeckModule {
  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed,
    private readonly _gatherer: ICardsDeckGatherer,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
  ) { }
  
  public initialize() {

    this._entityService.useFactories([
      new CardsDeckFactory(this._dataFeed),
    ])

    this._gathererService.register(new ActorGatheringHandler(this._gatherer, this._selectorService));
    this._gathererService.register(new SourceActorGatheringHandler(this._gatherer, this._selectorService));
    //this._modifierService.register(new DefeatModifier());
    this._actionService.register(new SpawnActorAction(this._dataFeed, actorSevice))

    this._selectorService.register(new ActorSelector());

    return {
      actorSevice,
    }
  }
}