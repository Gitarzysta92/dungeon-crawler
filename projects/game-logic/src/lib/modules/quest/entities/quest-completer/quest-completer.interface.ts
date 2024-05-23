import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest } from "../quest/quest.interface";


export interface IQuestCompleter extends IQuestCompleterDeclaration {
  completeQuest(c: IQuest, questResolver: IQuestResolver): Promise<void>
}

export interface IQuestCompleterDeclaration extends IActivitySubjectDeclaration, IEntityDeclaration {
  completableQuestIds: Guid[];
  isQuestCompleter: true;
}