import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { IActivityDeclaration, IActivitySubject } from "../../../../base/activity/activity.interface";
import { Constructor } from "../../../../extensions/types";
import { QuestService } from "../../quest.service";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest } from "../quest/quest.interface";
import { IQuestCompleter, IQuestCompleterDeclaration } from "./quest-completer.interface";

export class QuestCompleterFactory implements IMixinFactory<IQuestCompleter> {

  constructor(
    private readonly _questsService: QuestService
  ) {}

  public validate(e: IEntityDeclaration & Partial<IQuestCompleter>): boolean {
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

      public completeQuest(q: IQuest, questResolver: IQuestResolver): Promise<void> { 
        if (!this.completableQuestIds.includes(q.id) || !q.isResolved()) {
          return;
        }
        questResolver.finishQuest(q);
      }
      
    }
    return QuestCompleter;
  };

}