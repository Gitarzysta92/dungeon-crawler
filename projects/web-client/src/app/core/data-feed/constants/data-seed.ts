import { basicAttack, curse, fireball, healing, meteor, move, teleport, vision, weakness } from "./data-feed-abilities";
import { barrelActor, blankField, campFireActor, commonField, dungeonExitActor, ratActor, treasureActor, vendorActor } from "./data-feed-actors";
import { emptyCard, makeAttackCard, increaseEnemyAttackPowerCard, moveCreatureCard } from "./data-feed-dungeon-cards";
import { boots, gold, magicPoo, poo, potion, staff, twoHandedSword } from "./data-feed-items";
import { ABILITIES_DATA_FEED_KEY, ACTOR_DATA_FEED_KEY, ADVENTURE_TEMPLATE_DATA_FEED_KEY, AREAS_DATA_FEED_KEY, DUNGEON_CARDS_DATA_FEED_KEY, DUNGEON_TEMPLATES_DATA_FEED_KEY, HERO_TEMPLATE_DATA_FEED_KEY, ITEMS_DATA_FEED_KEY, QUEST_DATA_FEED_KEY } from "./data-feed-keys";
import { exterminateRatsQuest, reportRatsExterminationQuest, slayEnemiesItemQuest } from "./data-feed-quests";
import { firstArea, secondArea } from "./data-feed-areas";
import { spawnCreatureCard } from "@game-logic/gameplay/data/dungeon-cards.data";
import { heroTemplate } from "@game-logic/gameplay/data/hero-template.data";
import { adventureTemplate } from "@game-logic/gameplay/data/adventure.data";
import { IAuxiliaryContainer } from "../../commons/interfaces/auxiliary-container.interface";


export const seed: Array<{ key: string, data: IAuxiliaryContainer<any>[] }> = [
  {
    key: QUEST_DATA_FEED_KEY, data: [
      exterminateRatsQuest,
      reportRatsExterminationQuest,
      slayEnemiesItemQuest
     ]
  },
  {
    key: ACTOR_DATA_FEED_KEY, data: [
      vendorActor,
      treasureActor,
      dungeonExitActor,
      ratActor,
      campFireActor,
      barrelActor,
      commonField,
      blankField
    ]
  },
  {
    key: ABILITIES_DATA_FEED_KEY, data: [
      basicAttack,
      move,
      fireball,
      teleport,
      healing,
      vision,
      weakness,
      curse,
      meteor
    ]
  },
  {
    key: AREAS_DATA_FEED_KEY, data: [
      firstArea,
      secondArea
    ]
  },
  {
    key: DUNGEON_CARDS_DATA_FEED_KEY, data: [
      emptyCard,
      makeAttackCard,
      increaseEnemyAttackPowerCard,
      moveCreatureCard,
      spawnCreatureCard
    ]
  },
  {
    key: ITEMS_DATA_FEED_KEY, data: [
      staff,
      potion,
      poo,
      magicPoo,
      gold,
      twoHandedSword,
      boots
    ]
  },
  {
    key: HERO_TEMPLATE_DATA_FEED_KEY, data: [heroTemplate]
  },
  {
    key: ADVENTURE_TEMPLATE_DATA_FEED_KEY, data: [adventureTemplate]
  },
  {
    key: DUNGEON_TEMPLATES_DATA_FEED_KEY, data: [
      
    ]
  }
]