import { IActivity } from "../activities/interfaces/activity.interface";
import { IDictionary } from "../extensions/types";
import { ICharacter } from "../features/actors/actors.interface";
import { AdventureMap } from "../features/adventure/adventure-map";
import { IArea, IAreaObject } from "../features/adventure/area.interface";
import { DungeonConfigration } from "../features/dungeon/dungeon-configuration";
import { IDungeon, IDungeonConfiguration } from "../features/dungeon/dungeon.interface";
import { Hero } from "../features/hero/hero";
import { HeroProgression } from "../features/hero/hero-progression";
import { Inventory } from "../features/items/inventory";
import { QuestLog } from "../features/quests/quest-log";
import { IQuest } from "../features/quests/quests.interface";
import { RewardsTracker } from "../features/rewards/rewards-tracker";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { GameLayer } from "./game.constants";
import { IAdventureState } from "./game.interface";


export class AdventureState implements IState, IAdventureState {
  gameLayer: GameLayer.Adventure;
  hero: Hero & IAreaObject;
  heroInventory: Inventory;
  heroSpellsAndAbilities: {
    learnedIds: string[],
    preparedIds: string[]
  }
  heroProgression: HeroProgression;
  questLog: QuestLog;
  rewardsTracker: RewardsTracker;
  adventureMap: AdventureMap;
  dungeons: IDictionary<IArea['id'], IDungeonConfiguration>;
  dungeonInstance?: IDungeon;
  characters: IDictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & {
    quests: IQuest[]
    inventory: Inventory
    assignedAreaId: string
  }>
  changesHistory: IActivity<{ [key: string]: unknown; }>[]
  prevState: IAdventureState | null

  constructor(data: IState & Omit<IAdventureState, 'gameLayer' | 'getAllCharactersFromOccupiedArea' | 'getCharacterFromOccupiedArea'>) {
    this.gameLayer = GameLayer.Adventure;
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