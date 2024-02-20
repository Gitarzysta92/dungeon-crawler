import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { adventureTemplate } from "./adventure.data";
import { firstArea, secondArea } from "./areas.data";
import { vendorCharacter } from "./actors.data";
import { emptyCard, increaseEnemyAttackPowerCard, moveEnemyCard, spawnCreatureCard } from "./dungeon-cards.data";
import { dungeonTemplate } from "./dungeon.data";
import { boots, gold, meleeWeapoon, potion, staff } from "./items.data";
import { gatherItemQuest } from "./quests.data";

export const dataFeed = {
  adventureTemplates: [adventureTemplate],
  dungeonTemplates: [dungeonTemplate],
  characters: [vendorCharacter],
  quests: [Object.assign({ ...gatherItemQuest }, { originId: vendorCharacter.id })],
  areas: [firstArea, secondArea ],
  dungeonCards: [
    emptyCard,
    increaseEnemyAttackPowerCard,
    moveEnemyCard,
    spawnCreatureCard,
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