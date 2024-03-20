import { EntityService } from "../../base/entity/entity.service"
import { EventService } from "../../cross-cutting/event/event.service"
import { ActionService } from "../../cross-cutting/action/action.service"
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service"
import { ModifierService } from "../../cross-cutting/modifier/modifier.service"
import { SelectorService } from "../../cross-cutting/selector/selector.service"
import { QuestService } from "./quest.service"
import { IQuestDataFeed } from "./quest.interface"
import { QuestFactory } from "./entities/quest/quest.factory"
import { ConditionService } from "../../cross-cutting/condition/condition.service"
import { QuestCompleterFactory } from "./entities/quest-completer/quest-completer.factory"
import { QuestOriginFactory } from "./entities/quest-origin/quest-origin.factory"
import { QuestResolverFactory } from "./entities/quest-resolver/quest-resolver.factory"

export class QuestModule {
  constructor(
    private readonly _dataFeed: IQuestDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _conditionService: ConditionService
  ) { }
  
  public initialize() {
    const questService = new QuestService(this._dataFeed, this._entityService);

    this._entityService.useFactories([
      new QuestFactory(this._conditionService, this._eventService, questService),
      new QuestCompleterFactory(questService),
      new QuestOriginFactory(questService),
      new QuestResolverFactory(questService, this._eventService)
    ])
    
    return { questService }
  }
}