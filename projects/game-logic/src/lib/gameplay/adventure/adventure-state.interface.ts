import { Dictionary } from "../../extensions/types";
import { IAdventureMap } from "../../features/adventure/adventure.interface";
import { IAreaObject, IArea } from "../../features/adventure/area.interface";
import { IDungeonConfiguration, IDungeonState } from "../../features/dungeon/dungeon.interface";
import { IInventory } from "../../features/items/inventory.interface";
import { IQuest, IQuestLog } from "../../features/quests/quests.interface";



export interface IAdventureGlobalState {
  hero: IHero & IAreaObject;
  heroInventory: IInventory;
  // heroSpellsAndAbilities: {
  //   learnedIds: string[];
  //   preparedIds: string[];
  // };
  heroProgression: IHeroProgression;
  dungeons: Dictionary<IArea['id'], IDungeonConfiguration>;
  dungeonInstance?: IDungeonState;
  adventureMap: IAdventureMap;
  characters: Dictionary<`${ICharacter['id']}:${IArea['id']}`, ICharacter & {
    quests: IQuest[];
    inventory: IInventory;
    assignedAreaId: string;
  }>
  questLog: IQuestLog;
}