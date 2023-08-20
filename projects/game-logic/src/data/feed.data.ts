import { characters, quests, areas } from "./adventure.data";
import { emptyCard, increaseEnemyAttackPower, moveEnemy, spawnEnemy } from "./dungeon-cards.data";
import { dungeon } from "./dungeon.data";

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
  ]
}