import { IAreaObject } from "../adventure/area.interface";
import { IHeroProgression } from "./hero-progression.interface";
import { IHero } from "./hero.interface";
import { IItemSlot } from "../items/inventory.interface";

export interface IHeroTemplate extends IHero, IAreaObject {
  inventory: {
    itemSlots: IItemSlot[];
    itemBindings: { itemId: string, slotIds: string[], amountInStack: number }[];
  }
  heroProgression: IHeroProgression;
  heroSpellsAndAbilities: { learnedIds: string[], preparedIds: string[] }
}