import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest } from "../quest/quest.interface";


export interface IQuestCompleter extends IQuestCompleterDeclaration {
  completeQuest(c: IQuest): void;
  canCompleteQuest(c: IQuest): boolean;
}

export interface IQuestCompleterDeclaration extends IEntityDeclaration {
  completableQuestIds: Guid[];
  isQuestCompleter: true;
}