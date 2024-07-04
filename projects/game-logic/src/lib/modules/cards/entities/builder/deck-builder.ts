import { shuffleArray } from "@utils/randomizer";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { ICardsDeckDataFeed } from "../../cards.interface";
import { IDeck, ICardDeclaration, ICard } from "../deck/deck.interface";


export class DeckBuilderFactory implements IMixinFactory<IDeck> {

  constructor(
    private readonly _dataFeed: ICardsDeckDataFeed
  ) { }


  public validate(e: IEntity & Partial<IDeck> & any): boolean {
    return e.isCardsDeck;
  };


  public create(e: Constructor<IEntity>): Constructor<IDeck> {
    const dataFeed = this._dataFeed
    class Deck extends e implements IDeck {
      preventShuffleDeckOnInitialization: any;
      revealedCardIds: string[];
      isCardsDeck: true;
      drawPerTurn: number;
      cardDeclarations: ICardDeclaration[];
      cardsToUtilize?: ICard[];
      cardsInDeck?: ICard[];
      utilizedCards?: ICard[];
      public async build(config: IDeck): Promise<IDeck> {
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
    return Deck;
  };
}