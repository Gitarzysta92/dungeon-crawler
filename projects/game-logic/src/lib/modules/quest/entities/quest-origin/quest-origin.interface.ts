import { IEntity } from "../../../../base/entity/entity.interface";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest, IQuestDeclaration } from "../quest/quest.interface";


export interface IQuestOrigin extends IQuestOriginDeclaration, IEntity {
  exposedQuests: IQuest[];
  canGiveQuest(q: IQuest): boolean;
  giveQuest(c: IQuestResolver, quest: IQuest): Promise<void>;
  isExposingQuest(q: IQuest): boolean;
}

export interface IQuestOriginDeclaration {
  exposedQuests: IQuestDeclaration[];
  isQuestOrigin: true;
}