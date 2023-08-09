import { ICharacter } from "../features/actors/actor";
import { IHero } from "../features/actors/hero";
import { IAdventureMap } from "../features/adventure/adventure.interface";
import { IAreaObject } from "../features/adventure/area.interface";
import { IBoard } from "../features/board/board.interface";
import { IDungeonDeck } from "../features/dungeon/dungeon-deck";
import { IDungeonLog } from "../features/dungeon/dungeon.interface";
import { IInventory } from "../features/items/inventory.interface";
import { IQuest, IQuestLog } from "../features/quest/quest.interface";
import { GameLayer } from "./game.constants";

export interface IGameFeed {
  quests: IQuest[],
}

export interface ICommonState {
  gameLayerName: GameLayer;
  hero: IHero;
  heroInventory: IInventory;
  questLog: IQuestLog;
}

export interface IAdventureState extends ICommonState {
  gameLayerName: GameLayer.Adventure
  hero: IHero & IAreaObject;
  adventureMap: IAdventureMap;
  dungeonLog: IDungeonLog;
  characters: (ICharacter & {
    quests: IQuest[]
    inventory: IInventory,
    assignedAreaId: string
  })[];
}

export interface IDungeonState extends ICommonState {
  gameLayerName: GameLayer.Dungeon;
  deck: IDungeonDeck;
  board: IBoard;
  effects?: any[];
  escapePenalties?: any[];
  turn?: number;
}