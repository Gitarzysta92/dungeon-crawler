
import { EntityLifecycle } from "../../../lib/base/entity/entity.constants"
import { IUnlockable } from "../../../lib/modules/progression/progression.interface"
import { IQuestLine, IQuest } from "../../../lib/modules/quest/quest.interface"
import { IRewarding } from "../../../lib/modules/reward/rewards.interface"
import { GATHER_ITEM_QUEST_ID, MAGIC_POO_ITEM_ID, POO_ITEM_ID, RAT_ACTOR_ID, SLAY_ENEMIES_QUEST_ID } from "./common-identifiers.data"


export const questLine: IQuestLine = {
  id: "6EE7DD33-332D-4D41-8B5C-EAAACA752B36"
}


export const slayEnemiesItemQuest: IQuest & IUnlockable & IRewarding = {
  id: SLAY_ENEMIES_QUEST_ID,
  isEntity: true,
  isUnlockable: true,
  isRewarding: true,
  unlockingConditions: [],
  lifecycle: EntityLifecycle.Disposable,
  completionConditions: [
    { delegateId: "defeated-actors", payload: { completer: "{{$.completer}}", actorId: RAT_ACTOR_ID }}
  ],
  questLineId: questLine.id,
  isUnlocked: true,
  rewards: [
    {
      conditions: [{ delegateId: "quest-completed", payload: { defeatable: "{{$.isCompleted}}" }}],
      awardables: [{ ref: "{{$.completer}}", actions: [{ delegateId: "add-item", payload: { itemId: POO_ITEM_ID, amount: 2 } }]}],
      autoclaim: true
    }
  ]
}


export const gatherItemQuest: IQuest & IUnlockable & IRewarding = {
  id: GATHER_ITEM_QUEST_ID,
  isEntity: true,
  isUnlockable: true,
  isRewarding: true,
  unlockingConditions: [
    { eventId: "quest-completed", payload: { questId: SLAY_ENEMIES_QUEST_ID } }
  ],
  lifecycle: EntityLifecycle.Disposable,
  completionConditions: [
    { delegateId: "possess-item", payload: { completer: "{{$.completer}}", itemId: MAGIC_POO_ITEM_ID }}
  ],
  questLineId: questLine.id,
  isUnlocked: false,
  rewards: [
    {
      conditions: [{ delegateId: "quest-completed", payload: { defeatable: "{{$.isCompleted}}" }}],
      awardables: [{ ref: "{{$.completer}}", actions: [{ delegateId: "gain-experience", payload: { amount: 100 } }]}]
    }
  ]
}