import { IAction } from "../lib/features/action/actions.interface";
import { IBasicStats } from "../lib/features/actors/actor";
import { ActorType } from "../lib/features/actors/actor.constants";
import { IHeroStats } from "../lib/features/actors/hero";
import { EffectType, DamageType } from "../lib/features/effects/effects.constants";
import { IDealDamage, IModifyStats } from "../lib/features/effects/effects.interface";
import { InventorySlotType } from "../lib/features/items/inventory.constants";
import { ItemType, CurrencyType } from "../lib/features/items/items.constants";
import { ICurrencyItem, IItem } from "../lib/features/items/items.interface";
import { IQuestStarter } from "../lib/features/quest/quest.interface";
import { InteractionType, IEquipable, IPurchasable, IDisposable, IUsable } from "../lib/game/interactions.interface";
import { pooItemId } from "./common-identifiers";
import { gatherItemQuest } from "./quests";


export const staff: IItem & IAction & IEquipable & IDealDamage & IPurchasable = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  name: 'Staff',
  itemType: ItemType.Staff,
  interactionType: [InteractionType.Equipable, InteractionType.Purchasable],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 2 }],
  effectType: EffectType.DealDamage,
  damageValue: 10,
  damageType: DamageType.Magical,
  targetingActor: [ActorType.Enemy],
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  },
  equipCost: [{
    costValue: 1,
    costType: 'majorAction'
  }],
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 1
}

export const potion: IItem & IAction & IDisposable & IModifyStats<IBasicStats> & IPurchasable = {
  id: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  name: "Potion",
  itemType: ItemType.Potion,
  interactionType: [InteractionType.Disposable],
  targetType: ActorType.Hero,
  effectType: EffectType.ModifyStats,
  targetingActor: [ActorType.Hero, ActorType.Character],
  statName: 'health',
  modiferValue: 20,
  modifierType: 'add',
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  }, 
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
  name: "Poo",
  itemType: ItemType.QuestItem,
  maxStackSize: 1
}

export const magicPoo: IItem & IPurchasable & IUsable & IQuestStarter = {
  id: "5FACE487-1C9F-4539-8910-E4A68B4617D6",
  name: "Magic Poo",
  itemType: ItemType.QuestItem,
  interactionType: [InteractionType.Purchasable],
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 1,
  useCost: [],
  targetType: ActorType.Hero,
  startQuestId: gatherItemQuest.id,
  sellBasePrice: 10,
  buyBasePrice: 10,
  
}

export const gold: ICurrencyItem = {
  id: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  name: "Gold",
  itemType: ItemType.Currency,
  currencyType: CurrencyType.Gold,
  maxStackSize: 9999
}


export const meleeWeapoon: IItem & IAction & IEquipable & IDealDamage & IPurchasable = {
  id: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  name: "Melee Weapoon",
  interactionType: [InteractionType.Equipable, InteractionType.Purchasable],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 1 }],
  itemType: ItemType.Sword,
  effectType: EffectType.DealDamage,
  damageValue: 10,
  damageType: DamageType.Phisical,
  targetingActor: [ActorType.Enemy],
  boardSelector: {
    selectorType: 'line',
    selectorTargets: 'single',
    selectorOrigin: 'hero',
    selectorRange: 1,
    selectorDirection: 1,
  },
  equipCost: [{
    costValue: 1,
    costType: 'majorAction'
  }],
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  maxStackSize: 1
}

export const boots: IItem & IEquipable & IPurchasable & IModifyStats<IHeroStats> = {
  id: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  name: "Boots",
  itemType: ItemType.Boots,
  interactionType: [InteractionType.Equipable, InteractionType.Purchasable],
  requiredSlots: [{ slotType: InventorySlotType.Feet, amount: 1 }],
  effectType: EffectType.ModifyStats,
  statName: 'speed',
  modiferValue: 1,
  modifierType: 'add',
  sellBasePrice: 10,
  buyBasePrice: 10,
  purchaseCurrency: CurrencyType.Gold,
  equipCost: [{
    costValue: 1,
    costType: 'majorAction'
  }],
  maxStackSize: 1
}