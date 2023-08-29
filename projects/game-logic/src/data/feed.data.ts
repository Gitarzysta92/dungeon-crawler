import { characters, quests, areas } from "./adventure.data";
import { emptyCard, increaseEnemyAttackPower, moveEnemy, spawnEnemy } from "./dungeon-cards.data";
import { dungeon } from "./dungeon.data";
import { boots, gold, meleeWeapoon, potion, staff } from "./items.data";

export const dataFeed = {
  characters: characters,
  quests: quests,
  areas: areas,
  dungeons: [dungeon],
  dungeonCards: [
    emptyCard,
    increaseEnemyAttackPower,
    moveEnemy,
    spawnEnemy,
  ],
  items: [
    staff,
    potion,
    gold,
    meleeWeapoon,
    boots,
  ]
}