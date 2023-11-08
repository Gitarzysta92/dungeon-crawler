import { QuestStatus, QuestOrigin, QuestObjectiveType } from "../lib/features/quests/quests.constants"
import { IGatherItemObjective, IQuest, IQuestLine, ISlayEnemiesObjective } from "../lib/features/quests/quests.interface"
import { ratActor } from "./actors.data"
import { gatherItemQuestId, pooItemId, slayEnemiesQuestId, vendorCharacterId } from "./common-identifiers.data"

export const gatherItemObjective: IGatherItemObjective = {
  objectiveType: QuestObjectiveType.GatherItem,
  itemId: pooItemId,
  amount: 0,
  reportObjectiveCharacterId: "2038740F-2AA6-4711-9745-154E4AE25976",
  isDone: false
}


export const slayEnemiesObjective: ISlayEnemiesObjective = {
  objectiveType: QuestObjectiveType.SlayEnemies,
  enemyId: ratActor.id,
  amount: 0,
  reportObjectiveCharacterId: "",
  isDone: false
}


export const gatherItemQuest: IQuest = {
  id: gatherItemQuestId,
  status: QuestStatus.NotStarted,
  prerequisites: "",
  origin: QuestOrigin.QuestItem,
  originId: vendorCharacterId,
  objectives: [gatherItemObjective],
  reward: []
}

export const slayEnemiesItemQuest: IQuest = {
  id: slayEnemiesQuestId,
  status: QuestStatus.NotStarted,
  prerequisites: "",
  origin: QuestOrigin.Quest,
  originId: gatherItemQuestId,
  objectives: [slayEnemiesObjective],
  reward: []
}


export const questLine: IQuestLine = {
  id: "6EE7DD33-332D-4D41-8B5C-EAAACA752B36",
  progress: 0,
  quests: [
    gatherItemQuest,
    slayEnemiesItemQuest
  ]
}