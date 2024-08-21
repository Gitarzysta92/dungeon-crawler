import { IDeckDeclaration } from "./entities/deck/deck.interface";
import { ICardOnPile } from "./entities/card-on-pile/card-on-pile.interface";

export class DeckBuilder {

  constructor() { }

  public static build(deck: IDeckDeclaration): IDeckDeclaration {
    // for (let card of deck.) {
    //   for (let i = 0; i < card.quantity; i++) {
    //     const cop = {
    //       id: card.id,
    //       isRevealed: false as const,
    //       ref: null,
    //       isActivitySubject: true as const,
    //       isMixin: true as const,
    //       isCardOnPile: true as const,
    //       activities: []
    //     } as ICardOnPile
    //     deck.drawPile.pile.push(cop)
    //   }
    // }
    return deck as any;
  }
}