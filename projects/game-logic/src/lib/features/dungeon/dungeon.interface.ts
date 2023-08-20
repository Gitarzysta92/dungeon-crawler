import { IHero } from "../actors/hero.interface";
import { IBoardConfiguration, IBoardObject } from "../board/board.interface";
import { IInventory } from "../items/inventory.interface";
import { IDungeonDeck, IDungeonDeckConfiguration } from "./dungeon-deck.interface";

export interface IDungeon {
  id: string
  playerSpawnPoint: Omit<IBoardObject,'id'>
  boardConfiguration: IBoardConfiguration
  dungeonDeckConfiguration: IDungeonDeckConfiguration
  assignedAreaId: string;
}

export interface IDungeonInstance {
  metadata: IDungeon
  board: any
  deck: IDungeonDeck
  escapePenalties: any[]
  turn: number
  hero: IHero
  heroInventory: IInventory
}