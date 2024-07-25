import { IEntity } from "../../../../base/entity/entity.interface";
import { IEvent } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { MixinService } from "../../../../infrastructure/mixin/mixin.service";
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
    private readonly _discardCardsAction: DiscardAction,
    private readonly _mixinFactory: MixinService,
  ) { }

  public isApplicable(e: IDeck): boolean {
    return e.isCardsDeck;
  };

  public create(e: Constructor<IEntity>): Constructor<IDeck> {
    const eventService = this._eventService;
    const drawCardsAction = this._drawCardsAction;
    const discardAction = this._discardCardsAction;
    const mixinFactory = this._mixinFactory;
    class Deck extends e implements IDeck {
      public isCardsDeck = true as const;
      public cards: ICard[];
      public hand: ICardsPile;
      public drawPile: ICardsPile;
      public trashPile: ICardsPile;
      public discardPile: ICardsPile;
      public drawSize: number;
      public isPrepared: boolean = false;

      @NotEnumerable()
      public bearer: WeakRef<IDeckBearer>;

      constructor(d: IDeckDeclaration) {
        super(d);
        this.hand = d.hand as ICardsPile;
        this.drawPile = d.drawPile as ICardsPile;
        this.trashPile = d.trashPile as ICardsPile;
        this.discardPile = d.discardPile as ICardsPile;
        this.drawSize = d.drawSize;
        this.cards = d.cards as ICard[];
        this.isPrepared = d.isPrepared;
      }

      public onInitialize(): void {
        this.drawPile.deck = new WeakRef(this);
        this.drawPile.initializeCards(this.cards);
        this.drawPile.shuffle();
        this.hand.deck = new WeakRef(this);
        this.hand.initializeCards(this.cards);
        this.trashPile.deck = new WeakRef(this);
        this.trashPile.initializeCards(this.cards);
        this.discardPile.deck = new WeakRef(this);
        this.discardPile.initializeCards(this.cards);
        eventService.listen(this._drawOnTriggerHandler);
        eventService.listen(this._discardOnTriggerHandler);

        for (let card of this.cards) {
          Object.defineProperty(card, 'deck', {
            value: this,
            enumerable: false
          })
        }

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

      private _drawOnTriggerHandler = async (e: IEvent<unknown>) => {
        const bearer = this.bearer.deref();
        if (e.isApplicableTo({ delegateId: START_TURN_EVENT, payload: { playerId: bearer.playerId } }) && !bearer.drewCards) {
          await drawCardsAction.process({ target: bearer, amount: 3 });
          bearer.drewCards = true;
        }
      };

      private _discardOnTriggerHandler = (e: IEvent<unknown>) => {
        const bearer = this.bearer.deref();
        if (e.isApplicableTo({ delegateId: FINISH_TURN_EVENT, payload: { playerId: bearer.playerId } })) {
          discardAction.process({ target: bearer, amount: this.hand.pile.length });
          bearer.drewCards = false;
        }
      };

    } 
    return Deck;
  }
}