import { IActivity } from "../activities/interfaces/activity.interface";
import { IDictionary } from "../extensions/types";
import { ICharacter } from "../features/actors/actor";
import { Hero } from "../features/actors/hero";
import { AdventureMap } from "../features/adventure/adventure-map";
import { IAreaObject } from "../features/adventure/area.interface";
import { DungeonLog } from "../features/dungeon/dungeon-log";
import { Inventory } from "../features/items/inventory";
import { QuestLog } from "../features/quest/quest-log";
import { IQuest } from "../features/quest/quest.interface";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { GameLayer } from "./game.constants";


export class AdventureState implements IState {
  gameLayerName: GameLayer.Adventure;
  hero: Hero & IAreaObject;
  heroInventory: Inventory;
  questLog: QuestLog;
  adventureMap: AdventureMap;
  dungeonLog: DungeonLog;
  characters: IDictionary<ICharacter & {
    quests: IQuest[]
    inventory: Inventory,
    assignedAreaId: string
  }>;
  changesHistory: IActivity<{ [key: string]: unknown; }>[];
  prevState: AdventureState | null;

  constructor(data: Omit<AdventureState, 'gameLayerName' | 'getAllCharactersFromOccupiedArea' | 'getCharacterFromOccupiedArea'>) {
    this.gameLayerName = GameLayer.Adventure;
    this.hero = data.hero;
    this.heroInventory = data.heroInventory;
    this.questLog = data.questLog;
    this.adventureMap = data.adventureMap;
    this.dungeonLog = data.dungeonLog;
    this.characters = data.characters;
    this.changesHistory = [];
    this.prevState = null;
  }

  public getAllCharactersFromOccupiedArea(): (ICharacter & { inventory: Inventory, assignedAreaId: string, quests: IQuest[] })[] {
    const availableAreas = this.adventureMap.getAllAvailableAreas(this.hero.occupiedAreaId);
    return Object.values(this.characters).filter(c => availableAreas.some(a => a.id === c.assignedAreaId));
  }

  public getCharacterFromOccupiedArea(character: ICharacter): (ICharacter & { inventory: Inventory, assignedAreaId: string, quests: IQuest[] }) | undefined {
    return this.getAllCharactersFromOccupiedArea().find(c => c.id === character.id);
  }
}