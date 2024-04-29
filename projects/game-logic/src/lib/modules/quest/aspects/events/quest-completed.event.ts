import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";
import { IQuest } from "../../entities/quest/quest.interface";

export const QUEST_COMPLETED_EVENT = "QUEST_COMPLETED_EVENT";

export interface IQuestCompletedEventPayload {
  resolver: IQuestResolver;
  quest?: IQuest;
}

export class QuestCompletedEvent extends EventBase implements IQuestCompletedEventPayload {
  public delegateId = QUEST_COMPLETED_EVENT;

  constructor(
    public readonly resolver: IQuestResolver,
    public readonly quest?: IQuest
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IQuestCompletedEventPayload>): boolean {
    const isApplicable = d.delegateId === this.delegateId && this.resolver === d.payload.resolver;
    return isApplicable && d.payload.resolver.hasResolved(d.payload.quest.id);
  }
}