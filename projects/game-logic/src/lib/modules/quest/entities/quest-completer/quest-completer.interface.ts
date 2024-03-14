import { IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionSubject } from "../../../../cross-cutting/interaction/interaction.interface";
import { Guid } from "../../../../extensions/types";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest } from "../quest/quest.interface";


export interface IQuestCompleter extends IQuestCompleterDeclaration {
  completeQuest(c: IQuest, questResolver: IQuestResolver): Promise<void>
}

export interface IQuestCompleterDeclaration extends IInteractionSubject, IEntity {
  completableQuestIds: Guid[];
  isQuestCompleter: true;
}