import { ActorType } from "../lib/features/actors/actors.constants";
import { ICharacter } from "../lib/features/actors/actors.interface";
import { InventorySlotType } from "../lib/features/items/inventory.constants";
import { IPossesedItem } from "../lib/features/items/inventory.interface";
import { ItemType } from "../lib/features/items/items.constants";
import { vendorCharacterId, vendorFirstCommonSlotId, vendorSecondCommonSlotId, vendorThirdCommonSlotId, firstAreaTavernId, gatherItemQuestId } from "./common-identifiers.data";
import { potion, staff, magicPoo } from "./items.data";


export const vendorHealingPotion = Object.assign({ ...potion }, {
  id: "394AD757-7F78-46E5-9C92-746255F569F8",
  name: "Healing potion",
  amountInStack: 10,
  itemType: ItemType.Potion,
  slotIds: [vendorFirstCommonSlotId],
  sourceItemId: potion.id
}) as typeof potion & IPossesedItem


export const vendorStaff = Object.assign({ ...staff }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  name: "Staff",
  amountInStack: 1,
  itemType: ItemType.Weapon,
  slotIds: [vendorSecondCommonSlotId],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItem


export const vendorMagicPoo = Object.assign(magicPoo, {
  slotIds: [vendorThirdCommonSlotId],
  amountInStack: 1,
})


export const vendorCharacter: ICharacter & { questIds: string[] } = {
  actorType: ActorType.Character,
  id: vendorCharacterId,
  inventory: {
    id: "8FC1D4E6-03EC-4C00-95AE-624D446EF71C",
    actorId: vendorCharacterId,
    slots: [
      {
        id: vendorFirstCommonSlotId,
        slotType: InventorySlotType.Common,
        isOccupied: true,
      },
      {
        id: vendorSecondCommonSlotId,
        slotType: InventorySlotType.Common,
        isOccupied: true
      },
      {
        id: vendorThirdCommonSlotId,
        slotType: InventorySlotType.Common,
        isOccupied: true,
      },
      {
        id: "75020F5A-CC48-457C-B8AE-B48F933F9C02",
        slotType: InventorySlotType.Common,
        isOccupied: false,
      },
    ],
    items: [
      vendorHealingPotion,
      vendorStaff,
      vendorMagicPoo
    ]
  },
  assignedAreaId: firstAreaTavernId,
  questIds: [gatherItemQuestId],
  sourceActorId: vendorCharacterId
}