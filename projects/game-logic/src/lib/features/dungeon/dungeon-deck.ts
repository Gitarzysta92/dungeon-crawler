import { generateRandomNumbersFromZeroTo } from "../../utils/utils";
import { ActorType } from "../actors/actors.constants";
import { IEffect } from "../effects/resolve-effect.interface";
import { PlayerType } from "../players/players.constants";
import { IPlayer } from "../players/players.interface";
import { DungeonDeckCardPosition, DungeonDeckStackType } from "./dungeon-deck.constants";
import { IDungeonDeck, IDungeonCard } from "./dungeon-deck.interface";


export class DungeonDeck implements IDungeonDeck, IPlayer {
  id: string;
  playerType: PlayerType = PlayerType.Computer;
  revealedCardIds: string[];
  cardsToUtilize: IDungeonCard<IEffect>[];
  utilizedCards: IDungeonCard<IEffect>[];
  cardsInDeck: IDungeonCard<IEffect>[];
  actorType: ActorType.DungeonDeck = ActorType.DungeonDeck;
  groupId: string;
  drawPerTurn: number;
  lastingEffects: IEffect[];
  sourceActorId: string;

  constructor(data: Omit<IDungeonDeck, 'actorType'>) {
    this.id = data.id;
    this.revealedCardIds = data.revealedCardIds;
    this.cardsToUtilize = data.cardsToUtilize;
    this.utilizedCards = data.utilizedCards;
    this.cardsInDeck = data.cardsInDeck;
    this.groupId = data.groupId!;
    this.drawPerTurn = data.drawPerTurn;
    this.lastingEffects = data.lastingEffects;
    this.sourceActorId = data.sourceActorId;
  }

  public addCard(card: IDungeonCard<IEffect>, stackType: DungeonDeckStackType, cardPosition: DungeonDeckCardPosition): void {
    if (cardPosition === DungeonDeckCardPosition.Top) {
      this._selectStack(stackType).unshift(card);
    }

    if (cardPosition === DungeonDeckCardPosition.Bottom) {
      this._selectStack(stackType).push(card);
    }
  }

  public removeCard(card: IDungeonCard<IEffect>): void {
    this.cardsToUtilize = this.cardsToUtilize.filter(c => c.id !== card.id);
    this.utilizedCards = this.utilizedCards.filter(c => c.id !== card.id);
    this.cardsInDeck = this.cardsInDeck.filter(c => c.id !== card.id);
    this.revealedCardIds = this.revealedCardIds.filter(id => id !== card.id);
  }

  public revealCard(card: IDungeonCard<IEffect>): void {
    if (!this.cardsInDeck.some(c => c.id === card.id)) {
      throw new Error("Dungeon deck: Cannot reveal card that is not in the deck stack")
    }
    this.revealedCardIds.push(card.id);
  }

  public revealAmountOfCards(amount: number): void {
    this.cardsInDeck.copyWithin(0, 0, amount).forEach(c => this.removeCard(c));
  }

  public moveCard(card: IDungeonCard<IEffect>, stackType: DungeonDeckStackType, cardPosition: DungeonDeckCardPosition): void {
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

  public addCardToUtilized(utilizedCard: IDungeonCard<IEffect>): void {
    const card = this.cardsToUtilize.find(c => c.id === utilizedCard.id);
    if (!card) {
      throw new Error("DungeonDeck: Given card is not available for utilization")
    }

    this.cardsToUtilize = this.cardsToUtilize.filter(c => c !== card);
    this.utilizedCards.push(card);
  }

  public isInStack(card: IDungeonCard<IEffect>, stackType: DungeonDeckStackType): boolean {
    const stack = this._selectStack(stackType);
    return stack.some(s => s.id === card.id);
  }

  private _selectStack(stack: DungeonDeckStackType): IDungeonCard<IEffect>[] {
    if (stack === DungeonDeckStackType.CardsInDeck) {
      return this.cardsInDeck
    } else if (stack === DungeonDeckStackType.CardsToUtilize) {
      return this.cardsToUtilize
    } else {
      return this.utilizedCards
    }
  }
}