import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { characters, quests, areas } from "./adventure.data";
import { vendorCharacter } from "./characters.data";
import { emptyCard, increaseEnemyAttackPowerCard, moveEnemyCard, spawnEnemyCard } from "./dungeon-cards.data";
import { dungeon } from "./dungeon.data";
import { boots, gold, meleeWeapoon, potion, staff } from "./items.data";

export const dataFeed = {
  characters: characters,
  quests: quests,
  areas: areas,
  dungeons: [dungeon],
  dungeonCards: [
    emptyCard,
    increaseEnemyAttackPowerCard,
    moveEnemyCard,
    spawnEnemyCard,
  ],
  items: [
    staff,
    potion,
    gold,
    meleeWeapoon,
    boots,
  ],
  actors: [
    ratActor,
    obstacleActor,
    treasureActor,
    dungeonExitActor,
    vendorCharacter
  ]
}