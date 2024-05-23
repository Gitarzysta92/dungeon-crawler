import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";


export interface IQuest extends IQuestDeclaration {
  resolver: IQuestResolver;
  isResolved(): boolean;
}

export interface IQuestDeclaration extends IEntityDeclaration {
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
