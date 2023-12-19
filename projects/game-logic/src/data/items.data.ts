import { IBasicStats, ISecondaryStats } from "../lib/features/actors/actors.interface";
import { ActorType } from "../lib/features/actors/actors.constants";
import { Outlet } from "../lib/features/board/board.constants";
import { EffectName, DamageType, EffectLifeTime, EffectTargetingResolveTime } from "../lib/features/effects/commons/effect.constants";
import { InventorySlotType } from "../lib/features/items/inventory.constants";
import { ItemType, CurrencyType } from "../lib/features/items/items.constants";
import { ICurrencyItem, IItem } from "../lib/features/items/items.interface";
import { IQuestStarter } from "../lib/features/quests/quests.interface";
import { InteractionType, IEquipable, IPurchasable, IDisposable, IReusable } from "../lib/features/interactions/interactions.interface";
import { gatherItemQuestId, pooItemId } from "./common-identifiers.data";
import { IBoardSelector } from "../lib/features/board/board.interface";
import { IDealDamage } from "../lib/features/effects/deal-damage/deal-damage.interface";
import { IModifyStats } from "../lib/features/effects/modify-statistics/modify-statistics.interface";


export const staff: IItem & IEquipable & IDealDamage & IPurchasable & IBoardSelector = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  sourceItemId: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  name: 'Staff',
  itemType: ItemType.Weapon,
  interactionType: [InteractionType.Purchasable, InteractionType.Equipable],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 2 }],
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectName: EffectName.DealDamage,
  effectTargetingSelector: {
    targetingActors: [ActorType.Creature],
    selectorTargets: "single",
  },
  damageValue: 10,
  damageType: DamageType.Magical,
  selectorType: 'line',
  selectorRange: 1,
  equipCost: [{
    costValue: 1,
    costType: 'majorAction'
  }],
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 1
}

export const potion: IItem & IDisposable & IModifyStats<IBasicStats> & IPurchasable & IBoardSelector = {
  id: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  sourceItemId: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  name: "Potion",
  itemType: ItemType.Potion,
  interactionType: [InteractionType.Disposable, InteractionType.Purchasable],
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectName: EffectName.ModifyStats,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero, ActorType.Character],
    selectorTargets: "single",
  },
  statsModifications: [
    {
      statName: 'health',
      modiferValue: 20,
      modifierType: 'add',
    }
  ],
  selectorType: 'line',
  selectorRange: 1,
  utilizationCost: [{
    costValue: 20,
    costType: 'source'
  }],
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 20
}

export const poo: IItem = {
  id: pooItemId,
  sourceItemId: pooItemId,
  name: "Poo",
  itemType: ItemType.QuestItem,
  maxStackSize: 1
}

export const magicPoo: IItem & IPurchasable & IReusable & IQuestStarter = {
  id: "5FACE487-1C9F-4539-8910-E4A68B4617D6",
  sourceItemId: "5FACE487-1C9F-4539-8910-E4A68B4617D6",
  name: "Magic Poo",
  itemType: ItemType.QuestItem,
  interactionType: [InteractionType.Purchasable],
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 1,
  utilizationCost: [],
  startQuestId: gatherItemQuestId,
  sellBasePrice: 10,
  buyBasePrice: 10,
  
}

export const gold: ICurrencyItem = {
  id: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  sourceItemId: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  name: "Gold",
  itemType: ItemType.Currency,
  currencyType: CurrencyType.Gold,
  maxStackSize: 9999
}


export const meleeWeapoon: IItem & IEquipable & IDealDamage & IPurchasable & IBoardSelector = {
  id: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  sourceItemId: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  name: "Melee Weapoon",
  interactionType: [InteractionType.Equipable, InteractionType.Purchasable],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 1 }],
  itemType: ItemType.Weapon,
  effectLifeTime: EffectLifeTime.Instantaneous,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectName: EffectName.DealDamage,
  damageValue: 10,
  damageType: DamageType.Phisical,
  effectTargetingSelector: {
    targetingActors: [ActorType.Creature],
    selectorTargets: "single",
  },
  selectorType: 'line',
  selectorRange: 1,
  equipCost: [{
    costValue: 1,
    costType: 'majorAction'
  }],
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 1
}

export const boots: IItem & IEquipable & IPurchasable & IModifyStats<ISecondaryStats> = {
  id: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  sourceItemId: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  name: "Boots",
  itemType: ItemType.Boots,
  interactionType: [InteractionType.Equipable, InteractionType.Purchasable],
  requiredSlots: [{ slotType: InventorySlotType.Feet, amount: 1 }],
  effectName: EffectName.ModifyStats,
  effectLifeTime: EffectLifeTime.Lasting,
  effectResolveTime: EffectTargetingResolveTime.Immediate,
  effectTargetingSelector: {
    targetingActors: [ActorType.Hero],
    selectorTargets: "single",
  },
  statsModifications: [
    {
      statName: 'speed',
      modiferValue: 1,
      modifierType: 'add',
    }
  ],
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  equipCost: [{
    costValue: 1,
    costType: 'majorAction'
  }],
  maxStackSize: 1
}