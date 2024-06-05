
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IQuest, IQuestDeclaration } from "../quest/quest.interface";


export interface IQuestResolver extends IQuestResolverDeclaration, IEntity {
  hasResolved(questId: Guid): boolean;
  hasActive(questId: Guid): boolean;
  takeQuest(c: IQuest): void;
  finishQuest(c: IQuest): void;
}

export interface IQuestResolverDeclaration extends IEntityDeclaration {
  activeQuests: IQuestDeclaration[];
  completedQuestIds: Guid[];
  isQuestResolver: true;
}
