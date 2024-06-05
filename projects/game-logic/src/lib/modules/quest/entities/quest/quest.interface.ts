import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IQuestOrigin } from "../quest-origin/quest-origin.interface";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";


export interface IQuest extends IQuestDeclaration {
  resolver: IQuestResolver;
  origin: WeakRef<IQuestOrigin>;
  isResolved(): boolean;
  isPossibleToStart(): boolean;
}

export interface IQuestDeclaration extends IEntityDeclaration, IActivitySubjectDeclaration {
  id: Guid;
  prevQuestId?: Guid;
  isQuest: true;
  triggerEmissions?: number;
  requiredTriggerEmissions?: number;
  resolveTrigger?: IEventListenerDeclaration<unknown>[];
  resolveConditions?: IConditionDeclaration<unknown>[];
  startCondition?: IConditionDeclaration<unknown>[];
  isCompleted?: boolean;
  startSubsequentQuest?: boolean;
}
