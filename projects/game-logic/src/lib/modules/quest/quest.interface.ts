import { IEntity } from "../../base/entity/entity.interface";
import { IDelegateDeclaration } from "../../base/delegate/delegate.interface";
import { IInteractionSubject } from "../../cross-cutting/interaction/interaction.interface";
import { Guid } from "../../extensions/types";


export interface IQuestCompleter {
  activeQuestIds: Guid[];
  finishedQuestIds: Guid[];
  isQuestCompleter: true;
}

export interface IQuest extends IEntity {
  id: Guid;
  completionConditions: IDelegateDeclaration<unknown>[];
  questLineId: Guid;
  completer?: IQuestCompleter;
  isCompleted?: boolean;
}

export interface IQuestOrigin extends IInteractionSubject {
  startQuestIds: Guid[];
  isQuestOrigin: true;
}

export interface IQuestResolver extends IInteractionSubject {
  resolvableQuestIds: Guid[];
  isQuestResolver: true;
}

export interface IQuestLine {
  id: Guid;
}

export interface IQuestDataFeed {
  getQuests: (ids?: Guid[]) => Promise<IQuest[]>;
  getQuest: (id: Guid) => Promise<IQuest>;
}
