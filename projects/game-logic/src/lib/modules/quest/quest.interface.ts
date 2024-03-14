import { Guid } from "../../extensions/types";
import { IQuest } from "./entities/quest/quest.interface";


export interface IQuestLine {
  id: Guid;
}

export interface IQuestDataFeed {
  getQuests: (ids?: Guid[]) => Promise<IQuest[]>;
  getQuest: (id: Guid) => Promise<IQuest>;
}
