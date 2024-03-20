import { Guid } from "../../extensions/types";
import { IQuestDeclaration } from "./entities/quest/quest.interface";

export interface IQuestDataFeed {
  getQuests: (ids?: Guid[]) => Promise<IQuestDeclaration[]>;
  getQuest: (id: Guid) => Promise<IQuestDeclaration>;
}
