import { IAreaObject } from "../features/adventure/area.interface";
import { IHeroProgression } from "../features/hero/hero-progression.interface";
import { IHero } from "../features/hero/hero.interface";
import { IItemSlot } from "../features/items/inventory.interface";

export interface IHeroTemplate extends IHero, IAreaObject {
  inventory: {
    itemSlots: IItemSlot[];
    itemBindings: { itemId: string, slotIds: string[], amountInStack: number }[];
  }
  heroProgression: IHeroProgression;
  heroSpellsAndAbilities: { learnedIds: string[], preparedIds: string[] }
}