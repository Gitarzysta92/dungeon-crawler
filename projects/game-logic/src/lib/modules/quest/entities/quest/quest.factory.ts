import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../../../cross-cutting/condition/condition.interface";
import { ConditionService } from "../../../../cross-cutting/condition/condition.service";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { QuestService } from "../../quest.service";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest, IQuestDeclaration } from "./quest.interface";

export class QuestFactory implements IMixinFactory<IQuest> {

  constructor(
    private readonly _conditionService: ConditionService,
    private readonly _eventService: EventService,
    private readonly _questService: QuestService
  ) {}

  public validate(e: IEntityDeclaration & Partial<IQuest>): boolean {
    return e.isQuest;
  };
  
  public create(bc: Constructor<IEntity>): Constructor<IQuest> {
    const conditionService = this._conditionService;
    const eventService = this._eventService;
    const questService = this._questService;
    class Quest extends bc implements IQuest {
      public isQuest = true as const;
      startCondition?: IConditionDeclaration<unknown>[];
      resolveConditions: IConditionDeclaration<unknown>[];

      triggerEmissions: number;
      requiredTriggerEmissions?: number;
      resolveTrigger?: IEventListenerDeclaration<unknown>[];
      
      get isCompleted(): boolean { return this.resolver.completedQuestIds.includes(this.id) };

      @NotEnumerable()
      resolver: IQuestResolver;

      @NotEnumerable()
      prevQuest: IQuest;

      @NotEnumerable()
      nextQuest: IQuest;

      private readonly _conditionService: ConditionService = conditionService;
      private readonly _eventService: EventService = eventService;
      private readonly _questServie: QuestService = questService;
    
      constructor(d: IQuestDeclaration) {
        super(d);
        this.startCondition = d.startCondition;
        this.resolveConditions = d.resolveConditions;
        this.requiredTriggerEmissions = d.requiredTriggerEmissions ?? 0;
        this.triggerEmissions = d.triggerEmissions ?? 0;
        this.resolveTrigger = d.resolveTrigger;
      }

      public onInitialize(): void {
        if (this.resolveTrigger) {
          this._eventService.listen(this._resolveTriggerHandler); 
        }
        super.onInitialize();
      }

      public onDestroy(): void {
        this._eventService.stopListening(this._resolveTriggerHandler);
        super.onDestroy();
      }

      public isPossibleToStart(): boolean {
        if (!Array.isArray(this.startCondition) || this.startCondition.length <= 0) {
          return true;
        }
        return this._conditionService.check(this.startCondition, this);
      }
      
      public isResolved(): boolean {
        if (!Array.isArray(this.startCondition) || this.startCondition.length <= 0) {
          return true;
        }
        return this._conditionService.check(this.resolveConditions, this);
      }

      private _resolveTriggerHandler = (e) => {
        for (let trigger of this.resolveTrigger) {
          if (e.isApplicableTo(JsonPathResolver.resolve(trigger, this))) {
            this.triggerEmissions += 1;

            if (this.triggerEmissions === this.requiredTriggerEmissions) {
              this._eventService.stopListening(this._resolveTriggerHandler);
              this.resolver.finishQuest(this);
            }
          }
        }
      }
    }
    return Quest;
  };

}