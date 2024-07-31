import { IActivityCost, IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { IPawn } from "../../../../base/pawn/pawn.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardsDeckDataFeed } from "../../cards.interface";
import { ICard } from "../card/card.interface";
import { IDeck } from "../deck/deck.interface";
import { IDeckBearer, IDeckBearerDeclaration } from "./deck-bearer.interface";



export class DeckBearerFactory implements IMixinFactory<IDeckBearer> {

  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed
  ) { }


  public static isDeckBearer(data: unknown): boolean {
    return (data as IDeckBearer).isDeckBearer; 
  }


  public static asDeckBearer<T>(data: T): T & IDeckBearer {
    if (!this.isDeckBearer(data)) {
      throw new Error("Provided data is not a SceneMedium");
    } 
    return data as T & IDeckBearer;
  }


  public isApplicable(e: IDeckBearer): boolean {
    return e.isDeckBearer;
  };


  public create(e: Constructor<IEntity & IPawn & IActivityDoer>): Constructor<IDeckBearer> {
    class DeckBearer extends e implements IDeckBearer {

      deck: IDeck;
      isDeckBearer = true as const;
      cards: ICard[];

      constructor(d: IDeckBearerDeclaration) {
        super(d);
        this.deck = d.deck as IDeck;
        this.cards = d.cards;
      }

      public onInitialize(): void {
        this.deck.bearer = new WeakRef(this);
        super.onInitialize && super.onInitialize();
      }
    
      public onDestroy(): void {
        super.onDestroy();
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