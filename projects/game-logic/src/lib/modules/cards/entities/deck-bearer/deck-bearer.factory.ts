import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory, IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardsDeckDataFeed } from "../../cards.interface";
import { ICard } from "../card/card.interface";
import { ICardsPile } from "../cards-pile/cards-pile.interface";
import { IDeck } from "../deck/deck.interface";
import { IDeckBearer, IDeckBearerDeclaration } from "./deck-bearer.interface";



export class DeckBearerFactory implements IMixinFactory<IDeckBearer> {

  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed
  ) { }

  public validate(e: IDeckBearer): boolean {
    return e.isDeckBearer;
  };

  public create(e: Constructor<IMixin>): Constructor<IDeckBearer> {
    class DeckBearer extends e implements IDeckBearer {

      deck: IDeck;
      hand: ICardsPile;
      drawSize: number;
      isDeckBearer = true as const;
      cards: ICard[];

      constructor(d: IDeckBearerDeclaration) {
        super(d);
        this.hand = d.hand as ICardsPile;
        this.deck = d.deck as IDeck;
        this.drawSize = d.drawSize;
      }

    } 
    return DeckBearer;
  }
}