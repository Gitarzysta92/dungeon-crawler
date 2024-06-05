import { IActivityResource } from "../../lib/base/activity/activity.interface"
import { ABILITY_MODIFIER } from "../../lib/modules/abilities/aspects/modifiers/ability.modifier"
import { CAST_EFFECT_ACTIVITY } from "../../lib/modules/effects/aspects/interactions/cast-effect.interaction"
import { CastingStepType, EffectCastTime, EffectLifetime } from "../../lib/modules/effects/entities/effect.constants"
import { IEffectDeclaration } from "../../lib/modules/effects/entities/effect.interface"
import { IEquipableItemDeclaration, IItemDeclaration, IPossesedItemDeclaration } from "../../lib/modules/items/entities/item/item.interface"
import { EQUIP_ITEM_ACTIVITY, ItemRarity } from "../../lib/modules/items/items.constants"
import { IQuestOriginDeclaration } from "../../lib/modules/quest/entities/quest-origin/quest-origin.interface"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { ICurrencyDeclaration } from "../../lib/modules/vendors/entities/currency/currency.interface"
import { ITradableDeclaration } from "../../lib/modules/vendors/entities/tradable/trade.interface"
import { basicAttack } from "./abilities.data"
import { BOOTS_SLOT, GOLD_CURRENCY, MAGIC_POO_ITEM_ID, POO_ITEM_ID, TRAVEL_SUPPLIES_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID, WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT } from "./common-identifiers.data"
import { gatherItemQuest } from "./quests.data"
import { dealDamageFormula, defenceStatistic, healthStatistic, spellPowerStatistic } from "./statistics.data"



export const staff: IEquipableItemDeclaration & IEffectDeclaration & ITradableDeclaration  = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  sourceItemId: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  isEntity: true,
  isEffect: true,
  isItem: true,
  isTradable: true,
  isMixin: true,
  isActivitySubject: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  activities: [
    { id: EQUIP_ITEM_ACTIVITY, isActivity: true, isMixin: true },
  ],
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, reserveSlotId: [WEAPON_SECOND_SLOT] }],
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      amount: 1,
      selectors: [
        { delegateId: "selector:actor", payload: { notInGroup: "{{$.caster.group}}" } },
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 1 } }
      ]
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
      payload: {
        value: 10,
        caster: "{{$.caster}}",
        target: "{{$.castingSteps.actor}}",
        multiplier: "{{&.associatedEquipmentSlot}}",
        formula: dealDamageFormula
      }
    }
  },
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  exposeModifiers: [
    { delegateId: ABILITY_MODIFIER, payload: { abilityId: basicAttack.id, parameter: "repetitions", value: 2 } }
  ],
  rarity: ItemRarity.Common
}


export const potion: IEquipableItemDeclaration & IEffectDeclaration & ITradableDeclaration = {
  id: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  sourceItemId: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  isEffect: true,
  isEntity: true,
  isActivitySubject: true,
  isItem: true,
  isTradable: true,
  isMixin: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  equipableTo: [],
  activities: [
    { id: EQUIP_ITEM_ACTIVITY, isActivity: true, isMixin: true },
  ],
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      payload: "{{$.caster}}"
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "restore-statistic",
      payload: {
        statisticId: healthStatistic.id,
        target: "{{$.castingSchema.actor}}",
        value: 10,
      }
    }
  },
  sellBasePrice: [{ value: 0, currencyId: "" }],
  buyBasePrice: [{ value: 0, currencyId: "" }],
  rarity: ItemRarity.Common
}


export const gold: IItemDeclaration & ICurrencyDeclaration = {
  id: GOLD_CURRENCY,
  sourceItemId: GOLD_CURRENCY,
  value: 1,
  isEntity: true,
  isItem: true,
  isMixin: true,
  isCurrency: true,
  rarity: ItemRarity.Common
}


export const twoHandedSword: IItemDeclaration & IEffectDeclaration & IEquipableItemDeclaration & ITradableDeclaration = {
  id: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  sourceItemId: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  isEffect: true,
  isActivitySubject: true,
  isMixin: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  activities: [
    { id: EQUIP_ITEM_ACTIVITY, isActivity: true, isMixin: true },
    { id: CAST_EFFECT_ACTIVITY, isActivity: true, isMixin: true },
  ],
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, reserveSlotId: [WEAPON_SECOND_SLOT] }],
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: "actor",
      amount: 1,
      selectors: [
        { delegateId: "selector:actor", payload: { notInGroup: "{{$.caster.group}}" } },
        { delegateId: "selector:board", payload: { origin: "{{$.caster}}", shape: "line", range: 1 } }
      ]
    },
    makeAction: {
      predecessorRef: "{{$.castingSchema.actor}}",
      stepType: CastingStepType.MakeAction,
      delegateId: "modify-statistic-by-formula",
      payload: {
        value: 10,
        caster: "{{$.caster}}",
        target: "{{$.castingSteps.actor}}",
        formula: dealDamageFormula
      }
    }
  },
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  isEntity: true,
  isItem: true,
  isTradable: true,
  exposeModifiers: [],
  rarity: ItemRarity.Common
}

export const boots: IItemDeclaration & IEquipableItemDeclaration & ITradableDeclaration = {
  id: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  sourceItemId: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  activities: [
    { id: EQUIP_ITEM_ACTIVITY, isActivity: true, isMixin: true },
  ],
  equipableTo: [{ slotId: BOOTS_SLOT }],
  exposeModifiers: [
    { delegateId: "modifiers:increase-statistic", payload: { type: defenceStatistic.id, value: 10, target: "{{$.equipableBearer}}" } },
    { delegateId: "modifiers:increase-statistic", payload: { type: spellPowerStatistic.id, value: 1, target: "${{$.equipableBearer}}" } }
  ],
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  isEntity: true,
  isItem: true,
  isTradable: true,
  isActivitySubject: true,
  isMixin: true,
  rarity: ItemRarity.Common
}


export const poo: IItemDeclaration = {
  id: POO_ITEM_ID,
  sourceItemId: POO_ITEM_ID,
  isEntity: true,
  isItem: true,
  isMixin: true,
  rarity: ItemRarity.Common
}

export const magicPoo: IItemDeclaration & IQuestOriginDeclaration & ITradableDeclaration = {
  id: MAGIC_POO_ITEM_ID,
  sourceItemId: MAGIC_POO_ITEM_ID,
  exposedQuests: [gatherItemQuest],
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  isEntity: true,
  isItem: true,
  isTradable: true,
  isQuestOrigin: true,
  isMixin: true,
  rarity: ItemRarity.Legendary
}

export const travelSupplies: IItemDeclaration & IActivityResource & ITradableDeclaration = {
  id: TRAVEL_SUPPLIES_ID,
  sourceItemId: TRAVEL_SUPPLIES_ID,
  isEntity: true,
  isItem: true,
  isMixin: true,
  isResource: true,
  isTradable: true,
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  rarity: ItemRarity.Common
}


export const vendorHealingPotion = Object.assign({ ...potion }, {
  id: "394AD757-7F78-46E5-9C92-746255F569F8",
  amount: 10,
  associatedSlotIds: [VENDOR_FIRST_COMMON_SLOT_ID],
  sourceItemId: potion.id
}) as typeof potion & IPossesedItemDeclaration;


export const vendorStaff = Object.assign({ ...staff }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  amount: 1,
  associatedSlotIds: [VENDOR_SECOND_COMMON_SLOT_ID],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItemDeclaration;


export const vendorMagicPoo = Object.assign({...magicPoo}, {
  associatedSlotIds: [VENDOR_THIRD_COMMON_SLOT_ID],
  amount: 1,
});


