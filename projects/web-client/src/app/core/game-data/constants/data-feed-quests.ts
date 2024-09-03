import { IDataContainer } from "../interface/data-container.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { SPAWN_ITEM_ACTION } from "@game-logic/lib/modules/items/aspects/actions/spawn-item.action";
import { IQuestDeclaration } from "@game-logic/lib/modules/quest/entities/quest/quest.interface";
import { START_QUEST_ACTIVITY, FINISH_QUEST_ACTIVITY } from "@game-logic/lib/modules/quest/quest.constants";
import { EXTERMINATE_RATS_QUEST_ID, RAT_ACTOR_ID, POO_ITEM_ID, REPORT_RATS_EXTERMINATION, MAGIC_POO_ITEM_ID, GATHER_ITEM_QUEST_ID } from "./common-identifiers.data";
import { ITEM_POSSESED } from "@game-logic/lib/modules/items/aspects/conditions/posess-item.condition"
import { IRewarderDeclaration } from "@game-logic/lib/modules/rewards/entities/rewarder/rewarder.interface";
import { DEFEATED_EVENT } from "@game-logic/lib/modules/cards/aspects/events/defeated.event";


export const exterminateRatsQuest: IDataContainer<IQuestDeclaration & IRewarderDeclaration, INarrativeMedium> = {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
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
    { delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.questResolver}}" } }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  startSubsequentQuest: true,
  isMixin: true
}

export const reportRatsExterminationQuest: IDataContainer<IQuestDeclaration & IRewarderDeclaration, INarrativeMedium> = {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
  id: REPORT_RATS_EXTERMINATION,
  prevQuestId: EXTERMINATE_RATS_QUEST_ID,
  isEntity: true,
  isQuest: true,
  isRewarder: true,
  isActivitySubject: true,
  resolveConditions: [
    { delegateId: ITEM_POSSESED, payload: { bearer: "{{$.completer}}", itemId: MAGIC_POO_ITEM_ID, amount: 1 }}
  ],
  rewards: [
    { delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.resolver}}" } }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  isMixin: true
}


export const slayEnemiesItemQuest: IDataContainer<IQuestDeclaration & IRewarderDeclaration, INarrativeMedium> = {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
  id: GATHER_ITEM_QUEST_ID,
  isEntity: true,
  isRewarder: true,
  isQuest: true,
  isActivitySubject: true,
  resolveConditions: [
    { delegateId: ITEM_POSSESED, payload: { bearer: "{{$.resolver}}", itemId: MAGIC_POO_ITEM_ID, amount: 1 }}
  ],
  rewards: [
    { delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.resolver}}" } }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  isMixin: true
}


export const gatherItemQuest: IQuestDeclaration & IRewarderDeclaration = {
 // narrative: { name: "string", description: "string" },
  //isNarrationMedium: true as const,
  id: GATHER_ITEM_QUEST_ID,
  isEntity: true,
  isRewarder: true,
  isQuest: true,
  isActivitySubject: true,
  resolveConditions: [
    //{ delegateId: POSESS_ITEM_ACTION, payload: { bearer: "{{$.resolver}}", itemId: MAGIC_POO_ITEM_ID, amount: 1 }}
  ],
  rewards: [
    { delegateId: SPAWN_ITEM_ACTION, payload: { sourceItemId: POO_ITEM_ID, amount: 2, bearer: "{{$.resolver}}" } }
  ],
  activities: [
    { id: START_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true },
    { id: FINISH_QUEST_ACTIVITY, cost: [], isActivity: true, isMixin: true }
  ],
  isMixin: true
}