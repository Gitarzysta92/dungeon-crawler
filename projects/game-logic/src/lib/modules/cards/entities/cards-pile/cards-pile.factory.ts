import { generateRandomNumbersFromZeroTo } from "@utils/randomizer";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardOnPile, ICardsPile, ICardsPileDeclaration } from "./cards-pile.interface";

export class CardsPileFactory implements IMixinFactory<ICardsPile> {

  constructor() { }

  public validate(e: ICardsPile): boolean {
    return e.isCardsPile;
  };

  public create(e: Constructor<IEntity>): Constructor<ICardsPile> {
    class CardsPile extends e implements ICardsPile {
      isCardsPile = true as const;
      cards: ICardOnPile[];

      constructor(d: ICardsPileDeclaration) {
        super(d);
        this.cards = d.cards;
      }
      
      
      public shuffle(): void {
        const randomNumbers = generateRandomNumbersFromZeroTo(this.cards.length);
        this.cards = randomNumbers.map(n => this.cards[n]);
      }


      public revealFromTop(amount: number): void {
        for (let i = 0; i < amount; i++) {
          this.cards[i].isRevealed = true;
        }
      }


      public revealAtPosition(index: number): void {
        this.cards[index].isRevealed = true;
      }


      public takeCard(c: ICardOnPile): void {
        c.isRevealed = false;
        this.cards.unshift(c);
      }


      public moveCards(to: ICardsPile, amount?: number): number {
        let moved = 0
        for (let i = 0; i < amount ?? this.cards.length; i++) {
          const card = this.cards.shift();
          if (card) {
            to.takeCard(card)
            moved++
          }
        }  
        return moved;
      }


      public moveCard(to: ICardsPile, card: ICardOnPile): void {
        const index = this.cards.indexOf(card);
        if (index == null) {
          throw new Error("Selected card does not exits on give pile");
        }
        this.cards.splice(index, 1);
        to.takeCard(card);
      }
      
    }
    return CardsPile;
  }
}