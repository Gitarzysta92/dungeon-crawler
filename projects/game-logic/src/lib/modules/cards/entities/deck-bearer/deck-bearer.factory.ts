import { IActivityCost, IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { IPawn } from "../../../../base/pawn/pawn.interface";
import { ActionService } from "../../../../cross-cutting/action/action.service";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { DISCARD_ACTION, DiscardAction } from "../../aspects/actions/discard.action";
import { DRAW_CARDS_ACTION, DrawCardsAction } from "../../aspects/actions/draw-cards.action";
import { DiscardEvent, DISCARD_EVENT } from "../../aspects/events/discard.event";
import { DrawEvent, DRAW_EVENT } from "../../aspects/events/draw.event";
import { TrashEvent, TRASH_EVENT } from "../../aspects/events/trash.event";
import { ICard, ICardDeclaration } from "../card/card.interface";
import { ICardsPile } from "../cards-pile/cards-pile.interface";
import { IDeck } from "../deck/deck.interface";
import { IDeckBearer, IDeckBearerDeclaration } from "./deck-bearer.interface";


export class DeckBearerFactory implements IMixinFactory<IDeckBearer> {

  constructor(
    private readonly _eventService: EventService,
    private readonly _actionService: ActionService
  ) { }


  public static isDeckBearer(data: unknown): boolean {
    return (data as IDeckBearer).isDeckBearer; 
  }


  public static asDeckBearer<T>(data: T): T & IDeckBearer {
    if (!this.isDeckBearer(data)) {
      throw new Error("Provided data is not a DeckBearer");
    } 
    return data as T & IDeckBearer;
  }


  public isApplicable(e: IDeckBearer): boolean {
    return e.isDeckBearer;
  };


  public create(e: Constructor<IEntity & IPawn & IActivityDoer>): Constructor<IDeckBearer> {
    const actionService = this._actionService;
    const eventService = this._eventService;
    class DeckBearer extends e implements IDeckBearer {

      public entities: ICard[];
      public isDeckBearer = true as const;
      public deck: IDeck;
      public hand: ICardsPile;
      public drawPile: ICardsPile;
      public trashPile: ICardsPile;
      public discardPile: ICardsPile;
      public temporaryPile: ICardsPile;
      public drawSize: number;
      public get cards() { return this.getEntities<ICard>(c => c.isCard) }

      constructor(d: IDeckBearerDeclaration) {
        super(d);
        this.deck = d.deck as IDeck;
        this.hand = d.hand as ICardsPile;
        this.drawPile = d.drawPile as ICardsPile;
        this.trashPile = d.trashPile as ICardsPile;
        this.discardPile = d.discardPile as ICardsPile;
        this.temporaryPile = d.temporaryPile as ICardsPile;

      }

      public onInitialize(): void {
        this.drawPile.initializeCards(this.cards);
        this.drawPile.shuffle();
        this.hand.initializeCards(this.cards);
        this.trashPile.initializeCards(this.cards);
        this.discardPile.initializeCards(this.cards);
        this.temporaryPile.initializeCards(this.cards);
        for (let card of this.cards) {
          Object.defineProperty(card, 'bearer', {
            enumerable: false,
            value: this
          })
        }
        super.onInitialize && super.onInitialize();
      }
    
      public onDestroy(): void {
        super.onDestroy();
      }


      public addToCollection(card: ICard | ICardDeclaration, quantity: number): void {
        let collectedCard = this.getEntity<ICard>(c => c.isCard && c.id === card.id);
        if (!collectedCard) {
          collectedCard = this.createEntity<ICard>(card);
          this.registerEntity(collectedCard);
        }
        collectedCard.quantity += quantity;
      }

      public removeFromCollection(card: ICard, quantity: number): void {
        let collectedCard = this.getEntity<ICard>(c => c.isCard && c.id === card.id);
        if (!collectedCard) {
          throw new Error("Cannot remove card from collection. Given card not exists.")
        }
        if (collectedCard.quantity - quantity < 0) {
          throw new Error("Cannot remove cards from collection of given quantity.")
        }

        collectedCard.quantity -= quantity;

        if (collectedCard.quantity === 0) {
          this.unregisterEntity(collectedCard);
        }
      }


      public async drawCards(): Promise<void> {
        const d = { delegateId: DRAW_CARDS_ACTION, payload: { target: this, amount: this.drawSize  }}
        await actionService.makeAction(d, d.payload);
      }

      public async discardCards(): Promise<void> {
        if (this.hand.pile.length > 0) {
          const d = { delegateId: DISCARD_ACTION, payload: { target: this, amount: this.hand.pile.length } }
          await actionService.makeAction(d, d.payload);
        }
      }

      public onDiscarded(cb: (e: DiscardEvent) => void): void {
        return eventService.listenForEvent<DiscardEvent>(DISCARD_EVENT, e => {
          if (e.deckBearer === this) {
            cb(e)
          }
        })
      }

      public onTrashed(cb: (e: TrashEvent) => void): void {
        return eventService.listenForEvent<TrashEvent>(TRASH_EVENT, e => {
          if (e.deckBearer === this) {
            cb(e)
          }
        })
      }

      public onDraw(cb: (e: DrawEvent) => void): void {
        return eventService.listenForEvent<DrawEvent>(DRAW_EVENT, e => {
          if (e.deckBearer === this) {
            cb(e)
          }
        })
      }

      validateActivityResources(d: IActivityCost[]): boolean {
        if (super.validateActivityResources) {
          return super.validateActivityResources(d);
        }
        return true;
      }

      consumeActivityResources(d: IActivityCost[]): void {
        if (super.consumeActivityResources) {
          return super.consumeActivityResources(d);
        }
      }

    } 
    return DeckBearer;
  }
}