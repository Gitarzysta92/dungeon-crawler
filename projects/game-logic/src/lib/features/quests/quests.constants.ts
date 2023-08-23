export enum QuestOrigin {
  QuestItem,
  Area,
  Character,
  Quest
}

export enum QuestStatus {
  NotStarted,
  Started,
  Finished,
}

export enum QuestObjectiveType {
  GatherItem,
  SlayEnemies,
}

export enum QuestPrerequesiteType {
  Level,
  FinishedQuest,
  PosessedItem
}