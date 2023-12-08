import { ActorType, Outlet } from "../lib/features/actors/actors.constants"
import { IUnassignedBoardObject } from "../lib/features/board/board.interface"
import { IHero } from "../lib/features/hero/hero.interface"
import { InventorySlotType } from "../lib/features/items/inventory.constants"
import { IInventory, IPossesedItem } from "../lib/features/items/inventory.interface"
import { ItemType } from "../lib/features/items/items.constants"
import { playerGroupId } from "./common-identifiers.data"
import { meleeWeapoon, boots, potion, gold, staff } from "./items.data"


export const hero: IHero & IUnassignedBoardObject = {
  id: "6DA46033-52F9-4BB5-874C-90311A0AB036",
  level: 1,
  majorAction: 1,
  majorActionRegain: 1,
  minorAction: 2,
  minorActionRegain: 2,
  moveAction: 1,
  moveActionRegain: 1,
  groupId: playerGroupId,
  defence: 10,
  defenceUpperLimit: 10,
  source: 1000,
  sourceUpperLimit: 1000,
  speed: 1,
  speedUpperLimit: 1,
  sight: 1,
  sightUpperLimit: 1,
  health: 10,
  healthUpperLimit: 10,
  attackPower: 5,
  attackPowerUpperLimit: 5,
  spellPower: 5,
  spellPowerUpperLimit: 5,
  actorType: ActorType.Hero,
  abilities: {},
  occupiedAreaId: "",
  experiencePoints: 0,
  outlets: [Outlet.Top],
  sourceActorId: "6DA46033-52F9-4BB5-874C-90311A0AB036"
}


export const heroSword: typeof meleeWeapoon & IPossesedItem = Object.assign({ ...meleeWeapoon }, {
  id: "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
  name: "Sword",
  amountInStack: 1,
  itemType: ItemType.Weapon,
  slotIds: ['5A99BB51-B603-4975-AD1E-F2113668FBE2'],
  sourceItemId: meleeWeapoon.id
}) as typeof meleeWeapoon & IPossesedItem;

export const heroAxe = Object.assign({ ...meleeWeapoon }, {
  id: "F95D81C3-1A5C-43DF-B3D6-081D36397684",
  name: "Axe",
  amountInStack: 1,
  itemType: ItemType.Weapon,
  slotIds: ['B921716D-9E2C-4C8C-A2F1-E39857D2634B'],
  sourceItemId: meleeWeapoon.id
}) as typeof meleeWeapoon & IPossesedItem;

export const heroStaff = Object.assign({ ...staff }, {
  id: "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
  name: "Staff",
  amountInStack: 1,
  itemType: ItemType.Weapon,
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