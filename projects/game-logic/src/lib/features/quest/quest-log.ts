import { IQuest, IQuestLine, IQuestLog } from "./quest.interface";


export class QuestLog implements IQuestLog {
  activeQuests: IQuest[];
  finishedQuestIds: string[];

  constructor(data: IQuestLog) {
    this.activeQuests = data.activeQuests;
    this.finishedQuestIds = data.finishedQuestIds;
  }

  startQuest(quest: IQuest): void {
    this.activeQuests.push(quest);
  }

  finishQuest(quest: IQuest): void {
    throw new Error("Method not implemented.");
  }
}