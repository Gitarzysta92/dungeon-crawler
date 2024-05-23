import { IActivityDeclaration, IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { QuestService } from "../../quest.service";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuestOrigin } from "./quest-origin.interface";

export class QuestOriginFactory implements IMixinFactory<IQuestOrigin> {

  constructor(
    private readonly _questsService: QuestService
  ) {}

  public validate(e: IQuestOrigin): boolean {
    return e.isQuestOrigin;
  };
  
  public create(bc: Constructor<IEntity & IActivitySubject>): Constructor<IQuestOrigin> {
    const questService = this._questsService;
    class QuestOrigin extends bc implements IQuestOrigin {
      isQuestOrigin: true;
      startQuestIds: string[];
      activityDeclarations: IActivityDeclaration[];

      private readonly _questService: QuestService = questService;
      
      public async giveQuest(c: IQuestResolver, questId: Guid): Promise<void> {
        if (!this.startQuestIds.includes(questId)) {
          return;
        }
        const quest = await this._questService.createQuest(questId);
        c.takeQuest(quest);
      }
      
    }
    return QuestOrigin;
  };

}