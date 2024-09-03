import { IEntity } from "../../../../base/entity/entity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICard } from "../card/card.interface";
import { IDeckBearer } from "../deck-bearer/deck-bearer.interface";
import { IDeck, IDeckDeclaration, ISelectedCardDeclaration } from "./deck.interface";



export class DeckFactory implements IMixinFactory<IDeck> {

  constructor() { }

  public isApplicable(e: IDeck): boolean {
    return e.isCardsDeck;
  };

  public create(e: Constructor<IEntity>): Constructor<IDeck> {
    class Deck extends e implements IDeck {
      public isCardsDeck = true as const;
      public drawSize: number;
      public selectedCards: ISelectedCardDeclaration[]

      @NotEnumerable()
      public bearer: WeakRef<IDeckBearer>;

      constructor(d: IDeckDeclaration) {
        super(d);
        this.drawSize = d.drawSize;
        this.selectedCards = d.selectedCards;
      }

      public hasCard(card: ICard): boolean {
        return this.selectedCards.some(s => s.cardId === card.id);
      }
      
      public addCard(card: ICard, quantity: number): void {
        const selectedCard = this.selectedCards.find(s => s.cardId === card.id)
        if (!selectedCard) {
          if (quantity > card.quantity) {
            throw new Error("Cannot add card, not enough quantity")
          }
          this.selectedCards.push({ cardId: card.id, qunatity: quantity });
        } else {
          if (selectedCard.qunatity + quantity > card.quantity) {
            throw new Error("Cannot add card, not enough quantity")
          }
          selectedCard.qunatity += quantity;
        }
      }
    
      public removeCard(card: ICard, quantity: number): void { 
        const selectedCard = this.selectedCards.find(s => s.cardId === card.id);
        if (!selectedCard) {
          throw new Error("Cannot remove card that is not selected");
        }
        if (selectedCard.qunatity - quantity < 0) {
          throw new Error("Cannot remove card. Selected card has not enough declared quantity to remove");
        }

        selectedCard.qunatity -= quantity;

        if (selectedCard.qunatity === 0) {
          this.selectedCards.splice(this.selectedCards.indexOf(selectedCard), 1);
        }
      }

    } 
    return Deck;
  }
}