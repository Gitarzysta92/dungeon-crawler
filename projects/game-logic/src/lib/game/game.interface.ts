import { IDictionary } from "../extensions/types";
import { IActor, ICharacter } from "../features/actors/actors.interface";
import { IHero } from "../features/hero/hero.interface";
import { IAdventureMap } from "../features/adventure/adventure.interface";
import { IArea, IAreaObject } from "../features/adventure/area.interface";
import { IBoard } from "../features/board/board.interface";
import { IDungeonCard, IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { IDungeon, IDungeonConfiguration, IDungeonExitBonus } from "../features/dungeon/dungeon.interface";
import { IInventory } from "../features/items/inventory.interface";
import { IQuest, IQuestLog } from "../features/quests/quests.interface";
import { GameLayer } from "./game.constants";
import { IRewardsTracker } from "../features/rewards/rewards.interface";
import { IItem } from "../features/items/items.interface";
import { IHeroProgression } from "../features/hero/hero-progression.interface";
import { IEffect } from "../features/effects/effects-commons.interface";

export interface IGameFeed {
  getQuests: (ids?: string[]) => Promise<IQuest[]>;
  getQuest: (id: string) => Promise<IQuest>;
  getCharacters: (ids?: string[]) => Promise<(ICharacter & { inventory: IInventory, assignedAreaId: string })[]>;
  getCharacter: (id: string) => Promise<(ICharacter & { inventory: IInventory, assignedAreaId: string })>;
  getAreas: (ids?: string[]) => Promise<IArea[]>;
  getArea: (id: string) => Promise<IArea>;

  getActors: (ids?: string[]) => Promise<IActor[]>;
  getActor: (id: string) => Promise<IActor>;

  getDungeon: (id: string) => Promise<IDungeon>;
  getDungeons: (ids?: string[]) => Promise<IDungeon[]>;
  getDungeonCards: (ids?: string[]) => Promise<IDungeonCard<IEffect>[]>;
  getItems: (ids?: string[]) => Promise<IItem[]>;
  getItem: (id: string) => Promise<IItem>;
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
  dungeons: IDictionary<IArea['id'], IDungeonConfiguration>;
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
  dungeonId: string
  heroPreparedSpellAndAbilityIds: string[];
  gameLayer: GameLayer.Dungeon;
  deck: IDungeonDeck;
  board: IBoard;
  exitBonuses?: IDungeonExitBonus[];
  turn?: number;
  isDungeonFinished: boolean;
}

