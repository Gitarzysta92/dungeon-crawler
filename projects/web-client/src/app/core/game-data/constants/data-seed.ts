import { curse, fireball, healing, meteor, move, teleport, vision, weakness } from "./data-feed-abilities";
import { barrelActor, blankField, campFireActor, commonField, dungeonExitActor, ratActor, treasureActor, vendorActor } from "./data-feed-actors";
import { emptyCard, makeAttackCard, increaseEnemyAttackPowerCard, moveCreatureCard, spawnCreatureCard } from "./data-feed-dungeon-cards";
import { boots, gold, magicPoo, poo, potion, staff, twoHandedSword } from "./data-feed-items";
import { ABILITIES_DATA_FEED_KEY, ACTOR_DATA_FEED_KEY, ADVENTURE_TEMPLATE_DATA_FEED_KEY, AREAS_DATA_FEED_KEY, DUNGEON_CARDS_DATA_FEED_KEY, DUNGEON_TEMPLATES_DATA_FEED_KEY, HERO_CLASS_DATA_FEED_KEY, HERO_ORIGIN_DATA_FEED_KEY, HERO_RACE_DATA_FEED_KEY, HERO_TEMPLATE_DATA_FEED_KEY, ITEMS_DATA_FEED_KEY, PERKS_DATA_FEED_KEY, QUEST_DATA_FEED_KEY } from "./data-feed-keys";
import { exterminateRatsQuest, reportRatsExterminationQuest, slayEnemiesItemQuest } from "./data-feed-quests";
import { area1, area2 } from "./data-feed-areas";
import { IDataContainer } from "../interface/data-container.interface";
import { adventureTemplate } from "./data-feed-adventure";
import { heroTemplate } from "./data-feed-hero-template";
import { dungeonTemplate } from "./data-feed-dungeons";
import { adventurer, noble } from "./data-feed-hero-origins";
import { mage, warrior } from "./data-feed-hero-classes";
import { elf, human } from "./data-feed-hero-races";
import { additionalAtackPerk, dualWieldPerk } from "./data-feed-perks.data";


export const gameplaySeed: Array<{ key: string, data: IDataContainer<any>[] }> = [
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
      area1,
      area2
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
    key: PERKS_DATA_FEED_KEY, data: [
      additionalAtackPerk,
      dualWieldPerk
    ]
  },
  {
    key: HERO_TEMPLATE_DATA_FEED_KEY, data: [heroTemplate]
  },
  {
    key: ADVENTURE_TEMPLATE_DATA_FEED_KEY, data: [adventureTemplate]
  },
  {
    key: DUNGEON_TEMPLATES_DATA_FEED_KEY, data: [dungeonTemplate]
  },
  {
    key: HERO_RACE_DATA_FEED_KEY, data: [human, elf]
  },
  {
    key: HERO_CLASS_DATA_FEED_KEY, data: [warrior, mage]
  },
  {
    key: HERO_ORIGIN_DATA_FEED_KEY, data: [adventurer, noble]
  }
]
