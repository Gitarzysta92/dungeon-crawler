import { QuestStatus, QuestOrigin, QuestObjectiveType, QuestPrerequesiteType } from "./quest.constants";

export interface IQuestLog {
  activeQuests: IQuest[];
  finishedQuestIds: string[];
}

export interface IQuestDialog {
  characterId: string;
  questId: string;
  answears: []
}

export interface IQuestLine {
  id: string;
  quests: IQuest[]
  progress: number;
}

export interface IQuest {
  id: string;
  status: QuestStatus,
  prerequisites: string,
  origin: QuestOrigin,
  originId: string,
  objectives: IQuestObjective[],
  reward: Array<IGatherItemObjective | ISlayEnemiesObjective>;
  resolvedVariantId?: string;
  startConsequentQuest?: string;
  questLineId?: string;
  indexInQuestLine?: number;
  
}

export interface IQuestObjective {
  objectiveType: QuestObjectiveType;
  reportObjectiveCharacterId: string;
  isDone: boolean;
}

export interface IGatherItemObjective extends IQuestObjective {
  objectiveType: QuestObjectiveType.GatherItem;
  itemId: string;
  amount: number;
}

export interface ISlayEnemiesObjective extends IQuestObjective {
  objectiveType: QuestObjectiveType.SlayEnemies;
  enemyId: string;
  amount: number;
}

export interface IQuestStarter {
  startQuestId: string;
}

export interface IQuestPrerequesite {
  prerequesite: QuestPrerequesiteType
}