import { IActivity } from "../activities/interfaces/activity.interface";
import { IDictionary } from "../extensions/types";
import { ICharacter } from "../features/actors/actors.interface";
import { Hero } from "../features/actors/hero";
import { AdventureMap } from "../features/adventure/adventure-map";
import { IArea, IAreaObject } from "../features/adventure/area.interface";
import { DungeonLog } from "../features/dungeon/dungeon-log";
import { IDungeon } from "../features/dungeon/dungeon.interface";
import { Inventory } from "../features/items/inventory";
import { QuestLog } from "../features/quest/quest-log";
import { IQuest } from "../features/quest/quest.interface";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { GameLayer } from "./game.constants";
import { IAdventureState } from "./game.interface";


export class AdventureState implements IState, IAdventureState {
  gameLayer: GameLayer.Adventure
  hero: Hero & IAreaObject
  heroInventory: Inventory
  questLog: QuestLog;
  adventureMap: AdventureMap
  dungeons: IDictionary<`${IDungeon['id']}:${IArea['id']}`, IDungeon & {
    assignedAreaId: string,
    dungeonLog: DungeonLog
  }>
  characters: IDictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & {
    quests: IQuest[]
    inventory: Inventory
    assignedAreaId: string
  }>
  changesHistory: IActivity<{ [key: string]: unknown; }>[]
  prevState: AdventureState | null

  constructor(data: Omit<AdventureState, 'gameLayer' | 'getAllCharactersFromOccupiedArea' | 'getCharacterFromOccupiedArea'>) {
    this.gameLayer = GameLayer.Adventure;
    this.hero = data.hero;
    this.heroInventory = data.heroInventory;
    this.questLog = data.questLog;
    this.adventureMap = data.adventureMap;
    this.dungeons = data.dungeons;
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