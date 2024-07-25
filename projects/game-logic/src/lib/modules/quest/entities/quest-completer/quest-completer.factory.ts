import { IActivityDeclaration, IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { QuestService } from "../../quest.service";
import { IQuest } from "../quest/quest.interface";
import { IQuestCompleter, IQuestCompleterDeclaration } from "./quest-completer.interface";

export class QuestCompleterFactory implements IMixinFactory<IQuestCompleter> {

  constructor(
    private readonly _questsService: QuestService
  ) {}

  public isApplicable(e: IEntityDeclaration & Partial<IQuestCompleter>): boolean {
    return e.isQuestCompleter;
  };
  
  public create(bc: Constructor<IEntity & IActivitySubject>): Constructor<IQuestCompleter> {
    const questService = this._questsService;
    class QuestCompleter extends bc implements IQuestCompleter {
      completableQuestIds: string[];
      isQuestCompleter: true;
      activityDeclarations: IActivityDeclaration[];
      
      constructor(d: IQuestCompleterDeclaration) { 
        super(d);
      }

      public canCompleteQuest(q: IQuest): boolean {
        return this.completableQuestIds.includes(q.id) && !q.isResolved()
      }

      public completeQuest(q: IQuest): void { 
        q.resolver.finishQuest(q);
      }
      
    }
    return QuestCompleter;
  };

}