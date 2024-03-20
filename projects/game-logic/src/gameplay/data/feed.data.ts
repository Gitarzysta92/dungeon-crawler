import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { adventureTemplate } from "./adventure.data";
import { firstArea, secondArea } from "./areas.data";
import { vendorCharacter } from "./actors.data";
import { emptyCard, increaseEnemyAttackPowerCard, makeAttackCard, moveEnemyCard, spawnCreatureCard } from "./dungeon-cards.data";
import { dungeonArea } from "./dungeon.data";
import { boots, gold, meleeWeapoon, potion, staff } from "./items.data";
import { gatherItemQuest } from "./quests.data";
import { elf, human } from "./hero-races";
import { mage, warrior } from "./hero-classes";
import { adventurer, noble } from "./hero-origins";
import { heroTemplate } from "./hero-template.data";
import { basicAttack, burning, circleOfProtection, cleansingMove, curse, domeOfProtection, fear, fireball, healing, meteorShower, mindControl, move, teleport, vision, weakness } from "./abilities.data";
import { additionallAtackPerk, dualWield } from "./perks.data";
import { dealDamageFormula } from "./statistics.data";

export const dataFeed = {
  adventureTemplate: adventureTemplate,
  dungeonAreas: [dungeonArea],
  characters: [vendorCharacter],
  quests: [Object.assign({ ...gatherItemQuest }, { originId: vendorCharacter.id })],
  areas: [firstArea, secondArea],
  heroRaces: [human, elf],
  heroClasses: [mage, warrior],
  heroOrigins: [noble, adventurer],
  heroTemplate: heroTemplate,
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
  ],
  abilities: [
    basicAttack,
    move,
    fireball,
    teleport,
    healing,
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
    additionallAtackPerk,
    dualWield
  ],
  formulas: [
    dealDamageFormula
  ],
  cards: [
    emptyCard,
    makeAttackCard,
    increaseEnemyAttackPowerCard,
    moveEnemyCard,
    spawnCreatureCard,
  ]
}