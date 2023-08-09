import { GameLayer } from "../../game/game.constants";
import { IHero } from "../actors/hero";
import { IEffect } from "../effects/effects.interface";
import { IInventory } from "../items/inventory.interface";
import { IDungeonCard, IDungeonDeck } from "./dungeon-deck";
import { DeckInteractionType } from "./dungeon.constants";

export interface IDungeonMetadata {
  associatedAreaId: string;
  
}

export interface IDungeonLog {
  
}

export interface IDungeonInstance extends IDungeonMetadata {
  gameLayerName: GameLayer.Dungeon;
  effects: IEffect[],
  board: any;
  deck: IDungeonDeck,
  escapePenalties: any[];
  turn: number;
  hero: IHero
  heroInventory: IInventory
}

export interface IDeckInteraction {
  deckInteractionType: DeckInteractionType
}

export interface IPushCardsToDeck extends IDeckInteraction {
  deckInteractionType: DeckInteractionType.Push,
  cards: IDungeonCard<unknown>[]
}

export interface IRevealCardsToDeck extends IDeckInteraction {
  deckInteractionType: DeckInteractionType.Reveal,
  amount: number;
}