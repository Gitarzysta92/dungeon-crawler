import { IActivityResource } from "../../lib/base/activity/activity.interface"
import { ProcedureStepTrigger } from "../../lib/base/procedure/procedure.constants"
import { IProcedureDeclaration } from "../../lib/base/procedure/procedure.interface"
import { IMakeActionProcedureStepDeclaration } from "../../lib/cross-cutting/action/action.interface"
import { IGatheringDataProcedureStepDeclaration } from "../../lib/cross-cutting/gatherer/data-gatherer.interface"
import { ABILITY_MODIFIER } from "../../lib/modules/abilities/aspects/modifiers/ability.modifier"
import { ACTOR_DATA_TYPE } from "../../lib/modules/actors/actors.constants"
import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector"
import { DRAW_CARDS_ACTION } from "../../lib/modules/cards/aspects/actions/draw-cards.action"
import { PLAY_CARD_ACTIVITY } from "../../lib/modules/cards/cards.constants"
import { ICardDeclaration } from "../../lib/modules/cards/entities/card/card.interface"
import { IEquipableItemDeclaration, IItemDeclaration, IPossesedItemDeclaration } from "../../lib/modules/items/entities/item/item.interface"
import { EQUIP_ITEM_ACTIVITY, ItemRarity } from "../../lib/modules/items/items.constants"
import { IQuestOriginDeclaration } from "../../lib/modules/quest/entities/quest-origin/quest-origin.interface"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { REGAIN_STATISTIC_ACTION } from "../../lib/modules/statistics/aspects/actions/regain-statistic.action"
import { STATISTIC_RESOURCE_TYPE } from "../../lib/modules/statistics/statistics.constants"
import { ICurrencyDeclaration } from "../../lib/modules/vendors/entities/currency/currency.interface"
import { ITradableDeclaration } from "../../lib/modules/vendors/entities/tradable/trade.interface"
import { basicAttack } from "./cards.data"
import { BOOTS_SLOT, GOLD_CURRENCY, MAGIC_POO_ITEM_ID, POO_ITEM_ID, TRAVEL_SUPPLIES_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID, WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT } from "./common-identifiers.data"
import { gatherItemQuest } from "./quests.data"
import { dealDamageFormula, defenceStatistic, healthStatistic, improvableMajorActionStatistic, spellPowerStatistic } from "./statistics.data"



export const staff: IEquipableItemDeclaration & ICardDeclaration & ITradableDeclaration & IProcedureDeclaration  = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  sourceItemId: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  isCard: true,
  isProcedure: true,
  isEntity: true,
  isItem: true,
  isTradable: true,
  isMixin: true,
  isActivitySubject: true,
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, reserveSlotId: [WEAPON_SECOND_SLOT] }],
  activities: [
    { id: EQUIP_ITEM_ACTIVITY, isActivity: true, isMixin: true },
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.parameters.range}}" } }
          ],
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
          payload: {
            value: "{{$.subject.parameters.baseDamage}}",
            caster: "{{$.performer}}",
            target: "{{$.procedureSteps.actor}}",
            formula: dealDamageFormula
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  procedureSteps: {
    actor: {
      isInitialStep: true,
      isGatheringDataStep: true,
      dataType: ACTOR_DATA_TYPE,
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.parameters.range}}" } }
      ],
      amount: 1,
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.makeAction}}"
    } as IGatheringDataProcedureStepDeclaration,
    makeAction: {
      isMakeActionStep: true,
      delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
      payload: {
        value: "{{$.subject.parameters.baseDamage}}",
        caster: "{{$.performer}}",
        target: "{{$.procedureSteps.actor}}",
        formula: dealDamageFormula
      }
    } as IMakeActionProcedureStepDeclaration
  },
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  exposeModifiers: [
    { delegateId: ABILITY_MODIFIER, payload: { abilityId: basicAttack.id, parameter: "repetitions", value: 2 } }
  ],
  rarity: ItemRarity.Common
}




export const potion: IEquipableItemDeclaration & ICardDeclaration & ITradableDeclaration = {
  id: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  sourceItemId: "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
  isCard: true,
  isEntity: true,
  isActivitySubject: true,
  isItem: true,
  isTradable: true,
  isMixin: true,
  equipableTo: [],
  activities: [
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          payload: "{{$.performer}}",
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: REGAIN_STATISTIC_ACTION,
          payload: {
            statisticId: healthStatistic.id,
            target: "{{$.castingSchema.actor}}",
            value: 10,
          }
        } as IMakeActionProcedureStepDeclaration
      }
    }
  ],
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


export const twoHandedSword: IItemDeclaration & IEquipableItemDeclaration & ITradableDeclaration & IProcedureDeclaration = {
  id: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  sourceItemId: "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
  isProcedure: true,
  isActivitySubject: true,
  isMixin: true,
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, reserveSlotId: [WEAPON_SECOND_SLOT] }],
  activities: [
    { id: EQUIP_ITEM_ACTIVITY, isActivity: true, isMixin: true },
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: improvableMajorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.parameters.range}}" } }
          ],
          amount: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataProcedureStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
          payload: {
            value: "{{$.subject.parameters.baseDamage}}",
            caster: "{{$.performer}}",
            target: "{{$.procedureSteps.actor}}",
            formula: dealDamageFormula
          }
        } as IMakeActionProcedureStepDeclaration
      }
    },
  ],
  procedureSteps: {
    actor: {
      isInitialStep: true,
      isGatheringDataStep: true,
      dataType: ACTOR_DATA_TYPE,
      selectors: [
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.parameters.range}}" } }
      ],
      amount: 1,
      nextStepTrigger: ProcedureStepTrigger.AfterEach,
      nextStep: "{{$.procedureSteps.makeAction}}"
    } as IGatheringDataProcedureStepDeclaration,
    makeAction: {
      isMakeActionStep: true,
      delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
      payload: {
        value: "{{$.subject.parameters.baseDamage}}",
        caster: "{{$.performer}}",
        target: "{{$.procedureSteps.actor}}",
        formula: dealDamageFormula
      }
    } as IMakeActionProcedureStepDeclaration
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


