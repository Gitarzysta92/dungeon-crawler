import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";
import { IQuest } from "../quest/quest.interface";


export interface IQuestResolver extends IQuestResolverDeclaration {
  hasResolved(questId: Guid): boolean;
  takeQuest(c: IQuest): void;
  finishQuest(c: IQuest): void;
}

export interface IQuestResolverDeclaration extends IEntity {
  activeQuests: IQuest[];
  completedQuestIds: Guid[];
  isQuestResolver: true;
}
