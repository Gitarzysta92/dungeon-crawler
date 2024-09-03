import { IDeckDeclaration } from "./entities/deck/deck.interface";
import { ICardOnPile } from "./entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer, IDeckBearerDeclaration } from "./entities/deck-bearer/deck-bearer.interface";

export class DeckBuilder {

  constructor() { }

  public static build(bearer: IDeckBearerDeclaration): IDeckBearer {
    for (let card of bearer.deck.selectedCards) {
      for (let i = 0; i < card.qunatity; i++) {
        const cop = {
          id: card.cardId,
          isRevealed: false as const,
          ref: null,
          isActivitySubject: true as const,
          isMixin: true as const,
          isCardOnPile: true as const,
          activities: []
        } as ICardOnPile
        bearer.drawPile.pile.push(cop)
      }
    }
    return bearer as any;
  }
}