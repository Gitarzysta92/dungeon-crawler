import { IHeroTemplate } from "src/lib/states/hero-template.interface";
import { firstAreaId } from "./common-identifiers.data";
import { dataFeed } from "./feed.data";
import { hero, heroInventory } from "./hero.data";
import { basicAttack, move, fireball, teleport, healing, vision, weakness, curse, meteorShower } from "./skills-and-spells.data";

export const heroTemplate: IHeroTemplate = {
  ...hero,
  occupiedAreaId: firstAreaId,
  occupiedRootAreaId: firstAreaId,
  inventory: {
    itemSlots: heroInventory.slots,
    itemBindings: heroInventory.items.map(i => Object.assign(i, { itemId: i.sourceItemId })),
  },
  heroProgression: {} as any,
  heroSpellsAndAbilities: {
    learnedIds: [
      basicAttack.id,
      move.id,
      fireball.id,
      teleport.id,
      healing.id,
      vision.id,
      weakness.id,
      curse.id,
      meteorShower.id
    ],
    preparedIds: [
      basicAttack.id,
      move.id,
      fireball.id,
      teleport.id,
      healing.id,
      vision.id,
      weakness.id,
      curse.id,
      meteorShower.id
    ]
  },
  ...dataFeed,
}