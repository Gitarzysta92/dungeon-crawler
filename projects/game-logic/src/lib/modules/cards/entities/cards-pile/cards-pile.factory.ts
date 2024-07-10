import { generateRandomNumbersFromZeroTo } from "@utils/randomizer";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardOnPile, ICardsPile, ICardsPileDeclaration } from "./cards-pile.interface";
import { ICard } from "../card/card.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { IDeck } from "../deck/deck.interface";

export class CardsPileFactory implements IMixinFactory<ICardsPile> {

  constructor() { }

  public validate(e: ICardsPile): boolean {
    return e.isCardsPile;
  };

  public create(e: Constructor<IEntity>): Constructor<ICardsPile> {
    class CardsPile extends e implements ICardsPile {
      isCardsPile = true as const;
      pile: ICardOnPile[];

      public get size() { return this.pile.length }

      @NotEnumerable()
      public deck: WeakRef<IDeck>;

      constructor(d: ICardsPileDeclaration) {
        super(d);
        this.pile = d.pile;
      }
      
      public getCards(): ICard[] {
        return this.pile.map(c => this.deck.deref().cards.find(card => card.id === c.id));
      }
      
      public shuffle(): void {
        const randomNumbers = generateRandomNumbersFromZeroTo(this.pile.length);
        this.pile = randomNumbers.map(n => this.pile[n]);
      }


      public revealFromTop(amount: number): void {
        for (let i = 0; i < amount; i++) {
          this.pile[i].isRevealed = true;
        }
      }


      public revealAtPosition(index: number): void {
        this.pile[index].isRevealed = true;
      }


      public takeCard(c: ICardOnPile): void {
        c.isRevealed = false;
        this.pile.unshift(c);
      }


      public moveCards(to: ICardsPile, amount?: number): number {
        let moved = 0;
        amount = amount ?? this.pile.length
        for (let i = 0; i < amount; i++) {
          const card = this.pile.shift();
          if (card) {
            to.takeCard(card)
            moved++
          }
        }  
        return moved;
      }


      public moveCard(to: ICardsPile, card: ICardOnPile): void {
        const index = this.pile.indexOf(card);
        if (index == null) {
          throw new Error("Selected card does not exits on give pile");
        }
        this.pile.splice(index, 1);
        to.takeCard(card);
      }
      
    }
    return CardsPile;
  }
}