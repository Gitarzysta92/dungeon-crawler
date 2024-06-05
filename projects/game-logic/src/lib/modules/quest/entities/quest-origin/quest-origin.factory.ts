import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { QuestService } from "../../quest.service";
import { IQuestResolver } from "../quest-resolver/quest-resolver.interface";
import { IQuest } from "../quest/quest.interface";
import { IQuestOrigin, IQuestOriginDeclaration } from "./quest-origin.interface";

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
      isQuestOrigin = true as const;
      exposedQuests: IQuest[];
      
      constructor(d: IQuestOriginDeclaration) {
        super(d);
        this.exposedQuests = d.exposedQuests as IQuest[];
      }

      public onInitialize(): void {
        this.exposedQuests.forEach(a => {
          // TO DO: check why NotEnumerable decorator, not setting property decorators correctly.
          Object.defineProperty(a, 'origin', {
            enumerable: false,
            configurable: false,
            value: new WeakRef(this)
          })
        });
      }

      public isExposingQuest(q: IQuest): boolean {
        return this.exposedQuests.includes(q);
      }

      public canGiveQuest(q: IQuest): boolean {
        return !this.exposedQuests.includes(q)
      }

      public async giveQuest(c: IQuestResolver, quest: IQuest): Promise<void> {
        c.takeQuest(quest);
      }
      
    }
    return QuestOrigin;
  };

}