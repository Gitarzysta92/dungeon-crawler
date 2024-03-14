import { InventorySlotType } from "../../lib/modules/items/entities/inventory-slot/inventory-slot.constants"
import { IInventorySlotDeclaration } from "../../lib/modules/items/entities/inventory-slot/inventory-slot.interface"
import { COMMON_SLOT_1, COMMON_SLOT_2, COMMON_SLOT_3, COMMON_SLOT_4, COMMON_SLOT_5, WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT } from "./common-identifiers.data"

export const commonSlot1: IInventorySlotDeclaration = {
  id: COMMON_SLOT_1,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true
}

export const commonSlot2: IInventorySlotDeclaration = {
  id: COMMON_SLOT_2,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true
}

export const commonSlot3: IInventorySlotDeclaration = {
  id: COMMON_SLOT_3,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true
}

export const commonSlot4: IInventorySlotDeclaration = {
  id: COMMON_SLOT_4,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true
}

export const commonSlot5: IInventorySlotDeclaration = {
  id: COMMON_SLOT_5,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true
}

export const weaponFirstSlot: IInventorySlotDeclaration = {
  id: WEAPON_FIRST_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true
}

export const weaponSecondSlot: IInventorySlotDeclaration = {
  id: WEAPON_SECOND_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true
}

export const bootsSlot: IInventorySlotDeclaration = {
  id: WEAPON_SECOND_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true
}