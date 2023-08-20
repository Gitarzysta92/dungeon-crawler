import { IDictionary } from "../extensions/types";
import { IActor, ICharacter } from "../features/actors/actors.interface";
import { IHero } from "../features/actors/hero.interface";
import { IAdventureMap } from "../features/adventure/adventure.interface";
import { IArea, IAreaObject } from "../features/adventure/area.interface";
import { IBoard } from "../features/board/board.interface";
import { IDungeonCard, IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { IDungeon } from "../features/dungeon/dungeon.interface";
import { IInventory } from "../features/items/inventory.interface";
import { IQuest, IQuestLog } from "../features/quest/quest.interface";
import { GameLayer } from "./game.constants";

export interface IGameFeed {
  quests: IQuest[]
  characters: (ICharacter & { inventory: IInventory, assignedAreaId: string })[]
  areas: IArea[],
  dungeons: IDungeon[],
  dungeonCards: IDungeonCard<unknown>[]
}

export interface ICommonState {
  gameLayer: GameLayer;
  hero: IHero;
  heroInventory: IInventory;
}

export interface IAdventureState extends ICommonState {
  gameLayer: GameLayer.Adventure
  hero: IHero & IAreaObject;
  adventureMap: IAdventureMap;
  characters: IDictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & {
    quests: IQuest[];
    inventory: IInventory;
    assignedAreaId: string;
    questLog: IQuestLog;
  }>
}

export interface IDungeonState extends ICommonState {
  gameLayer: GameLayer.Dungeon;
  deck: IDungeonDeck;
  board: IBoard;
  escapePenalties?: any[];
  turn?: number;
}