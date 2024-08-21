import { barrelActor, blankField, campFireActor, commonField, dungeonExitActor, ratActor, treasureActor, vendorActor } from "./data-feed-actors";
import { emptyCard, makeAttackCard, increaseEnemyAttackPowerCard, moveCreatureCard, spawnCreatureCard, basicAttack, drawCards, fireball } from "./data-feed-cards";
import { ABILITIES_DATA_FEED_KEY, ACTOR_DATA_FEED_KEY, ADVENTURE_TEMPLATE_DATA_FEED_KEY, AREAS_DATA_FEED_KEY, CARDS_DATA_FEED_KEY, DUNGEON_TEMPLATES_DATA_FEED_KEY, HERO_CLASS_DATA_FEED_KEY, HERO_ORIGIN_DATA_FEED_KEY, HERO_PICKER_DATA_FEED_KEY, HERO_RACE_DATA_FEED_KEY, HERO_TEMPLATE_DATA_FEED_KEY, ITEMS_DATA_FEED_KEY, PERKS_DATA_FEED_KEY, QUEST_DATA_FEED_KEY } from "./data-feed-keys";
import { exterminateRatsQuest, reportRatsExterminationQuest, slayEnemiesItemQuest } from "./data-feed-quests";
import { area1, area2 } from "./data-feed-areas";
import { IDataContainer } from "../interface/data-container.interface";
import { adventureTemplate } from "./data-feed-adventure";
import { heroTemplate, heroTemplate2, heroTemplate3 } from "./data-feed-hero-template";
import { dungeonDeclaration } from "./data-feed-dungeons";
import { adventurer, noble } from "./data-feed-hero-origins";
import { mage, warrior } from "./data-feed-hero-classes";
import { elf, human } from "./data-feed-hero-races";
import { additionalAtackPerk, dualWieldPerk } from "./data-feed-perks.data";
import { move, vision } from "./data-feed-abilities";
import { staffItem, magicPoo } from "./data-feed-items";
import { magePickerOption, roguePickerOption, warriorPickerOption } from "./hero-picker.data";


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
      vision,
    ]
  },
  {
    key: AREAS_DATA_FEED_KEY, data: [
      area1,
      area2
    ]
  },
  {
    key: CARDS_DATA_FEED_KEY, data: [
      emptyCard,
      fireball,
      basicAttack,
      drawCards,
      makeAttackCard,
      increaseEnemyAttackPowerCard,
      moveCreatureCard,
      spawnCreatureCard
    ]
  },
  {
    key: ITEMS_DATA_FEED_KEY, data: [
      staffItem,
      magicPoo,
    ]
  },
  {
    key: PERKS_DATA_FEED_KEY, data: [
      additionalAtackPerk,
      dualWieldPerk
    ]
  },
  {
    key: HERO_TEMPLATE_DATA_FEED_KEY, data: [heroTemplate, heroTemplate2, heroTemplate3]
  },
  {
    key: ADVENTURE_TEMPLATE_DATA_FEED_KEY, data: [adventureTemplate]
  },
  {
    key: DUNGEON_TEMPLATES_DATA_FEED_KEY, data: [dungeonDeclaration]
  },
  {
    key: HERO_RACE_DATA_FEED_KEY, data: [human, elf]
  },
  {
    key: HERO_CLASS_DATA_FEED_KEY, data: [warrior, mage]
  },
  {
    key: HERO_ORIGIN_DATA_FEED_KEY, data: [adventurer, noble]
  },
  {
    key: HERO_PICKER_DATA_FEED_KEY, data: [magePickerOption,roguePickerOption,warriorPickerOption]
  }
]
