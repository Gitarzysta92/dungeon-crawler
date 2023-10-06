import { ICharacter } from "../lib/features/actors/actors.interface"
import { ActorType } from "../lib/features/actors/actors.constants"
import { AreaUnlockConditionType } from "../lib/features/adventure/area.constants"
import { IArea, IHeroLevelCondition } from "../lib/features/adventure/area.interface"
import { InventorySlotType } from "../lib/features/items/inventory.constants"
import { IPossesedItem } from "../lib/features/items/inventory.interface"
import { ItemType } from "../lib/features/items/items.constants"
import { IQuest } from "../lib/features/quests/quests.interface"
import { firstAreaId, secondAreaId, firstAreaTavernId, characterId, vendorFirstCommonSlotId, vendorSecondCommonSlotId, vendorThirdCommonSlotId, dungeonAreaId } from "./common-identifiers.data"
import { magicPoo, potion, staff } from "./items.data"
import { gatherItemQuest } from "./quests.data"


export const firstArea: IArea = {
  id: firstAreaId,
  name: "Area1",
  areaConnections: [
    {
      fromAreaId: firstAreaId,
      toAreaId: secondAreaId,
      distance: 10
    }
  ],
  unlockConditions: [
    {
      conditionType: AreaUnlockConditionType.HeroLevel,
      level: 1,
    } as IHeroLevelCondition
  ]
} 

export const firstAreaTavern: IArea = {
  id: firstAreaTavernId,
  name: "Area1Tavern",
  parentAreaId: firstArea.id,
  areaConnections: [],
  unlockConditions: []
}


export const dungeonArea: IArea = {
  id: dungeonAreaId,
  name: "DungeonAreaId",
  parentAreaId: firstArea.id,
  areaConnections: [],
  unlockConditions: []
}


export const secondArea: IArea = {
  id: secondAreaId,
  name: "Area2",
  areaConnections: [
    {
      fromAreaId: secondAreaId,
      toAreaId: firstAreaId,
      distance: 10
    }
  ],
  unlockConditions: [
    {
      conditionType: AreaUnlockConditionType.HeroLevel,
      level: 2,
    } as IHeroLevelCondition
  ]
} 


export const areas: IArea[] = [firstArea, firstAreaTavern, secondArea];

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

export const vendorCharacter: ICharacter & { quests: IQuest[] } = {
  actorType: ActorType.Character,
  id: characterId,
  inventory: {
    id: "8FC1D4E6-03EC-4C00-95AE-624D446EF71C",
    actorId: characterId,
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
  quests: []
}


export const characters = [
  vendorCharacter
]

export const quests = [
  Object.assign({ ...gatherItemQuest }, { originId: vendorCharacter.id })
]