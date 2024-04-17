import { ACTOR_IDENTIFIER, ACTOR_SELECTOR_IDENTIFIER } from "../../lib/modules/actors/actors.constants"
import { IActor } from "../../lib/modules/actors/entities/actor/actor.interface"
import { DEFEATED_EVENT } from "../../lib/modules/actors/aspects/events/defeated.event"
import { IDefeatableDeclaration } from "../../lib/modules/actors/entities/defeatable/defeatable.interface"
import { ITravelerDeclaration } from "../../lib/modules/areas/entities/traveler/traveler.interface"
import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector"
import { Size } from "../../lib/modules/board/entities/board-object/board-object.constants"
import { Side } from "../../lib/modules/board/entities/board-object/board-object.constants"
import { IBoardObjectDeclaration } from "../../lib/modules/board/entities/board-object/board-object.interface"
import { IDeckDeclaration } from "../../lib/modules/cards-deck/entities/deck/deck.interface"
import { IAffectable } from "../../lib/modules/statuses/entities/affectable/affectable.interface"
import { EffectCastTime, EffectLifetime, CastingStepType } from "../../lib/modules/effects/entities/effect.constants"
import { IEffectDeclaration } from "../../lib/modules/effects/entities/effect.interface"
import { IInventoryBearerDeclaration } from "../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { InventorySlotType } from "../../lib/modules/items/entities/inventory-slot/inventory-slot.constants"
import { GRANT_EXPERIENCE } from "../../lib/modules/progression/aspects/actions/grant-experience.action"
import { IQuestCompleterDeclaration } from "../../lib/modules/quest/entities/quest-completer/quest-completer.interface"
import { IRewarderDeclaration } from "../../lib/modules/rewards/rewards.interface"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { IStatisticBearerDeclaration } from "../../lib/modules/statistics/entities/bearer/statistic-bearer.interface"
import { IDungeonExit } from "../modules/dungeon/entities/dungeon-exit/dungeon-exit"
import { RAT_ACTOR_ID, DUNGEON_GROUP_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID, VENDOR_CHARACTER_ID, FIRST_AREA_ID, DUNGEON_DECK_ID } from "./common-identifiers.data"
import { spawnCreatureCard, makeAttackCard, emptyCard, increaseEnemyAttackPowerCard, moveCreatureCard } from "./dungeon-cards.data"
import { vendorHealingPotion, vendorStaff, vendorMagicPoo } from "./items.data"
import { reportRatsExterminationQuest } from "./quests.data"
import { defenceStatistic, improvableHealthStatistic, attackPowerStatistic, dealDamageFormula } from "./statistics.data"
import { STATISTIC_RESOURCE_TYPE } from "../../lib/modules/statistics/statistics.constants"
import { FINISH_QUEST_ACTIVITY } from "../../lib/modules/quest/quest.constants"


export const ratActor:
  IActor &
  IAffectable &
  IStatisticBearerDeclaration &
  IBoardObjectDeclaration &
  IEffectDeclaration &
  IDefeatableDeclaration<["health"]> &
  IRewarderDeclaration = {
  id: RAT_ACTOR_ID,
  groupId: DUNGEON_GROUP_ID,
  sourceActorId: RAT_ACTOR_ID,
  defence: defenceStatistic,
  health: improvableHealthStatistic,
  attackPower: attackPowerStatistic,
  outlets: [Side.Top],
  size: Size.Small,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
  castingSchema: {
    actor: {
      stepType: CastingStepType.GatheringData,
      dataType: ACTOR_IDENTIFIER,
      amount: 1,
      selectors: [
        { delegateId: ACTOR_SELECTOR_IDENTIFIER, payload: { notInGroup: "{{$.caster.group}}" } },
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$.caster}}", shape: "line", range: 1 } }
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
        formula: dealDamageFormula.id
      }
    }
  },
  rewards: [
    {
      id: "35655FE7-EE63-44FC-9A95-7E549B5C852F",
      isReward: true,
      isEntity: true,
      rewardWhen: [{ delegateId: DEFEATED_EVENT, payload: { defeatable: "{{$}}" } }],
      actions: [{ delegateId: GRANT_EXPERIENCE, payload: { ref: "{{$.defeater}}", amount: 10 } }],
      autoclaim: true,
      isMixin: true
    }
  ],
  isDefeatable: true,
  isBoardObject: true,
  isEffect: true,
  isAffectable: true,
  isEntity: true,
  isActor: true,
  isRewarder: true,
  isStatisticBearer: true,
  isMixin: true
}



export const obstacleActor: IActor & IBoardObjectDeclaration = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  sourceActorId: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  isEntity: true,
  isBoardObject: true,
  isActor: true,
  isMixin: true,
  outlets: [],
  size: Size.Huge,
}



export const treasureActor: IActor & IBoardObjectDeclaration & IInventoryBearerDeclaration = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  sourceActorId: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  inventory: {
    id: "2F48E406-528F-4DA1-A624-B9BD327B9C6A",
    isInventory: true,
    isEntity: true,
    isMixin: true,
    slots: [
      { id: VENDOR_FIRST_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_SECOND_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_THIRD_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
    ],
    items: []
  },
  outlets: [],
  size: Size.Huge,
  isInventoryBearer: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isMixin: true
}



export const dungeonExitActor: IActor & IDungeonExit & IBoardObjectDeclaration = {
  id: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  sourceActorId: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  applyExitBonus: false,
  outlets: [],
  size: Size.Huge,
  isDungeonExit: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isMixin: true
}


export const blankField: IActor = {
  id: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  sourceActorId: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  isEntity: true,
  isActor: true,
  isMixin: true
}


export const commonField: IActor = {
  id: "CFC29C26-7307-4618-A830-F48AD97E6E88",
  sourceActorId: "D4BE1449-0B05-43B9-B436-B59769BEE2FC",
  isEntity: true,
  isActor: true,
  isMixin: true
}


export const vendorActor: IActor & ITravelerDeclaration & IQuestCompleterDeclaration & IInventoryBearerDeclaration = {
  id: VENDOR_CHARACTER_ID,
  inventory: {
    id: "458B0332-ADDC-4A83-ABC0-B0ABE902F5EC",
    isEntity: true,
    isInventory: true,
    isMixin: true,
    slots: [
      { id: VENDOR_FIRST_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_SECOND_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_THIRD_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: "75020F5A-CC48-457C-B8AE-B48F933F9C02", slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
    ],
    items: [
      vendorHealingPotion,
      vendorStaff,
      vendorMagicPoo
    ]
  },
  activities: [
    { id: FINISH_QUEST_ACTIVITY, cost: [{ value: 1, resourceId: 'majorAction', resourceType: STATISTIC_RESOURCE_TYPE }], isActivity: true, isMixin: true }
  ],
  sourceActorId: VENDOR_CHARACTER_ID,
  occupiedAreaId: FIRST_AREA_ID,
  isMixin: true,
  isEntity: true,
  isActor: true,
  isInventoryBearer: true,
  isQuestCompleter: true,
  isTraveler: true,
  isActivitySubject: true,
  completableQuestIds: [reportRatsExterminationQuest.id],
};


export const dungeonDeck: IActor & IDeckDeclaration = {
  id: DUNGEON_DECK_ID,
  isEntity: true,
  isCardsDeck: true,
  isMixin: true,
  isActor: true,
  drawPerTurn: 3,
  cardDeclarations: [
    { cardId: makeAttackCard.id, amount: 3 },
    { cardId: emptyCard.id, amount: 3 },
    { cardId: increaseEnemyAttackPowerCard.id, amount: 3 },
    { cardId: moveCreatureCard.id, amount: 3 },
    { cardId: spawnCreatureCard.id, amount: 3 }
  ]
}
