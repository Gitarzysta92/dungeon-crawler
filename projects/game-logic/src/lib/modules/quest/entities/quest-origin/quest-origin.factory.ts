import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionDeclaration } from "../../../../cross-cutting/interaction/interaction.interface";
import { Constructor, Guid } from "../../../../extensions/types";
import { QuestService } from "../../quest.service";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuestOrigin } from "./quest-origin.interface";

export class QuestOriginFactory implements IEntityFactory<IQuestOrigin> {

  constructor(
    private readonly _questsService: QuestService
  ) {}

  public validate(e: IEntity & Partial<IQuestOrigin>): boolean {
    return e.isQuestOrigin;
  };
  
  public create(bc: typeof Entity): Constructor<IQuestOrigin> {
    const questService = this._questsService;
    class QuestOrigin extends bc implements IQuestOrigin {
      isQuestOrigin: true;
      startQuestIds: string[];
      interaction: IInteractionDeclaration[];

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