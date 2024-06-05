import { InventorySlotType } from "../../lib/modules/items/entities/inventory-slot/inventory-slot.constants"
import { IInventorySlotDeclaration } from "../../lib/modules/items/entities/inventory-slot/inventory-slot.interface"
import { BODY_SLOT, BOOTS_SLOT, COMMON_SLOT_1, COMMON_SLOT_2, COMMON_SLOT_3, COMMON_SLOT_4, COMMON_SLOT_5, GLOVE_SLOT, HEAD_SLOT, NECKCLACE_SLOT, WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT } from "./common-identifiers.data"

export const commonSlot1: IInventorySlotDeclaration = {
  id: COMMON_SLOT_1,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const commonSlot2: IInventorySlotDeclaration = {
  id: COMMON_SLOT_2,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const commonSlot3: IInventorySlotDeclaration = {
  id: COMMON_SLOT_3,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const commonSlot4: IInventorySlotDeclaration = {
  id: COMMON_SLOT_4,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const commonSlot5: IInventorySlotDeclaration = {
  id: COMMON_SLOT_5,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}


export const weaponFirstSlot: IInventorySlotDeclaration = {
  id: WEAPON_FIRST_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true,
}

export const weaponSecondSlot: IInventorySlotDeclaration = {
  id: WEAPON_SECOND_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const headSlot: IInventorySlotDeclaration = {
  id: HEAD_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const bodySlot: IInventorySlotDeclaration = {
  id: BODY_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const necklaceSlot: IInventorySlotDeclaration = {
  id: NECKCLACE_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const gloveSlot: IInventorySlotDeclaration = {
  id: GLOVE_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}

export const bootsSlot: IInventorySlotDeclaration = {
  id: BOOTS_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  isEntity: true,
  isMixin: true
}