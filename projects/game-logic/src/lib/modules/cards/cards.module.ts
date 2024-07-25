import { ActivityService } from "../../base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { DiscardCardActivityFactory } from "./activities/discard-card.acvivity";
import { PlayCardActivityFactory } from "./activities/play-card.activity";
import { TrashCardActivityFactory } from "./activities/trash-card.activity";
import { DiscardAction } from "./aspects/actions/discard.action";
import { DrawCardsAction } from "./aspects/actions/draw-cards.action";
import { TrashAction } from "./aspects/actions/trash.action";
import { ICardsDeckDataFeed } from "./cards.interface";
import { CardOnPileFactory } from "./entities/card-on-pile/card-on-pile.factory";
import { CardFactory } from "./entities/card/card.factory";
import { CardsPileFactory } from "./entities/cards-pile/cards-pile.factory";
import { DeckBearerFactory } from "./entities/deck-bearer/deck-bearer.factory";
import { DeckFactory } from "./entities/deck/deck.factory";

export class CardsModule {
  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _eventsService: EventService,
    private readonly _activityService: ActivityService,
    private readonly _mixinService: MixinService
  ) { }
  
  public initialize() {
    const trashAction = new TrashAction();
    const drawAction = new DrawCardsAction();
    const discardAction = new DiscardAction();


    this._activityService.useFactories([
      new PlayCardActivityFactory(),
      new TrashCardActivityFactory(trashAction),
      new DiscardCardActivityFactory(discardAction)
    ])

    this._actionService.register(trashAction);
    this._actionService.register(drawAction);
    this._actionService.register(discardAction);

    this._entityService.useFactories([
      new DeckBearerFactory(this._dataFeed),
      new DeckFactory(this._eventsService, drawAction, discardAction, this._mixinService),
      new CardsPileFactory(),
      new CardFactory(this._dataFeed),
      new CardOnPileFactory(this._mixinService)
    ])

    return { }
  }
}