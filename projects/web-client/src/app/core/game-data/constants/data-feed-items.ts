import { IMakeActionStepDeclaration } from "@game-logic/lib/cross-cutting/action/action.interface";
import { ICardDeclaration } from "@game-logic/lib/modules/cards/entities/card/card.interface";
import { IEquipableItemDeclaration, IItemDeclaration } from "@game-logic/lib/modules/items/entities/item/item.interface";
import { ItemRarity, EQUIP_ITEM_ACTIVITY, UNEQUIP_ITEM_ACTIVITY } from "@game-logic/lib/modules/items/items.constants";
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "@game-logic/lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action";
import { ITradableDeclaration } from "@game-logic/lib/modules/vendors/entities/tradable/trade.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { WEAPON_FIRST_SLOT, WEAPON_SECOND_SLOT, GOLD_CURRENCY, MAGIC_POO_ITEM_ID } from "./common-identifiers.data";
import { TRAVEL_SUPPLIES_ID } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { healthStatistic, majorActionStatistic } from "./data-feed-statistics.data";
import { ProcedureStepTrigger } from "@game-logic/lib/base/procedure/procedure.constants";
import { IGatheringDataStepDeclaration } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { ACTOR_DATA_TYPE } from "@game-logic/lib/modules/actors/actors.constants";
import { ACTOR_SELECTOR } from "@game-logic/lib/modules/actors/aspects/selectors/actor.selector";
import { BOARD_SELECTOR } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { DISCARD_ACTION } from "@game-logic/lib/modules/cards/aspects/actions/discard.action";
import { PLAY_CARD_ACTIVITY, DISCARD_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { MODIFY_STATISTIC_ACTION } from "@game-logic/lib/modules/statistics/aspects/actions/modify-statistic.action";
import { STATISTIC_RESOURCE_TYPE } from "@game-logic/lib/modules/statistics/statistics.constants";
import { IQuestOriginDeclaration } from "@game-logic/lib/modules/quest/entities/quest-origin/quest-origin.interface";
import { IActivityResource } from "@game-logic/lib/base/activity/activity.interface";
import { gatherItemQuest } from "./data-feed-quests";
import { IModifierExposerDeclaration } from "@game-logic/lib/cross-cutting/modifier/modifier.interface";
import { IStatusExposerDeclaration } from "@game-logic/lib/modules/statuses/mixins/status-exposer/status-exposer.interface";
import { STATISTIC_MODIFIER } from "@game-logic/lib/modules/statistics/aspects/modifiers/statistic.modifier";
import { ModifierType } from "@game-logic/lib/base/value/value.constants";
import { ITEM_EQUIPPED } from "@game-logic/lib/modules/items/aspects/conditions/equipped-item.condition";
import { DEAL_DAMAGE_MODIFIER } from "@game-logic/lib/modules/combat/aspects/modifiers/deal-damage.modifier";
import { AssetType } from "../../game-ui/constants/asset-type";


export const staffItem: IDataContainer<
  IEquipableItemDeclaration &
  ICardDeclaration &
  ITradableDeclaration &
  IModifierExposerDeclaration &
  IStatusExposerDeclaration, INarrativeMedium, IUiMedium> = {
  id: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  sourceItemId: "ECCD311F-0161-49D0-BA39-3C4968B42497",
  narrative: { name: "abilities.ECCD311F-0161-49D0-BA39-3C4968B42497.name", description: "abilities.ECCD311F-0161-49D0-BA39-3C4968B42497.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/staff", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  rarity: ItemRarity.Common,
  isCard: true,
  isEntity: true,
  isItem: true,
  isTradable: true,
  isMixin: true,
  isActivitySubject: true,
  isModifierExposer: true,
  isStatusExposer: true,
  equipableTo: [{ slotId: WEAPON_FIRST_SLOT, reserveSlotId: [WEAPON_SECOND_SLOT] }],
  statuses: [],
  modifiers: [
    { 
      delegateId: STATISTIC_MODIFIER,
      conditions: [{ delegateId: ITEM_EQUIPPED, payload: { item: "{{$}}", bearer: "{{$.inventory.bearer}}" } }],
      target: healthStatistic.id,
      type: ModifierType.add,
      value: 1
    },
    { 
      delegateId: DEAL_DAMAGE_MODIFIER,
      conditions: [{ delegateId: ITEM_EQUIPPED, payload: { item: "{{$}}", bearer: "{{$.inventory.bearer}}" } }],
      target: "",
      type: ModifierType.add,
      value: 1
    }
  ],

  activities: [
    {
      id: EQUIP_ITEM_ACTIVITY,
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
          payload: {
            value: "{{$.subject.parameters.baseDamage}}",
            caster: "{{$.performer}}",
            target: "{{$.procedureSteps.actor}}",
            // formula: dealDamageFormula
          }
        } as IMakeActionStepDeclaration
      }
    },
    {
      id: UNEQUIP_ITEM_ACTIVITY,
      isActivity: true,
      isMixin: true,
      procedureSteps: {
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
          payload: {
            value: "{{$.subject.parameters.baseDamage}}",
            caster: "{{$.performer}}",
            target: "{{$.procedureSteps.actor}}",
            // formula: dealDamageFormula
          }
        } as IMakeActionStepDeclaration
      }
    },
    {
      id: PLAY_CARD_ACTIVITY,
      cost: [{ value: 1, resourceId: majorActionStatistic.id, resourceType: STATISTIC_RESOURCE_TYPE }],
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        actor: {
          isInitialStep: true,
          isGatheringDataStep: true,
          dataType: ACTOR_DATA_TYPE,
          selectors: [
            { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.performer}}", shape: "line", range: "{{$.subject.parameters.range.value}}" } },
            { delegateId: ACTOR_SELECTOR, payload: { notInGroupId: "{{$.performer.groupId}}", isCreature: true } },
          ],
          executionsNumber: 1,
          nextStepTrigger: ProcedureStepTrigger.AfterEach,
          nextStep: "{{$.procedureSteps.makeAction}}"
        } as IGatheringDataStepDeclaration,
        makeAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            dealer: "{{$.performer}}",
            receiver: "{{$.procedureSteps.actor}}",
            value: "{{$.subject.parameters.baseDamage.value}}",
            damageType: "{{$.parameters.damageType}}"
          },
          nextStep: "{{$.procedureSteps.discardCard}}"
        } as IMakeActionStepDeclaration<unknown>,
        discardCard: {
          isMakeActionStep: true,
          delegateId: DISCARD_ACTION,
          payload: {
            target: "{{$.performer}}",
            card: "{{$.subject}}"
          }
        } as IMakeActionStepDeclaration
      }
    },
    {
      id: DISCARD_CARD_ACTIVITY,
      isActivity: true,
      isMixin: true,
      isProcedure: true,
      procedureSteps: {
        gainMajorAction: {
          isMakeActionStep: true,
          delegateId: MODIFY_STATISTIC_ACTION,
          payload: {
            statisticId: majorActionStatistic.id,
            bearer: "{{$.performer}}",
            value: 1,
            operator: 'add'
          }
        } as IMakeActionStepDeclaration,
      }
    }
  ],
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
}



export const magicPoo: IDataContainer<IItemDeclaration & IQuestOriginDeclaration & ITradableDeclaration, INarrativeMedium, IUiMedium> = {
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
  rarity: ItemRarity.Legendary,
  narrative: { name: "abilities.12A8A82C-E385-4201-B869-4A7C83FF7363.name", description: "abilities.12A8A82C-E385-4201-B869-4A7C83FF7363.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/poo", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const
};







export const travelSupplies: IDataContainer<IItemDeclaration & IActivityResource & ITradableDeclaration, INarrativeMedium, IUiMedium> = {
  id: TRAVEL_SUPPLIES_ID,
  sourceItemId: TRAVEL_SUPPLIES_ID,
  isEntity: true,
  isItem: true,
  isMixin: true,
  isActivityResource: true,
  isTradable: true,
  sellBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  buyBasePrice: [{ value: 0, currencyId: GOLD_CURRENCY }],
  rarity: ItemRarity.Common,
  narrative: { name: "abilities.B649BAA6-3905-465C-8B46-1E3586D3FF9D.name", description: "abilities.B649BAA6-3905-465C-8B46-1E3586D3FF9D.description" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/backpack", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};





// export const potion: IDataContainer<typeof p, INarrativeMedium, IUiMedium> = Object.assign(p, {
//   narrative: { name: "abilities.DDD1EBED-5C4C-42B9-AF10-A66581D90AEF.name", description: "abilities.DDD1EBED-5C4C-42B9-AF10-A66581D90AEF.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/health-potion", ext: "png" }},
//   isNarrationMedium: true as const,
//   isUiMedium: true as const,
//   isMixin: true as const
// });

// export const gold: IDataContainer<typeof g, INarrativeMedium, IUiMedium> = Object.assign(g, {
//   narrative: { name: "abilities.A41EA621-6FCF-480F-ABB8-D57CA8AE1C1F.name", description: "abilities.A41EA621-6FCF-480F-ABB8-D57CA8AE1C1F.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/currency", ext: "png" }},
//   isNarrationMedium: true as const,
//   isUiMedium: true as const,
//   isMixin: true as const
// });

// export const twoHandedSword: IDataContainer<typeof ths, INarrativeMedium, IUiMedium> = Object.assign(ths, {
//   narrative: { name: "abilities.F35F997F-405B-4F0A-8A6D-82C771BF6A30.name", description: "abilities.F35F997F-405B-4F0A-8A6D-82C771BF6A30.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/two-handed-sword", ext: "png" }},
//   isNarrationMedium: true as const,
//   isUiMedium: true as const,
//   isMixin: true as const
// });

// export const boots: IDataContainer<typeof b, INarrativeMedium, IUiMedium> = Object.assign(b, {
//   narrative: { name: "abilities.9D993B4D-8D71-4C28-B86B-5427A5FD62A5.name", description: "abilities.9D993B4D-8D71-4C28-B86B-5427A5FD62A5.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/boots", ext: "png" }},
//   isNarrationMedium: true as const,
//   isUiMedium: true as const,
//   isMixin: true as const
// });

// export const poo: IDataContainer<typeof po, INarrativeMedium, IUiMedium> = Object.assign(po, {
//   narrative: { name: "abilities.301B6C05-2516-48E3-ADBA-EA01FE0EEF5E.name", description: "abilities.301B6C05-2516-48E3-ADBA-EA01FE0EEF5E.description" },
//   uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "items/poo", ext: "png" }},
//   isNarrationMedium: true as const,
//   isUiMedium: true as const,
//   isMixin: true as const
// });