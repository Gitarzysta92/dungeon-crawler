import { Entity } from "../../../../base/entity/entity";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { Constructor } from "../../../../extensions/types";
import { QuestCompletedEvent } from "../../aspects/events/quest-completed.event";
import { QuestService } from "../../quest.service";
import { IQuest } from "../quest/quest.interface";
import { IQuestResolver, IQuestResolverDeclaration } from "./quest-resolver.interface";

export class QuestResolverFactory implements IMixinFactory<IQuestResolver> {

  constructor(
    private readonly _questsService: QuestService,
    private readonly _eventService: EventService
  ) {}

  public validate(e: IEntityDeclaration & Partial<IQuestResolver>): boolean {
    return e.isQuestResolver;
  };
  
  public create(bc: typeof Entity): Constructor<IQuestResolver> {
    const questService = this._questsService;
    const eventService = this._eventService;
    class QuestOrigin extends bc implements IQuestResolver {
      activeQuests: IQuest[];
      completedQuestIds: string[];
      isQuestResolver = true as const;

      private readonly _questService: QuestService = questService;
      private readonly _eventService: EventService = eventService;

      constructor(d: IQuestResolverDeclaration) {
        super(d);
        this.activeQuests = d.activeQuests as IQuest[];
        this.completedQuestIds = d.completedQuestIds;
      }
      
      public takeQuest(c: IQuest): void {
        this.activeQuests.push(c);
      }

      public finishQuest(c: IQuest): void {
        const index = this.activeQuests.indexOf(c);
        this.activeQuests.slice(index, 1);
        this.completedQuestIds.push(c.id);
        this._eventService.emit(new QuestCompletedEvent(this, c))
      }

      public hasResolved(questId: string): boolean {
        return this.completedQuestIds.includes(questId);
      }
      
    }
    return QuestOrigin;
  };

}