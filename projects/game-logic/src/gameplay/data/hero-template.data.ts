import { IHeroDeclaration } from "../modules/heroes/mixins/hero/hero.interface";
import { commonSlot1, commonSlot2, commonSlot3, commonSlot4, commonSlot5, weaponFirstSlot, weaponSecondSlot, bootsSlot } from "./inventory.data";
import { travelSupplies } from "./items.data";
import { defenceStatistic, improvableHealthStatistic, improvableAttackPowerStatistic, improvableSpellPowerStatistic, improvableMovementStatistic, improvableMajorActionStatistic, improvableMinorActionStatistic, improvableMoveActionStatistic, damageModifier } from "./statistics.data";

export const heroTemplate: IHeroDeclaration = {
  id: "",
  name: null,
  raceId: null,
  classId: null,
  originId: null,
  defence: defenceStatistic,
  health: improvableHealthStatistic,
  attackPower: improvableAttackPowerStatistic,
  spellPower: improvableSpellPowerStatistic,
  movement: improvableMovementStatistic,
  majorAction: improvableMajorActionStatistic,
  minorAction: improvableMinorActionStatistic,
  moveAction: improvableMoveActionStatistic,
  isMixin: true,
  isEntity: true,
  isProgressable: true,
  isBoardObject: true,
  isActor: true,
  isInventoryBearer: true,
  isControllable: true,
  isDefeatable: true,
  isStatisticBearer: true,
  isAbilityPerformer: true,
  isQuestResolver: true,
  isPerkBearer: true,
  isHero: true,
  isTraveler: true,
  level: 1,
  experiencePoints: 0,
  promotions: [],
  outlets: [],
  inventory: {
    id: "",
    isInventory: true,
    isEntity: true,
    isMixin: true,
    slots: [
      Object.assign({ stackSize: 100 }, commonSlot1),
      commonSlot2,
      commonSlot3,
      commonSlot4,
      commonSlot5,
      {
        ...weaponFirstSlot,
        ...damageModifier
      },
      weaponSecondSlot,
      bootsSlot
    ],
    items: [
      Object.assign({ slotIds: [commonSlot1.id] }, travelSupplies)
    ],
  },
  abilities: [],
  activeQuests: [],
  completedQuestIds: [],
  perks: [],
  occupiedAreaId: null,
  size: null
}