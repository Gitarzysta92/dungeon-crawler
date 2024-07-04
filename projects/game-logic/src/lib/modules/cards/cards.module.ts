import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { DiscardAction } from "./aspects/actions/discard.action";
import { DrawCardsAction } from "./aspects/actions/draw-cards.action";
import { TrashAction } from "./aspects/actions/trash.action";
import { ICardsDeckDataFeed } from "./cards.interface";
import { CardFactory } from "./entities/card/card.factory";
import { CardsPileFactory } from "./entities/cards-pile/cards-pile.factory";
import { DeckBearerFactory } from "./entities/deck-bearer/deck-bearer.factory";
import { DeckFactory } from "./entities/deck/deck.factory";

export class CardsDeckModule {
  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
  ) { }
  
  public initialize() {
    this._entityService.useFactories([
      new DeckFactory(this._dataFeed),
    ])

    this._actionService.register(new DiscardAction());
    this._actionService.register(new DrawCardsAction());
    this._actionService.register(new TrashAction());

    this._entityService.useFactories([
      new DeckBearerFactory(this._dataFeed),
      new DeckBearerFactory(this._dataFeed),
      new CardsPileFactory(),
      new CardFactory(this._dataFeed)
    ])

    return { }
  }
}