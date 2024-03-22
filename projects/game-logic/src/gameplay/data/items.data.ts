import { IInteractionSubject } from "../../lib/cross-cutting/interaction/interaction.interface"
import { ABILITY_MODIFIER } from "../../lib/modules/abilities/aspects/modifiers/ability.modifier"
import { CAST_EFFECT_INTERACTION_IDENTIFIER } from "../../lib/modules/effects/aspects/interactions/cast-effect.interaction"
import { EffectCastTime, EffectLifetime, CastingStepType } from "../../lib/modules/effects/entities/effect.constants"
import { IEffectDeclaration } from "../../lib/modules/effects/entities/effect.interface"
import { EQUIP_INTERACTION_IDENTIFIER } from "../../lib/modules/items/aspects/interactions/equip.interaction"
import { IEquipableItemDeclaration, IPossesedItemDeclaration } from "../../lib/modules/items/entities/item/item.interface"
import { IItemDeclaration } from "../../lib/modules/items/entities/item/item.interface"
import { START_QUEST_INTERACTION_IDENTIFIER } from "../../lib/modules/quest/aspects/interactions/start-quest.interaction"
import { IQuestOriginDeclaration } from "../../lib/modules/quest/entities/quest-origin/quest-origin.interface"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { TRADE_INTERACTION } from "../../lib/modules/vendors/aspects/interactions/trade.interaction"
import { ITradable, ICurrency } from "../../lib/modules/vendors/entities/tradable/trade.interface"
import { basicAttack } from "./abilities.data"
import { POO_ITEM_ID, MAGIC_POO_ITEM_ID, GATHER_ITEM_QUEST_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID, WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT, COMMON_SLOT_1, BOOTS_SLOT } from "./common-identifiers.data"
import { improvableMajorActionStatistic, dealDamageFormula, healthStatistic, defenceStatistic, spellPowerStatistic } from "./statistics.data"



export const staff: IEquipableItemDeclaration & IEffectDeclaration & IInteractionSubject & ITradable  = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  sourceItemId: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  isEntity: true,
  isEffect: true,
  isItem: true,
  isTradable: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  interaction: [
    { delegateId: EQUIP_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id }] },
    { delegateId: TRADE_INTERACTION },
  ],
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, denyEquppingFor: [{ slotId: WEAPON_SECOND_SLOT }] }],
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
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  exposeModifiers: [
    { delegateId: ABILITY_MODIFIER, payload: { abilityId: basicAttack.id, parameter: "repetitions", value: 2 } }
  ]
}


export const potion: IItemDeclaration & IEffectDeclaration & IInteractionSubject & ITradable = {
  id: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  sourceItemId: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  isEffect: true,
  isEntity: true,
  isItem: true,
  isTradable: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  interaction: [
    { delegateId: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
    { delegateId: TRADE_INTERACTION },
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
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
}


export const gold: IItemDeclaration & ICurrency = {
  id: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  sourceItemId: "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
  value: 1,
  isEntity: true,
  isItem: true,
}


export const twoHandedSword: IItemDeclaration & IEffectDeclaration & IInteractionSubject & IEquipableItemDeclaration & ITradable = {
  id: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  sourceItemId: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  isEffect: true,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  interaction: [
    { delegateId: EQUIP_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
    { delegateId: CAST_EFFECT_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] },
    { delegateId: TRADE_INTERACTION },
  ],
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, denyEquppingFor: [{ slotId: WEAPON_SECOND_SLOT }] }],
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
  exposeModifiers: []
}

export const boots: IItemDeclaration & IInteractionSubject & IEquipableItemDeclaration & ITradable = {
  id: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  sourceItemId: "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
  interaction: [
    { delegateId: EQUIP_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id }] },
    { delegateId: TRADE_INTERACTION },
  ],
  equipableTo: [{ slotId: BOOTS_SLOT }],
  exposeModifiers: [
    { delegateId: "modifiers:increase-statistic", payload: { type: defenceStatistic.id, value: 10, target: "{{$.equipableBearer}}" } },
    { delegateId: "modifiers:increase-statistic", payload: { type: spellPowerStatistic.id, value: 1, target: "${{$.equipableBearer}}" } }
  ],
  sellBasePrice: [{ value: 0 }],
  buyBasePrice: [{ value: 0 }],
  isEntity: true,
  isItem: true,
  isTradable: true
}


export const poo: IItemDeclaration = {
  id: POO_ITEM_ID,
  sourceItemId: POO_ITEM_ID,
  isEntity: true,
  isItem: true
}

export const magicPoo: IItemDeclaration & IQuestOriginDeclaration & ITradable = {
  id: MAGIC_POO_ITEM_ID,
  sourceItemId: MAGIC_POO_ITEM_ID,
  interaction: [
    { delegateId: TRADE_INTERACTION },
    { delegateId: START_QUEST_INTERACTION_IDENTIFIER }
  ],
  startQuestIds: [GATHER_ITEM_QUEST_ID],
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
}) as typeof potion & IPossesedItemDeclaration;


export const vendorStaff = Object.assign({ ...staff }, {
  id: "86DBE683-9130-4771-801E-DCA914C9DCFB",
  amountInStack: 1,
  slotIds: [VENDOR_SECOND_COMMON_SLOT_ID],
  sourceItemId: staff.id
}) as typeof staff & IPossesedItemDeclaration;


export const vendorMagicPoo = Object.assign(magicPoo, {
  slotIds: [VENDOR_THIRD_COMMON_SLOT_ID],
  amountInStack: 1,
});


