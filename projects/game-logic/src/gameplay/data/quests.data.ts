
import { DEFEATED_EVENT } from "../../lib/modules/actors/aspects/events/defeated.event"
import { SPAWN_ITEM_ACTION } from "../../lib/modules/items/aspects/actions/spawn-item.action"
import { POSESS_ITEM_ACTION } from "../../lib/modules/items/aspects/conditions/posess-item.condition"
import { QUEST_COMPLETED_EVENT } from "../../lib/modules/quest/aspects/events/quest-completed.event"
import { IQuestDeclaration } from "../../lib/modules/quest/entities/quest/quest.interface"
import { FINISH_QUEST_ACTIVITY, START_QUEST_ACTIVITY } from "../../lib/modules/quest/quest.constants"
import { IRewarderDeclaration } from "../../lib/modules/rewards/rewards.interface"
import { GATHER_ITEM_QUEST_ID, MAGIC_POO_ITEM_ID, POO_ITEM_ID, RAT_ACTOR_ID, EXTERMINATE_RATS_QUEST_ID, REPORT_RATS_EXTERMINATION } from "./common-identifiers.data"



export const exterminateRatsQuest: IQuestDeclaration & IRewarderDeclaration = {
  id: EXTERMINATE_RATS_QUEST_ID,
  isEntity: true,
  isQuest: true,
  isRewarder: true,
  isActivitySubject: true,
  requiredTriggerEmissions: 10,
  resolveTrigger: [
    { delegateId: DEFEATED_EVENT, payload: { defeater: "{{$.resolver}}", actorId: RAT_ACTOR_ID }}
  ],
  rewards: [
    {
      id: "BD76FF32-F13A-4290-9812-4783FB2B6A14",
      isReward: true,
      isEntity: true,
      rewardWhen: [{ delegateId: QUEST_COMPLETED_EVENT, payload: { quest: "{{$}}" }}],
      actions: [{ delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.questResolver}}" } }],
      autoclaim: true,
      isMixin: true
    }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  startSubsequentQuest: true,
  isMixin: true
}



export const reportRatsExterminationQuest: IQuestDeclaration & IRewarderDeclaration = {
  id: REPORT_RATS_EXTERMINATION,
  prevQuestId: EXTERMINATE_RATS_QUEST_ID,
  isEntity: true,
  isQuest: true,
  isRewarder: true,
  isActivitySubject: true,
  resolveConditions: [
    { delegateId: POSESS_ITEM_ACTION, payload: { bearer: "{{$.completer}}", itemId: MAGIC_POO_ITEM_ID, amount: 1 }}
  ],
  rewards: [
    {
      id: "5C2C4E25-AF16-4FDF-89A0-936E73A1F31A",
      isReward: true,
      isEntity: true,
      rewardWhen: [{ delegateId: QUEST_COMPLETED_EVENT, payload: { quest: "{{$}}" }}],
      actions: [{ delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.resolver}}" } }],
      autoclaim: true,
      isMixin: true
    }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  isMixin: true
}



export const gatherItemQuest: IQuestDeclaration & IRewarderDeclaration = {
  id: GATHER_ITEM_QUEST_ID,
  isEntity: true,
  isRewarder: true,
  isQuest: true,
  isActivitySubject: true,
  resolveConditions: [
    { delegateId: POSESS_ITEM_ACTION, payload: { bearer: "{{$.resolver}}", itemId: MAGIC_POO_ITEM_ID, amount: 1 }}
  ],
  rewards: [
    {
      id: "35655FE7-EE63-44FC-9A95-7E549B5C852F",
      isReward: true,
      isEntity: true,
      rewardWhen: [{ delegateId: QUEST_COMPLETED_EVENT, payload: { quest: "{{$}}" } }],
      actions: [{ delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.resolver}}" } }],
      autoclaim: true,
      isMixin: true
    }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  isMixin: true
}