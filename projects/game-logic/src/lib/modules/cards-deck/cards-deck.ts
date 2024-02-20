
import { generateRandomNumbersFromZeroTo } from "../../../../../utils/src/randomizer";
import { EntityLifecycle } from "../../base/entity/entity.constants";
import { PlayerType } from "../../base/player/players.constants";
import { CardsDeckCardPosition, CardsDeckStackType } from "./cards-deck.constants";
import { ICardsDeck, ICard, ICardDeclaration } from "./cards-deck.interface";


export class CardsDeck implements ICardsDeck {
  id: string;
  playerType: PlayerType = PlayerType.Computer;
  revealedCardIds: string[];

  cardsToUtilize: ICard[];
  utilizedCards: ICard[];
  cardsInDeck: ICard[];
  get allCards(): ICard[] { 
    return [...this.cardsToUtilize, ...this.utilizedCards, ...this.cardsInDeck]
  }

  isCardsDeck: true;
  cardDeclarations: ICardDeclaration[];
  preventShuffleDeckOnInitialization: boolean;

  drawPerTurn: number;
  sourceActorId: string;

  constructor(data: ICardsDeck) {
    this.revealedCardIds = data.revealedCardIds;
    this.cardsToUtilize = data.cardsToUtilize;
    this.utilizedCards = data.utilizedCards;
    this.cardsInDeck = data.cardsInDeck;
    this.drawPerTurn = data.drawPerTurn;
  }
  lifecycle: EntityLifecycle;
  wasUsed?: boolean;
  toRemove?: boolean;
  isEntity: true;


  public addCard(card: ICard, stackType: CardsDeckStackType, cardPosition: CardsDeckCardPosition): void {
    if (cardPosition === CardsDeckCardPosition.Top) {
      this._selectStack(stackType).unshift(card);
    }

    if (cardPosition === CardsDeckCardPosition.Bottom) {
      this._selectStack(stackType).push(card);
    }
  }

  public removeCard(card: ICard): void {
    this.cardsToUtilize = this.cardsToUtilize.filter(c => c.id !== card.id);
    this.utilizedCards = this.utilizedCards.filter(c => c.id !== card.id);
    this.cardsInDeck = this.cardsInDeck.filter(c => c.id !== card.id);
    this.revealedCardIds = this.revealedCardIds.filter(id => id !== card.id);
  }

  public revealCard(card: ICard): void {
    if (!this.cardsInDeck.some(c => c.id === card.id)) {
      throw new Error("Dungeon deck: Cannot reveal card that is not in the deck stack")
    }
    this.revealedCardIds.push(card.id);
  }

  public revealAmountOfCards(amount: number): void {
    this.cardsInDeck.copyWithin(0, 0, amount).forEach(c => this.removeCard(c));
  }

  public moveCard(card: ICard, stackType: CardsDeckStackType, cardPosition: CardsDeckCardPosition): void {
    const stack = this._selectStack(stackType);
    const tempStack = stack.filter(c => c.id !== card.id);
    stack.length = 0;
    stack.push(...tempStack);
    this.addCard(card, stackType, cardPosition);
  }

  public takeCards(): void {
    if (this.cardsToUtilize.length > 0) {
      // TODO: Move this error to dungeon turn directive, and remove temporary solution
      //throw new Error("Not all cards was utilized in the previous turn")
      this.cardsToUtilize.forEach(c => this.addCardToUtilized(c));
    }

    if (this.cardsInDeck.length < this.drawPerTurn) {
      this.shuffleUtilizedTilesToDeck()
    }

    for (let i = 0; i < this.drawPerTurn; i++) {
      const card = this.cardsInDeck.shift();
      if (!!card) {
        this.cardsToUtilize.push(card);
      }
    }
  }

  public shuffleUtilizedTilesToDeck(): void {
    const randomNumbers = generateRandomNumbersFromZeroTo(this.utilizedCards.length + this.cardsInDeck.length)
    this.cardsInDeck = this.cardsInDeck.concat(this.utilizedCards);
    this.utilizedCards.length = 0;

    this.cardsInDeck = randomNumbers.map(n => this.cardsInDeck[n]!);
  }

  public addCardToUtilized(utilizedCard: ICard): void {
    const card = this.cardsToUtilize.find(c => c.id === utilizedCard.id);
    if (!card) {
      throw new Error("DungeonDeck: Given card is not available for utilization")
    }

    this.cardsToUtilize = this.cardsToUtilize.filter(c => c !== card);
    this.utilizedCards.push(card);
  }

  public isInStack(card: ICard, stackType: CardsDeckStackType): boolean {
    const stack = this._selectStack(stackType);
    return stack.some(s => s.id === card.id);
  }

  private _selectStack(stack: CardsDeckStackType): ICard[] {
    if (stack === CardsDeckStackType.CardsInDeck) {
      return this.cardsInDeck
    } else if (stack === CardsDeckStackType.CardsToUtilize) {
      return this.cardsToUtilize
    } else {
      return this.utilizedCards
    }
  }
}