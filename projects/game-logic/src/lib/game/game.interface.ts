import { IDictionary } from "../extensions/types";
import { ICharacter } from "../features/actors/actors.interface";
import { IHero } from "../features/hero/hero.interface";
import { IAdventureMap } from "../features/adventure/adventure.interface";
import { IArea, IAreaObject } from "../features/adventure/area.interface";
import { IBoard } from "../features/board/board.interface";
import { IDungeonCard, IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { IDungeon, IDungeonExitBonus } from "../features/dungeon/dungeon.interface";
import { IInventory } from "../features/items/inventory.interface";
import { IQuest, IQuestLog } from "../features/quests/quests.interface";
import { GameLayer } from "./game.constants";
import { IRewardsTracker } from "../features/rewards/rewards.interface";
import { IItem } from "../features/items/items.interface";
import { IHeroProgression } from "../features/hero/hero-progression.interface";

export interface IGameFeed {
  quests: IQuest[]
  characters: (ICharacter & { inventory: IInventory, assignedAreaId: string })[]
  areas: IArea[],
  dungeons: IDungeon[],
  dungeonCards: IDungeonCard<unknown>[],
  items: IItem[]
}

export interface ICommonState {
  gameLayer: GameLayer;
  hero: IHero;
  heroInventory: IInventory;
  rewardsTracker: IRewardsTracker;
}

export interface IAdventureState extends ICommonState {
  gameLayer: GameLayer.Adventure
  hero: IHero & IAreaObject;
  heroSpellsAndAbilities: {
    learnedIds: string[];
    preparedIds: string[];
  };
  heroProgression: IHeroProgression;
  dungeons: IDictionary<`${IDungeon['id']}:${IArea['id']}`, IDungeon & {
    assignedAreaId: string;
  }>;
  dungeonInstance?: IDungeon;
  adventureMap: IAdventureMap;
  characters: IDictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & {
    quests: IQuest[];
    inventory: IInventory;
    assignedAreaId: string;
  }>
  questLog: IQuestLog;
}

export interface IDungeonState extends ICommonState {
  preparedSpellAndAbilityIds: string[];
  gameLayer: GameLayer.Dungeon;
  deck: IDungeonDeck;
  board: IBoard;
  exitBonuses?: IDungeonExitBonus[];
  turn?: number;
}

