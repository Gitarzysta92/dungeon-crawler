import { IQuest } from "./quest.interface";


export class QuestService {
  activeQuests: IQuest[];
  finishedQuestIds: string[];

  constructor() {
    // this.activeQuests = data.activeQuests;
    // this.finishedQuestIds = data.finishedQuestIds;
  }

  startQuest(quest: IQuest): void {
    this.activeQuests.push(quest);
  }

  finishQuest(quest: IQuest): void {
    throw new Error("Method not implemented.");
  }
}