import { v4 } from "uuid";
import { ICardsDeck, ICardsDeckConfiguration, ICardsDeckConfigurationCardDeclaration, ICardsDeckDataFeed } from "./cards-deck.interface";
import { Guid } from "../../../extensions/types";
import { shuffleArray } from "../../../utils/utils";
import { ActorType } from "../actors.constants";



export class CardsDeckFactory {

  public static async buildCardsDeck(config: ICardsDeckConfiguration, dataFeed: ICardsDeckDataFeed): Promise<ICardsDeck> {
    const cards = await dataFeed.getCards();

    const revealedCards = this._groupRevealedCards(config.revealedCardIds);
    let cardDeclarations = this._substractRevealedCardsFromCardDeclarations(revealedCards, config.cardDeclarations);
    if (!config.preventShuffleDeckOnInitialization) {
      cardDeclarations = this._shuffleDeckCardIds(revealedCards, cardDeclarations);
    }
    const deckCards = cardDeclarations.map(cd => cards.find(c => c.id === cd.cardId));
    if (deckCards.some(c => !c)) {
      throw new Error("Not all cards can be found during dungeon deck creation");
    }

    return {
      id: v4(),
      actorType: ActorType.CardsDeck,
      sourceActorId: config.id,
      utilizedCards: [],
      cardsToUtilize: [],
      cardsInDeck: deckCards,
      drawPerTurn: config.drawPerTurn,
      lastingEffects: [],
      revealedCardIds: [],
    }
  }

  private static _groupRevealedCards(revealedCardIds: Guid[]): { [key: Guid]: number } {
    const revealedCards: { [key: string]: number } = {}
    for (let id of revealedCardIds) {
      if (id in revealedCards) {
        revealedCards[id] = 1;
      } else {
        revealedCards[id] += 1;
      }
    }
    return revealedCards;
  }

  private static _substractRevealedCardsFromCardDeclarations(
    revealedCards: { [key: Guid]: number },
    cardDeclarations: ICardsDeckConfigurationCardDeclaration[]
  ): ICardsDeckConfigurationCardDeclaration[] {
    for (let it of cardDeclarations) {
      if (it.cardId in revealedCards) {
        it.amount -= revealedCards[it.cardId];
      }
    }
    return cardDeclarations;
  }

  private static _shuffleDeckCardIds(
    revealedCards: { [key: Guid]: number },
    cardDeclarations: ICardsDeckConfigurationCardDeclaration[]
  ): ICardsDeckConfigurationCardDeclaration[] {
    return Object.entries(revealedCards)
      .map(rc => ({ cardId: rc[0], amount: rc[1] }))
      .concat(shuffleArray(cardDeclarations.flatMap(item => Array(item.amount).fill(item))))
  }
}