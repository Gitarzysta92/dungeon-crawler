import { ICardDeclaration, ICardsDeck, ICardsDeckDataFeed } from "./cards-deck.interface";
import { Constructor, Guid } from "../../extensions/types";
import { shuffleArray } from "../../../../../utils/src/randomizer";
import { IEntity, IEntityFactory } from "../../base/entity/entity.interface";
import { CardsDeck } from "./cards-deck";



export class CardsDeckFactory implements IEntityFactory<ICardsDeck> {

  get classDefinition() { return CardsDeck };

  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed
  ) { }

  createAsync?: (e: IEntity) => Promise<ICardsDeck>;
  validateAsync?: (e: IEntity) => Promise<boolean>;
  
  public create(e: ICardsDeck & IEntity): CardsDeck {
    return new CardsDeck(e);
  };

  public validate(e: IEntity & Partial<ICardsDeck>): boolean {
    return e.isCardsDeck;
  };

  public async build(config: ICardsDeck): Promise<ICardsDeck> {
    const cards = await this._dataFeed.getCards();
    const revealedCards = this._groupRevealedCards(config.revealedCardIds);
    let cardDeclarations = this._substractRevealedCardsFromCardDeclarations(revealedCards, config.cardDeclarations);
    if (!config.preventShuffleDeckOnInitialization) {
      cardDeclarations = this._shuffleDeckCardIds(revealedCards, cardDeclarations);
    }
    const deckCards = cardDeclarations.map(cd => cards.find(c => c.id === cd.cardId));
    if (deckCards.some(c => !c)) {
      throw new Error("Not all cards can be found during dungeon deck creation");
    }

    return Object.assign(config, { cardsInDeck: deckCards })
  }

  private _groupRevealedCards(revealedCardIds: Guid[]): { [key: Guid]: number } {
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

  private _substractRevealedCardsFromCardDeclarations(
    revealedCards: { [key: Guid]: number },
    cardDeclarations: ICardDeclaration[]
  ): ICardDeclaration[] {
    for (let it of cardDeclarations) {
      if (it.cardId in revealedCards) {
        it.amount -= revealedCards[it.cardId];
      }
    }
    return cardDeclarations;
  }

  private _shuffleDeckCardIds(
    revealedCards: { [key: Guid]: number },
    cardDeclarations: ICardDeclaration[]
  ): ICardDeclaration[] {
    return Object.entries(revealedCards)
      .map(rc => ({ cardId: rc[0], amount: rc[1] }))
      .concat(shuffleArray(cardDeclarations.flatMap(item => Array(item.amount).fill(item))))
  }
}