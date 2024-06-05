import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
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
  
  public create(bc: Constructor<IEntity>): Constructor<IQuestResolver> {
    const questService = this._questsService;
    const eventService = this._eventService;
    class QuestOrigin extends bc implements IQuestResolver {
      activeQuests: IQuest[];
      completedQuestIds: string[];
      isQuestResolver = true as const;

      constructor(d: IQuestResolverDeclaration) {
        super(d);
        this.activeQuests = d.activeQuests as IQuest[];
        this.completedQuestIds = d.completedQuestIds;
      }

      public onInitialize(): void {
        this.activeQuests.forEach(a => {
          // TO DO: check why NotEnumerable decorator, not setting property decorators correctly.
          Object.defineProperty(a, 'resolver', {
            enumerable: false,
            configurable: false,
            value: this
          })
        });
      }
      
      public takeQuest(c: IQuest): void {
        this.activeQuests.push(c);
        Object.defineProperty(c, 'resolver', {
          enumerable: false,
          configurable: false,
          value: this
        })
      }

      public finishQuest(c: IQuest): void {
        const index = this.activeQuests.indexOf(c);
        this.activeQuests.slice(index, 1);
        this.completedQuestIds.push(c.id);
        eventService.emit(new QuestCompletedEvent(this, c));
      }

      public hasResolved(questId: string): boolean {
        return this.completedQuestIds.includes(questId);
      }

      public hasActive(questId: string): boolean {
        return this.activeQuests.some(a => a.id === questId);
      }
      
    }
    return QuestOrigin;
  };

}