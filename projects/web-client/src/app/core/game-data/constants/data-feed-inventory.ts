import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { InventorySlotType } from "@game-logic/lib/modules/items/mixins/inventory-slot/inventory-slot.constants";
import { BODY_SLOT, BOOTS_SLOT, COMMON_SLOT_1, GLOVE_SLOT, HEAD_SLOT, NECKCLACE_SLOT, WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT } from "./common-identifiers.data";
import { IInventorySlotDeclaration } from "@game-logic/lib/modules/items/mixins/inventory-slot/inventory-slot.interface";
import { AssetType } from "../../game-ui/constants/asset-type";

export const weaponFirstSlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: WEAPON_FIRST_SLOT,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'sword', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const weaponSecondSlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: WEAPON_SECOND_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'sword', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const headSlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: HEAD_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'helmet', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const bodySlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: BODY_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'armor', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const necklaceSlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: NECKCLACE_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'necklace', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const gloveSlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: GLOVE_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'glove', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const bootsSlot: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: BOOTS_SLOT,
  slotType: InventorySlotType.Equipment,
  stackMaxSize: 1,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'feet', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};


export const commonSlot1: IDataContainer<IInventorySlotDeclaration, INarrativeMedium, IUiMedium> = {
  id: COMMON_SLOT_1,
  slotType: InventorySlotType.Common,
  isInventorySlot: true,
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
}

export function createCommonSlots(quantity: number) {
  const slots = [];
  for (let i = 0; i < quantity; i++) {
    slots.push(Object.assign({ ...commonSlot1 }, { id: i + commonSlot1.id })) 
  }
  return slots;
}


export function createCommonSlotsV2(slots: Array<{ stackSize: number }>) {
  return slots.map((s, i) => Object.assign({ ...commonSlot1 }, { id:  i + commonSlot1.id, stackSize: s.stackSize }))
}