import { generateRandomNumbersFromZeroTo } from "../../utils/utils";
import { ActorType } from "../actors/actors.constants";
import { IEffectBase } from "../effects/effects.interface";
import { DungeonDeckCardPosition, DungeonDeckStackType } from "./dungeon-deck.constants";
import { IDungeonDeck, IDungeonCard } from "./dungeon-deck.interface";


export class DungeonDeck implements IDungeonDeck {
  id: string;
  cardsToUtilize: IDungeonCard<unknown>[];
  utilizedCards: IDungeonCard<unknown>[];
  cardsInDeck: IDungeonCard<unknown>[];
  actorType: ActorType.DungeonDeck = ActorType.DungeonDeck;
  groupId: string;
  drawPerTurn: number;
  effects: IEffectBase[];

  constructor(data: Omit<IDungeonDeck, 'actorType'>) {
    this.id = data.id;
    this.cardsToUtilize = data.cardsToUtilize;
    this.utilizedCards = data.utilizedCards;
    this.cardsInDeck = data.cardsInDeck;
    this.groupId = data.groupId!;
    this.drawPerTurn = data.drawPerTurn;
    this.effects = data.effects;
  }

  public addCard(card: IDungeonCard<unknown>, stackType: DungeonDeckStackType, cardPosition: DungeonDeckCardPosition): void {
    if (cardPosition === DungeonDeckCardPosition.Top) {
      this._selectStack(stackType).unshift(card);
    }

    if (cardPosition === DungeonDeckCardPosition.Bottom) {
      this._selectStack(stackType).push(card);
    }
  }

  public moveCard(card: IDungeonCard<unknown>, stackType: DungeonDeckStackType, cardPosition: DungeonDeckCardPosition): void {
    const stack = this._selectStack(stackType);
    const tempStack = stack.filter(c => c.id !== card.id);
    stack.length = 0;
    stack.push(...tempStack);
    this.addCard(card, stackType, cardPosition);
  }

  public takeCards(): void {
    if (this.cardsToUtilize.length > 0) {
      throw new Error("Not all cards was utilized in the previous turn")
    }

    if (this.cardsInDeck.length < this.drawPerTurn) {
      this.shuffleInUtilizedTiles()
    }

    for (let i = 0; i < this.drawPerTurn; i++) {
      const card = this.cardsInDeck.shift();
      if (card) {
        this.cardsToUtilize.push(card);
      }
    }
  }

  public shuffleInUtilizedTiles() {
    const randomNumbers = generateRandomNumbersFromZeroTo(this.utilizedCards.length + this.cardsInDeck.length)
    this.cardsInDeck = this.cardsInDeck.concat(this.utilizedCards);
    this.utilizedCards.length = 0;

    this.cardsInDeck = randomNumbers.map(n => this.cardsInDeck.at(n)!);
  }

  public addCardToUtilized(utilizedCard: IDungeonCard<unknown>): void {
    const card = this.cardsToUtilize.find(c => c.id === utilizedCard.id);
    if (!card) {
      throw new Error("DungeonDeck: Given card is not available for utilization")
    }

    this.cardsToUtilize = this.cardsToUtilize.filter(c => c !== card);
    this.utilizedCards.push(card);
  }

  private _selectStack(stack: DungeonDeckStackType): IDungeonCard<unknown>[] {
    if (stack === DungeonDeckStackType.CardsInDeck) {
      return this.cardsInDeck
    } else if (stack === DungeonDeckStackType.CardsToUtilize) {
      return this.cardsToUtilize
    } else {
      return this.utilizedCards
    }
  }
}