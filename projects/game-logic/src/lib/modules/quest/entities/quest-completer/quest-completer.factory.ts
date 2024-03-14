import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionDeclaration } from "../../../../cross-cutting/interaction/interaction.interface";
import { Constructor } from "../../../../extensions/types";
import { QuestService } from "../../quest.service";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest } from "../quest/quest.interface";
import { IQuestCompleter, IQuestCompleterDeclaration } from "./quest-completer.interface";

export class QuestCompleterFactory implements IEntityFactory<IQuestCompleter> {

  constructor(
    private readonly _questsService: QuestService
  ) {}

  public validate(e: IEntity & Partial<IQuestCompleter>): boolean {
    return e.isQuestCompleter;
  };
  
  public create(bc: typeof Entity): Constructor<IQuestCompleter> {
    const questService = this._questsService;
    class QuestCompleter extends bc implements IQuestCompleter {
      completableQuestIds: string[];
      isQuestCompleter: true;
      interaction: IInteractionDeclaration[];
  
      private readonly _questService: QuestService = questService;
      
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