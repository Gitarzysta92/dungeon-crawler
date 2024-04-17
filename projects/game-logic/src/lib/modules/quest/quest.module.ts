import { EntityService } from "../../base/entity/entity.service"
import { EventService } from "../../cross-cutting/event/event.service"
import { QuestService } from "./quest.service"
import { IQuestDataFeed } from "./quest.interface"
import { QuestFactory } from "./entities/quest/quest.factory"
import { ConditionService } from "../../cross-cutting/condition/condition.service"
import { QuestCompleterFactory } from "./entities/quest-completer/quest-completer.factory"
import { QuestOriginFactory } from "./entities/quest-origin/quest-origin.factory"
import { QuestResolverFactory } from "./entities/quest-resolver/quest-resolver.factory"
import { ActivityService } from "../../base/activity/activity.service"
import { StartQuestActivityFactory } from "./activities/start-quest/start-quest.activity"
import { FinishQuestActivityFactory } from "./activities/finish-quest/finish-quest.activity"

export class QuestModule {
  constructor(
    private readonly _dataFeed: IQuestDataFeed,
    private readonly _entityService: EntityService,
    private readonly _eventService: EventService,
    private readonly _conditionService: ConditionService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    const questService = new QuestService(this._dataFeed, this._entityService);

    this._entityService.useFactories([
      new QuestFactory(this._conditionService, this._eventService, questService),
      new QuestCompleterFactory(questService),
      new QuestOriginFactory(questService),
      new QuestResolverFactory(questService, this._eventService)
    ])

    this._activityService.useFactories([
      new StartQuestActivityFactory(),
      new FinishQuestActivityFactory()
    ])
    
    return { questService }
  }
}