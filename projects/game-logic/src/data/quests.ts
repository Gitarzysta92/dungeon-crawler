import { QuestStatus, QuestOrigin, QuestObjectiveType } from "../lib/features/quest/quest.constants"
import { IGatherItemObjective, IQuest, IQuestLine, ISlayEnemiesObjective } from "../lib/features/quest/quest.interface"
import { rat } from "./actors"
import { gatherItemQuestId, pooItemId } from "./common-identifiers"

export const questLine: IQuestLine = {
  id: "6EE7DD33-332D-4D41-8B5C-EAAACA752B36",
  progress: 0,
  quests: [
    {
      id: "",
      status: QuestStatus.NotStarted,
      prerequisites: "",
      origin: QuestOrigin.QuestItem,
      originId: "",
      objectives: [],
      reward: []
    }
  ]
}
 

export const gatherItemObjective: IGatherItemObjective = {
  objectiveType: QuestObjectiveType.GatherItem,
  itemId: pooItemId,
  amount: 0,
  reportObjectiveCharacterId: "2038740F-2AA6-4711-9745-154E4AE25976",
  isDone: false
}

export const slayEnemiesObjective: ISlayEnemiesObjective = {
  objectiveType: QuestObjectiveType.SlayEnemies,
  enemyId: rat.id,
  amount: 0,
  reportObjectiveCharacterId: "",
  isDone: false
}


export const gatherItemQuest: IQuest = {
  id: gatherItemQuestId,
  status: QuestStatus.NotStarted,
  prerequisites: "",
  origin: QuestOrigin.QuestItem,
  originId: "",
  objectives: [],
  reward: []
}