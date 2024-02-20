import { EntityLifecycle } from "../../../lib/base/entity/entity.constants"
import { IInteractionSubject } from "../../../lib/cross-cutting/interaction/interaction.interface"
import { IActor } from "../../../lib/modules/actor/actor.interface"
import { IDefeatable } from "../../../lib/modules/actor/defeatable/defeatable.interface"
import { IAreaObject } from "../../../lib/modules/area/area-object/area-object.interface"
import { Side, Size } from "../../../lib/modules/board/board.constants"
import { IBoardObject } from "../../../lib/modules/board/board.interface"
import { ICardsDeck } from "../../../lib/modules/cards-deck/cards-deck.interface"
import { IAffectable } from "../../../lib/modules/effect/affectable/affectable.interface"
import { EffectCastTime, EffectLifetime, CastingStepType } from "../../../lib/modules/effect/effect.constants"
import { IEffectDefinition } from "../../../lib/modules/effect/effect.interface"
import { IInventoryBearer } from "../../../lib/modules/item/bearer/inventory-bearer.interface"
import { InventorySlotType } from "../../../lib/modules/item/inventory/inventory.constants"
import { UNLOCK_INTERACTION_IDENTIFIER } from "../../../lib/modules/progression/interactions/unlock.interaction"
import { IUnlockable } from "../../../lib/modules/progression/progression.interface"
import { FINISH_QUEST_INTERACTION_IDENTIFIER } from "../../../lib/modules/quest/interactions/finish-quest.interaction"
import { IQuestResolver } from "../../../lib/modules/quest/quest.interface"
import { IRewarding } from "../../../lib/modules/reward/rewards.interface"
import { IStatisticBearer } from "../../../lib/modules/statistic/bearer/statistic-bearer.interface"
import { LEAVE_DUNGEON_INTERACTION_IDENTIFIER } from "../../dungeon/dungeon-gameplay.constants"
import { IDungeonExit } from "../../dungeon/dungeons.interface"
import { RAT_ACTOR_ID, DUNGEON_GROUP_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID, VENDOR_CHARACTER_ID, FIRST_AREA_ID, DUNGEON_DECK_ID } from "./common-identifiers.data"
import { spawnCreatureCard, makeAttackCard, emptyCard, increaseEnemyAttackPowerCard, moveEnemyCard } from "./dungeon-cards.data"
import { vendorHealingPotion, vendorStaff, vendorMagicPoo } from "./items.data"
import { slayEnemiesItemQuest } from "./quests.data"
import { defenceStatistic, improveableHealthStatistic, attackPowerStatistic, dealDamageFormula } from "./statistics.data"


export const ratActor:
  IActor &
  IAffectable &
  IStatisticBearer<["defence", "health", "attackPower"]> &
  IBoardObject &
  IEffectDefinition &
  IDefeatable<["health"]> &
  IRewarding = {
  id: RAT_ACTOR_ID,
  groupId: DUNGEON_GROUP_ID,
  sourceActorId: RAT_ACTOR_ID,
  lifecycle: EntityLifecycle.Reusable,
  defence: defenceStatistic,
  health: improveableHealthStatistic,
  attackPower: attackPowerStatistic,
  outlets: [Side.Top],
  size: Size.Small,
  castTime: EffectCastTime.Immidiate,
  lifetime: EffectLifetime.Instantaneous,
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
        formula: dealDamageFormula.id
      }
    }
  },
  rewards: [
    {
      conditions: [{ delegateId: "is-defeated", payload: { defeatable: "{{$}}" }}],
      awardables: [{ ref: "{{$.defeater}}", actions: [{ delegateId: "gain-experience", payload: { amount: 10 } }]}],
      autoclaim: true
    }
  ],
  isDefeatable: true,
  isBoardObject: true,
  isEffect: true,
  isAffectable: true,
  isEntity: true,
  isActor: true,
  isRewarding: true,
  isStatisticBearer: true
}

export const obstacleActor: IActor & IBoardObject = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  sourceActorId: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  lifecycle: EntityLifecycle.Reusable,
  isEntity: true,
  isBoardObject: true,
  isActor: true,
  outlets: [],
  size: Size.Huge,
}

export const treasureActor: IActor & IBoardObject & IInventoryBearer & IInteractionSubject & IUnlockable = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  sourceActorId: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  lifecycle: EntityLifecycle.Reusable,
  interaction: [
    { id: UNLOCK_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] }
  ],
  inventory: {
    slots: [
      { id: VENDOR_FIRST_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isOccupied: true },
      { id: VENDOR_SECOND_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isOccupied: true },
      { id: VENDOR_THIRD_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isOccupied: true },
    ],
    items: []
  },
  outlets: [],
  size: Size.Huge,
  isInventoryBearer: true,        
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isUnlockable: true,
  isUnlocked: false,
}

export const dungeonExitActor: IActor & IDungeonExit & IBoardObject & IInteractionSubject = {
  id: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  sourceActorId: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  lifecycle: EntityLifecycle.Reusable,
  interaction: [{ id: LEAVE_DUNGEON_INTERACTION_IDENTIFIER }],
  applyExitBonus: false,
  outlets: [],
  size: Size.Huge,
  isDungeonExit: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true
}


export const blankField: IActor = {
  id: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  sourceActorId: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  lifecycle: EntityLifecycle.Reusable,
  isEntity: true,
  isActor: true
}


export const commonField: IActor = {
  id: "CFC29C26-7307-4618-A830-F48AD97E6E88",
  sourceActorId: "D4BE1449-0B05-43B9-B436-B59769BEE2FC",
  lifecycle: EntityLifecycle.Reusable,
  isEntity: true,
  isActor: true
}


export const vendorCharacter: IActor & IAreaObject & IQuestResolver & IInventoryBearer = {
  id: VENDOR_CHARACTER_ID,
  lifecycle: EntityLifecycle.Reusable,
  inventory: {
    slots: [
      {
        id: VENDOR_FIRST_COMMON_SLOT_ID,
        slotType: InventorySlotType.Common,
        isOccupied: true,
      },
      {
        id: VENDOR_SECOND_COMMON_SLOT_ID,
        slotType: InventorySlotType.Common,
        isOccupied: true
      },
      {
        id: VENDOR_THIRD_COMMON_SLOT_ID,
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
  interaction: [
    { id: FINISH_QUEST_INTERACTION_IDENTIFIER, cost: [{ value: 1, resourceId: 'majorAction' }] }
  ],
  sourceActorId: VENDOR_CHARACTER_ID,
  occupiedAreaId: FIRST_AREA_ID,
  isEntity: true,
  isActor: true,
  isInventoryBearer: true,
  isQuestResolver: true,
  isAreaObject: true,
  resolvableQuestIds: [slayEnemiesItemQuest.id],
};


export const dungeonDeckConfiguration: IActor & ICardsDeck = {
  id: DUNGEON_DECK_ID,
  lifecycle: EntityLifecycle.Reusable,
  isEntity: true,
  isCardsDeck: true,
  isActor: true,
  drawPerTurn: 3,
  revealedCardIds: [
    spawnCreatureCard.id
  ],
  preventShuffleDeckOnInitialization: true,
  cardDeclarations: [
    { cardId: makeAttackCard.id, amount: 3 },
    { cardId: emptyCard.id, amount: 3 },
    { cardId: increaseEnemyAttackPowerCard.id, amount: 3 },
    { cardId: moveEnemyCard.id, amount: 3 },
    { cardId: spawnCreatureCard.id, amount: 3 }
  ]
}
