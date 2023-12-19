import { IActivity } from "../../activities/interfaces/activity.interface";
import { Dictionary } from "../../extensions/types";
import { ICharacter } from "../../features/actors/actors.interface";
import { AdventureMap } from "../../features/adventure/adventure-map";
import { IArea, IAreaObject } from "../../features/adventure/area.interface";
import { IDungeonState, IDungeonConfiguration } from "../../features/dungeon/dungeon.interface";
import { Hero } from "../../features/hero/hero";
import { HeroProgression } from "../../features/hero/hero-progression";
import { Inventory } from "../../features/items/inventory";
import { QuestLog } from "../../features/quests/quest-log";
import { IQuest } from "../../features/quests/quests.interface";
import { RewardsTracker } from "../../features/rewards/rewards-tracker";
import { IRevertableState } from "../../utils/state-dispatcher/interfaces/state.interface";
import { IAdventureGlobalState } from "./adventure-state.interface";


export class AdventureGlobalState implements IRevertableState, IAdventureGlobalState {
  hero: Hero;
  heroProgression: HeroProgression;
  questLog: QuestLog;
  rewardsTracker: RewardsTracker;
  adventureMap: AdventureMap;
  dungeons: Dictionary<IArea['id'], IDungeonConfiguration>;
  dungeonInstance?: IDungeonState;
  characters: Dictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & {
    quests: IQuest[]
    inventory: Inventory
    assignedAreaId: string
  }>
  changesHistory: IActivity<{ [key: string]: unknown; }>[]
  prevState: IAdventureState | null

  constructor(data: IRevertableState & Omit<IAdventureState, 'gameLayer' | 'getAllCharactersFromOccupiedArea' | 'getCharacterFromOccupiedArea'>) {
    this.hero = new Hero(data.hero);
    this.heroInventory = new Inventory(data.heroInventory);
    this.heroSpellsAndAbilities = data.heroSpellsAndAbilities;
    this.heroProgression = new HeroProgression(data.heroProgression);
    this.questLog = new QuestLog(data.questLog);
    this.rewardsTracker = new RewardsTracker(data.rewardsTracker);
    this.adventureMap = new AdventureMap(data.adventureMap);
    this.dungeons = Object.fromEntries(Object.entries(data.dungeons).map(e => [e[0], new DungeonConfigration(e[1])]))
    this.dungeonInstance = data.dungeonInstance;
    this.characters = Object.fromEntries(Object.entries(data.characters)
      .map(c => [c[0], Object.assign(c[1], { inventory: new Inventory(c[1].inventory)})]));
    this.changesHistory = data.changesHistory;
    this.prevState = data.prevState as IAdventureState;;
  }

  public getAllCharactersFromOccupiedArea(): (ICharacter & { inventory: Inventory, assignedAreaId: string, quests: IQuest[] })[] {
    const availableAreas = this.adventureMap.getAllAvailableAreasRelatedToArea(this.hero.occupiedAreaId);
    return Object.values(this.characters).filter(c => availableAreas.some(a => a.id === c.assignedAreaId));
  }

  public getCharacterFromOccupiedArea(character: ICharacter): (ICharacter & { inventory: Inventory, assignedAreaId: string, quests: IQuest[] }) | undefined {
    return this.getAllCharactersFromOccupiedArea().find(c => c.id === character.id);
  }
}