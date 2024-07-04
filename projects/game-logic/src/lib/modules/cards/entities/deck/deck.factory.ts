import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardsDeckDataFeed } from "../../cards.interface";
import { ICard } from "../card/card.interface";
import { ICardsPile } from "../cards-pile/cards-pile.interface";
import { CardsDeckCardPosition, CardsDeckStackType } from "./deck.constants";
import { IDeck, IDeckDeclaration } from "./deck.interface";



export class DeckFactory implements IMixinFactory<IDeck> {

  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed
  ) { }

  public validate(e: IDeck): boolean {
    return e.isCardsDeck;
  };

  public create(e: Constructor<IMixin>): Constructor<IDeck> {
    class Deck extends e implements IDeck {
      isCardsDeck = true as const;
      cards: ICard[];
      drawPile: ICardsPile;
      trashPile: ICardsPile;
      discardPile: ICardsPile;

      constructor(d: IDeckDeclaration) {
        super(d);
        this.drawPile = d.drawPile as ICardsPile;
        this.trashPile = d.trashPile as ICardsPile;
        this.discardPile = d.discardPile as ICardsPile;
      }

      public addCard(card: ICard, stackType: CardsDeckStackType, cardPosition: CardsDeckCardPosition): void {
     
      }
    
      public removeCard(card: ICard): void {
      
      }

    } 
    return Deck;
  }
}