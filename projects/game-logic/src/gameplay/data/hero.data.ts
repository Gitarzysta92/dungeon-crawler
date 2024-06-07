import { Side, Size } from "../../lib/modules/board/entities/board-object/board-object.constants";
import { IInventoryDeclaration } from "../../lib/modules/items/entities/inventory/inventory.interface";
import { IPossesedItemDeclaration } from "../../lib/modules/items/entities/item/item.interface";
import { IHeroDeclaration } from "../modules/heroes/mixins/hero/hero.interface";
import { basicAttack, curse, fireball, healing, meteorShower, move, teleport, vision, weakness } from "./abilities.data";
import { FIRST_AREA_ID } from "./common-identifiers.data";
import { mage } from "./hero-classes";
import { adventurer } from "./hero-origins";
import { human } from "./hero-races";
import { bootsSlot, commonSlot1, commonSlot2, commonSlot3, commonSlot4, commonSlot5, weaponFirstSlot, weaponSecondSlot } from "./inventory.data";
import { boots, gold, potion, staff, twoHandedSword } from "./items.data";
import { additionalAtackPerk, dualWieldPerk } from "./perks.data";
import { damageModifier, defenceStatistic, improvableAttackPowerStatistic, improvableHealthStatistic, improvableMajorActionStatistic, improvableMinorActionStatistic, improvableMoveActionStatistic, improvableMovementStatistic, improvableSpellPowerStatistic } from "./statistics.data";


export const heroSword: (typeof twoHandedSword) & IPossesedItemDeclaration = Object.assign({ ...twoHandedSword }, {
  id: "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
  associatedSlotIds: ['5A99BB51-B603-4975-AD1E-F2113668FBE2'],
  sourceItemId: twoHandedSword.id
})

export const heroAxe = Object.assign({ ...twoHandedSword }, {
  id: "F95D81C3-1A5C-43DF-B3D6-081D36397684",
  associatedSlotIds: ['B921716D-9E2C-4C8C-A2F1-E39857D2634B'],
  sourceItemId: twoHandedSword.id
});


export const heroStaff = Object.assign({ ...staff }, {
  id: "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
  associatedSlotIds: [],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItemDeclaration;


export const heroBoots = Object.assign({ ...boots }, {
  id: "714DF949-8CE2-4216-A582-414CBF3277C8",
  associatedSlotIds: ['87D31830-2C04-4CE2-A4EC-BBA7274B8F54'],
  sourceItemId: boots.id
});


export const heroGold = Object.assign({ ...gold }, {
  id: "D91C9974-391E-4F1B-B589-E3F7F684AF63",
  associatedSlotIds: ['3BD7A769-1179-46A9-9989-7A27A07A630B'],
  sourceItemId: gold.id
});


export const heroPotion = Object.assign({ ...potion }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  associatedSlotIds: ['EE208A7E-3047-43A8-947E-31C11AC6A319'],
  sourceItemId: potion.id
});


export const heroInventory: IInventoryDeclaration = {
  id: "D8B00220-0B1D-4F3E-89A1-7EAA5375C08C",
  isInventory: true,
  isEntity: true,
  isMixin: true,
  slots: [
    commonSlot1,
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
    heroSword,
    heroAxe,
    heroStaff,
    heroBoots,
    heroGold,
    heroPotion
  ],
}

export const hero: IHeroDeclaration = {
  id: "6DA46033-52F9-4BB5-874C-90311A0AB036",
  name: "X",
  raceId: human.id,
  classId: mage.id,
  originId: adventurer.id,
  defence: defenceStatistic,
  health: improvableHealthStatistic,
  attackPower: improvableAttackPowerStatistic,
  spellPower: improvableSpellPowerStatistic,
  movement: improvableMovementStatistic,
  majorAction: improvableMajorActionStatistic,
  minorAction: improvableMinorActionStatistic,
  moveAction: improvableMoveActionStatistic,
  isEntity: true,
  isProgressable: true,
  isBoardObject: true,
  isActor: true,
  isInventoryBearer: true,
  isControllable: true,
  isDefeatable: true,
  isTraveler: true,
  isStatisticBearer: true,
  isAbilityPerformer: true,
  isQuestResolver: true,
  isPerkBearer: true,
  isHero: true,
  level: 1,
  experiencePoints: 0,
  promotions: [],
  outlets: [Side.Top],
  size: Size.Medium,
  inventory: heroInventory,
  occupiedAreaId: FIRST_AREA_ID,
  abilities: [
    basicAttack,
    move,
    fireball,
    teleport,
    healing,
    vision,
    weakness,
    curse,
    meteorShower
  ],
  activeQuests: [],
  completedQuestIds: [],
  perks: [
    additionalAtackPerk,
    dualWieldPerk
  ]
}