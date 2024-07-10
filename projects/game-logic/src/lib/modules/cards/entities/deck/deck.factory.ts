import { IEntity } from "../../../../base/entity/entity.interface";
import { IEvent } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { FINISH_TURN_EVENT } from "../../../turn-based-gameplay/aspects/events/finish-turn.event";
import { START_TURN_EVENT } from "../../../turn-based-gameplay/aspects/events/start-turn.event";
import { DiscardAction } from "../../aspects/actions/discard.action";
import { DrawCardsAction } from "../../aspects/actions/draw-cards.action";
import { ICard } from "../card/card.interface";
import { ICardsPile } from "../cards-pile/cards-pile.interface";
import { IDeckBearer } from "../deck-bearer/deck-bearer.interface";
import { CardsDeckCardPosition, CardsDeckStackType } from "./deck.constants";
import { IDeck, IDeckDeclaration } from "./deck.interface";



export class DeckFactory implements IMixinFactory<IDeck> {

  constructor(
    private readonly _eventService: EventService,
    private readonly _drawCardsAction: DrawCardsAction,
    private readonly _discardCardsAction: DiscardAction
  ) { }

  public validate(e: IDeck): boolean {
    return e.isCardsDeck;
  };

  public create(e: Constructor<IEntity>): Constructor<IDeck> {
    const eventService = this._eventService;
    const drawCardsAction = this._drawCardsAction;
    const discardAction = this._discardCardsAction;
    class Deck extends e implements IDeck {
      isCardsDeck = true as const;
      cards: ICard[];
      hand: ICardsPile;
      drawPile: ICardsPile;
      trashPile: ICardsPile;
      discardPile: ICardsPile;
      drawSize: number;

      @NotEnumerable()
      public bearer: WeakRef<IDeckBearer>;

      constructor(d: IDeckDeclaration) {
        super(d);
        this.hand = d.hand as ICardsPile;
        this.drawPile = d.drawPile as ICardsPile;
        this.trashPile = d.trashPile as ICardsPile;
        this.discardPile = d.discardPile as ICardsPile;
        this.drawSize = d.drawSize;
        this.cards = d.cards;
      }

      public onInitialize(): void {
        this._prepareDrawCards();
        this.drawPile.deck = new WeakRef(this);
        this.hand.deck = new WeakRef(this);
        this.trashPile.deck = new WeakRef(this);
        this.discardPile.deck = new WeakRef(this);
        eventService.listen(this._drawOnTriggerHandler);
        eventService.listen(this._discardOnTriggerHandler);
        if (super.onInitialize) {
          super.onInitialize();
        }
      }
    
      public onDestroy(): void {
        eventService.stopListening(this._drawOnTriggerHandler);
        eventService.stopListening(this._discardOnTriggerHandler);
        if (super.onDestroy) {
          super.onDestroy();
        }
      }

      public hasCard(card: ICard): boolean {
        return this.cards.some(c => c.id === card.id)
      }
      
      public addCard(card: ICard, stackType: CardsDeckStackType, cardPosition: CardsDeckCardPosition): void {
     
      }
    
      public removeCard(card: ICard): void {
      
      }

      private _prepareDrawCards() {
        this.drawPile.pile.length = 0;
        for (let card of this.cards) {
          for (let i = 0; i < card.quantity; i++) {
            this.drawPile.pile.push({ id: card.id, isRevealed: false })
          }
        }
        this.drawPile.shuffle();
      }

      private _drawOnTriggerHandler = (e: IEvent<unknown>) => {
        if (e.isApplicableTo({ delegateId: START_TURN_EVENT, payload: { playerId: this.bearer.deref().playerId } })) {
          drawCardsAction.process({ target: this.bearer.deref(), amount: 3 }, {})
        }
      };
      private _discardOnTriggerHandler = (e: IEvent<unknown>) => 
      {
        if (e.isApplicableTo({ delegateId: FINISH_TURN_EVENT, payload: { playerId: this.bearer.deref().playerId } })) {
          discardAction.process({target: this.bearer.deref(), amount: this.hand.pile.length }, {})
        }
      };

    } 
    return Deck;
  }
}