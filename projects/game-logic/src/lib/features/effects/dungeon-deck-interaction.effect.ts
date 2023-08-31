import { DungeonDeck } from "../dungeon/dungeon-deck";
import { IDungeonCard } from "../dungeon/dungeon-deck.interface";


export function reveal(dungeonDeck: DungeonDeck, amount: number): void {
  
}

export function pushCardsToDeck(dungeonDeck: DungeonDeck, cards: IDungeonCard<unknown>[]): void {
  for (let card of cards) {
    dungeonDeck.addCard(card);
  }
}