import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { Guid } from "../../../../extensions/types";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";


export interface IQuestOrigin extends IQuestOriginDeclaration {
  giveQuest(c: IQuestResolver, questId: Guid): Promise<void>
}

export interface IQuestOriginDeclaration extends IActivitySubjectDeclaration {
  startQuestIds: Guid[];
  isQuestOrigin: true;
}