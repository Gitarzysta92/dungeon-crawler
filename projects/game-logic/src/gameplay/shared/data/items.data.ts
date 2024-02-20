import { EntityLifecycle } from "../../../lib/base/entity/entity.constants"
import { IInteractionSubject } from "../../../lib/cross-cutting/interaction/interaction.interface"
import { CAST_EFFECT_INTERACTION_IDENTIFIER } from "../../../lib/modules/effect/aspects/interactions/cast-effect.interaction"
import { EffectCastTime, EffectLifetime, CastingStepType } from "../../../lib/modules/effect/effect.constants"
import { IEffectDefinition } from "../../../lib/modules/effect/effect.interface"
import { EQUIP_INTERACTION_IDENTIFIER } from "../../../lib/modules/item/aspects/interactions/equip.interaction"
import { InventorySlotType } from "../../../lib/modules/item/inventory/inventory.constants"
import { IItem, IEquipable, IPossesedItem } from "../../../lib/modules/item/item.interface"
import { START_QUEST_INTERACTION_IDENTIFIER } from "../../../lib/modules/quest/interactions/start-quest.interaction"
import { IQuestOrigin } from "../../../lib/modules/quest/quest.interface"
import { TRADE_INTERACTION_IDENTIFIER } from "../../../lib/modules/trade/interactions/trade.interaction"
import { ITradable, ICurrency } from "../../../lib/modules/trade/trade.interface"
import { basicAttack } from "./abilities.data"
import { POO_ITEM_ID, MAGIC_POO_ITEM_ID, GATHER_ITEM_QUEST_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID } from "./common-identifiers.data"
import { improvableMajorActionStatistic, dealDamageFormula, healthStatistic, defenceStatistic, speedStatistic } from "./statistics.data"



export const staff: IItem & IEffectDefinition & IInteractionSubject & IEquipable & ITradable  = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  sourceItemId: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  isEntity: true,
  isEffect: true,
  isItem: true,
  isTradable: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  interaction: [
    { id: EQUIP_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
    { id: TRADE_INTERACTION_IDENTIFIER },
  ],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 2 }],
  maxStackSize: 1,
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
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  exposedModifiers: [
    { delegateId: "ability-parameters", payload: { abilityId: basicAttack.id, parameter: "repetitions", value: 2 } }
  ]
}


export const potion: IItem & IEffectDefinition & IInteractionSubject & ITradable = {
  id: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  sourceItemId: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  isEffect: true,
  isEntity: true,
  isItem: true,
  isTradable: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  interaction: [
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
    { id: TRADE_INTERACTION_IDENTIFIER },
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
        statisticId: healthStatistic.key,
        target: "{{$.castingSchema.actor}}",
        value: 10,
      }
    }
  },
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  maxStackSize: 20
}


export const gold: IItem & ICurrency = {
  id: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  sourceItemId: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  lifecycle: EntityLifecycle.Reusable,
  value: 1,
  maxStackSize: 9999,
  isEntity: true,
  isItem: true,
}


export const meleeWeapoon: IItem & IEffectDefinition & IInteractionSubject & IEquipable & ITradable = {
  id: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  sourceItemId: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  isEffect: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  lifecycle: EntityLifecycle.Reusable,
  interaction: [
    { id: EQUIP_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
    { id: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
    { id: TRADE_INTERACTION_IDENTIFIER },
  ],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 2 }],
  maxStackSize: 1,
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
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  isEntity: true,
  isItem: true,
  isTradable: true,
  exposedModifiers: []
}

export const boots: IItem & IInteractionSubject & IEquipable & ITradable = {
  id: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  sourceItemId: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  lifecycle: EntityLifecycle.Reusable,
  interaction: [
    { id: EQUIP_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.key }] },
    { id: TRADE_INTERACTION_IDENTIFIER },
  ],
  requiredSlots: [{ slotType: InventorySlotType.Weapon, amount: 2 }],
  maxStackSize: 1,
  exposedModifiers: [
    { delegateId: "modifiers:increase-statistic", payload: { type: defenceStatistic.key, value: 10, target: "{{$.equipableBearer}}" } },
    { delegateId: "modifiers:increase-statistic", payload: { type: speedStatistic.key, value: 1, target: "${{$.equipableBearer}}" } }
  ],
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  isEntity: true,
  isItem: true,
  isTradable: true
}


export const poo: IItem = {
  id: POO_ITEM_ID,
  sourceItemId: POO_ITEM_ID,
  lifecycle: EntityLifecycle.Disposable,
  maxStackSize: 1,
  isEntity: true,
  isItem: true
}

export const magicPoo: IItem & IQuestOrigin & ITradable = {
  id: MAGIC_POO_ITEM_ID,
  sourceItemId: MAGIC_POO_ITEM_ID,
  lifecycle: EntityLifecycle.Disposable,
  interaction: [
    { id: TRADE_INTERACTION_IDENTIFIER },
    { id: START_QUEST_INTERACTION_IDENTIFIER }
  ],
  startQuestIds: [GATHER_ITEM_QUEST_ID],
  maxStackSize: 1,
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  isEntity: true,
  isItem: true,
  isTradable: true,
  isQuestOrigin: true
}


export const vendorHealingPotion = Object.assign({ ...potion }, {
  id: "394AD757-7F78-46E5-9C92-746255F569F8",
  amountInStack: 10,
  slotIds: [VENDOR_FIRST_COMMON_SLOT_ID],
  sourceItemId: potion.id
}) as typeof potion & IPossesedItem;


export const vendorStaff = Object.assign({ ...staff }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  amountInStack: 1,
  slotIds: [VENDOR_SECOND_COMMON_SLOT_ID],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItem;


export const vendorMagicPoo = Object.assign(magicPoo, {
  slotIds: [VENDOR_THIRD_COMMON_SLOT_ID],
  amountInStack: 1,
});


