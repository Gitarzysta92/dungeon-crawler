import { EntityLifecycle } from "../../../lib/base/entity/entity.constants";
import { IAbilityPerformer } from "../../../lib/modules/ability/performer/ability-performer.interface";
import { IActor } from "../../../lib/modules/actor/actor.interface";
import { IAreaObject } from "../../../lib/modules/area/area-object/area-object.interface";
import { Side, Size } from "../../../lib/modules/board/board.constants";
import { IBoardObject } from "../../../lib/modules/board/board.interface";
import { IInventoryBearer } from "../../../lib/modules/item/bearer/inventory-bearer.interface";
import { InventorySlotType } from "../../../lib/modules/item/inventory/inventory.constants";
import { IInventorySlot, IInventory } from "../../../lib/modules/item/inventory/inventory.interface";
import { IPossesedItem } from "../../../lib/modules/item/item.interface";
import { IProgressable } from "../../../lib/modules/progression/progression.interface";
import { IStatisticBearer } from "../../../lib/modules/statistic/bearer/statistic-bearer.interface";
import { basicAttack, move, fireball, teleport, healing, vision, weakness, curse, meteorShower } from "./abilities.data";
import { FIRST_AREA_ID } from "./common-identifiers.data";
import { meleeWeapoon, staff, boots, gold, potion } from "./items.data";


export const heroSword: (typeof meleeWeapoon) & IPossesedItem = Object.assign({ ...meleeWeapoon }, {
  id: "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
  amountInStack: 1,
  slotIds: ['5A99BB51-B603-4975-AD1E-F2113668FBE2'],
  sourceItemId: meleeWeapoon.id
})

export const heroAxe = Object.assign({ ...meleeWeapoon }, {
  id: "F95D81C3-1A5C-43DF-B3D6-081D36397684",
  amountInStack: 1,
  slotIds: ['B921716D-9E2C-4C8C-A2F1-E39857D2634B'],
  sourceItemId: meleeWeapoon.id
});


export const heroStaff = Object.assign({ ...staff }, {
  id: "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
  amountInStack: 1,
  slotIds: [],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItem;


export const heroBoots = Object.assign({ ...boots }, {
  id: "714DF949-8CE2-4216-A582-414CBF3277C8",
  amountInStack: 1,
  slotIds: ['87D31830-2C04-4CE2-A4EC-BBA7274B8F54'],
  sourceItemId: boots.id
});


export const heroGold = Object.assign({ ...gold }, {
  id: "D91C9974-391E-4F1B-B589-E3F7F684AF63",
  amountInStack: 100,
  slotIds: ['3BD7A769-1179-46A9-9989-7A27A07A630B'],
  sourceItemId: gold.id
});


export const heroPotion = Object.assign({ ...potion }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  amountInStack: 10,
  slotIds: ['EE208A7E-3047-43A8-947E-31C11AC6A319'],
  sourceItemId: potion.id
});


export const weaponFirstSlot: IInventorySlot = {
  id: '5A99BB51-B603-4975-AD1E-F2113668FBE2',
  slotType: InventorySlotType.Weapon,
  isOccupied: true
}


export const weaponSecondSlot: IInventorySlot = {
  id: 'E01C92FA-8AC4-4005-8A5E-B44604C0D747',
  slotType: InventorySlotType.Weapon,
}


export const heroInventory: IInventory = {
  slots: [
    weaponFirstSlot,
    weaponSecondSlot,
    {
      id: '87D31830-2C04-4CE2-A4EC-BBA7274B8F54',
      slotType: InventorySlotType.Feet,
      isOccupied: true
    },
    {
      id: '3BD7A769-1179-46A9-9989-7A27A07A630B',
      slotType: InventorySlotType.Currency,
      isOccupied: true
    },
    {
      id: 'EE208A7E-3047-43A8-947E-31C11AC6A319',
      slotType: InventorySlotType.Common,
      isOccupied: true
    },
    {
      id: 'B921716D-9E2C-4C8C-A2F1-E39857D2634B',
      slotType: InventorySlotType.Common
    },
    {
      id: '832B4DB3-14D2-4185-A50C-455F43587201',
      slotType: InventorySlotType.Common
    },
    {
      id: '25496070-910A-4087-A463-286AE8B1FD49',
      slotType: InventorySlotType.Common
    },
    {
      id: 'A12B902F-6A67-4028-AD20-70A5584B5932',
      slotType: InventorySlotType.Common
    },
  ],
  items: [
    heroSword,
    heroAxe,
    heroStaff,
    heroBoots,
    heroGold,
    heroPotion
  ]
}

export const hero:
  IActor &
  IAreaObject &
  IStatisticBearer<[]> &
  IAbilityPerformer &
  IInventoryBearer &
  IBoardObject &
  IProgressable = {
  id: "6DA46033-52F9-4BB5-874C-90311A0AB036",
  lifecycle: EntityLifecycle.Reusable,
  isEntity: true,
  isProgressable: true,
  isBoardObject: true,
  isActor: true,
  isInventoryBearer: true,
  controllable: true,
  level: 1,
  outlets: [Side.Top],
  size: Size.Medium,
  inventory: heroInventory,
  experiencePoints: 0,
  promotions: [],
  isAreaObject: true,
  isStatisticBearer: true,
  isAbilityPerformer: true,
  occupiedAreaId: FIRST_AREA_ID,
  abilityIds: [
    basicAttack.id,
    move.id,
    fireball.id,
    teleport.id,
    healing.id,
    vision.id,
    weakness.id,
    curse.id,
    meteorShower.id
  ]
}