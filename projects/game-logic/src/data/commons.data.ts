import { ActorType } from "../lib/features/actors/actors.constants"
import { IHero } from "../lib/features/actors/hero.interface"
import { InventorySlotType } from "../lib/features/items/inventory.constants"
import { IInventory, IPossesedItem } from "../lib/features/items/inventory.interface"
import { ItemType } from "../lib/features/items/items.constants"
import { meleeWeapoon, boots, potion, gold, staff } from "./items.data"


export const groupId = "545F3A2B-6FD2-4A4C-B2D2-2BA9D774F665";

export const hero: IHero = {
  id: "6DA46033-52F9-4BB5-874C-90311A0AB036",
  majorActions: 1,
  minorActions: 2,
  moveActions: 1,
  groupId: "9C63329E-7E67-43FF-99CD-E3D15DABB635",
  defence: 10,
  source: 10,
  speed: 1,
  sight: 1,
  health: 10,
  attackPower: 5,
  spellPower: 5,
  actorType: ActorType.Hero,
  abilities: {},
  occupiedAreaId: ""
}


export const heroSword = Object.assign({ ...meleeWeapoon }, {
  id: "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
  name: "Sword",
  amountInStack: 1,
  itemType: ItemType.Sword,
  slotIds: ['5A99BB51-B603-4975-AD1E-F2113668FBE2'],
  sourceItemId: meleeWeapoon.id
}) as typeof meleeWeapoon & IPossesedItem;

export const heroAxe = Object.assign({ ...meleeWeapoon }, {
  id: "F95D81C3-1A5C-43DF-B3D6-081D36397684",
  name: "Axe",
  amountInStack: 1,
  itemType: ItemType.Axe,
  slotIds: ['B921716D-9E2C-4C8C-A2F1-E39857D2634B'],
  sourceItemId: meleeWeapoon.id
}) as typeof meleeWeapoon & IPossesedItem;

export const heroStaff = Object.assign({ ...staff }, {
  id: "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
  name: "Staff",
  amountInStack: 1,
  itemType: ItemType.Axe,
  slotIds: [],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItem;

export const heroBoots = Object.assign({ ...boots }, {
  id: "714DF949-8CE2-4216-A582-414CBF3277C8",
  name: "Boots",
  amountInStack: 1,
  itemType: ItemType.Boots,
  slotIds: ['87D31830-2C04-4CE2-A4EC-BBA7274B8F54'],
  sourceItemId: boots.id
}) as typeof boots & IPossesedItem;;

export const heroGold = Object.assign({ ...gold }, {
  id: "D91C9974-391E-4F1B-B589-E3F7F684AF63",
  name: "Gold",
  amountInStack: 100,
  itemType: ItemType.Currency,
  slotIds: ['3BD7A769-1179-46A9-9989-7A27A07A630B'],
  sourceItemId: gold.id
}) as typeof gold & IPossesedItem;;

export const heroPotion = Object.assign({ ...potion }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  name: "Healing potion",
  amountInStack: 10,
  itemType: ItemType.Potion,
  slotIds: ['EE208A7E-3047-43A8-947E-31C11AC6A319'],
  sourceItemId: potion.id 
}) as typeof potion & IPossesedItem;


export const weaponSecondSlot =     {
  id: 'E01C92FA-8AC4-4005-8A5E-B44604C0D747',
  slotType: InventorySlotType.Weapon,
}


export const heroInventory: IInventory = {
  id: "188A47A9-52CE-4D67-ABC1-12178F92A8AC",
  actorId: "6DA46033-52F9-4BB5-874C-90311A0AB036",
  slots: [
    {
      id: '5A99BB51-B603-4975-AD1E-F2113668FBE2',
      slotType: InventorySlotType.Weapon,
      isOccupied: true
    },
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
