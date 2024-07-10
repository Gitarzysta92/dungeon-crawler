import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { adventureTemplate } from "./adventure.data";
import { area1, area2 } from "./areas.data";
import { vendorActor } from "./actors.data";
import { emptyCard, increaseEnemyAttackPowerCard, makeAttack, moveCreatureCard, spawnCreatureCard } from "./cards.data";
import { dungeonDeclaration } from "./dungeon.data";
import { boots, gold, twoHandedSword, potion, staff } from "./items.data";
import { gatherItemQuest } from "./quests.data";
import { elf, human } from "./hero-races";
import { mage, warrior } from "./hero-classes";
import { adventurer, noble } from "./hero-origins";
import { heroTemplate } from "./hero-template.data";
import { burning, circleOfProtection, cleansingMove, curse, domeOfProtection, fear, selfHealing, meteorShower, mindControl, move, teleport, vision, weakness } from "./abilities.data";
import { additionalAtackPerk, dualWieldPerk } from "./perks.data";
import { dealDamageFormula } from "./statistics.data";

export const dataFeed = {
  adventureTemplate: adventureTemplate,
  dungeonAreas: [dungeonDeclaration],
  characters: [vendorActor],
  quests: [Object.assign({ ...gatherItemQuest }, { originId: vendorActor.id })],
  areas: [area1, area2],
  heroRaces: [human, elf],
  heroClasses: [mage, warrior],
  heroOrigins: [noble, adventurer],
  heroTemplate: heroTemplate,
  dungeonCards: [
    emptyCard,
    increaseEnemyAttackPowerCard,
    moveCreatureCard,
    spawnCreatureCard,
  ],
  items: [
    staff,
    potion,
    gold,
    twoHandedSword,
    boots,
  ],
  actors: [
    ratActor,
    obstacleActor,
    treasureActor,
    dungeonExitActor,
    vendorActor
  ],
  abilities: [
    move,
    teleport,
    selfHealing,
    vision,
    weakness,
    curse,
    meteorShower,
    cleansingMove,
    domeOfProtection,
    circleOfProtection,
    fear,
    mindControl,
    burning,
  ],
  perks: [
    additionalAtackPerk,
    dualWieldPerk
  ],
  formulas: [
    dealDamageFormula
  ],
  cards: [
    emptyCard,
    makeAttack,
    increaseEnemyAttackPowerCard,
    moveCreatureCard,
    spawnCreatureCard,
  ]
}