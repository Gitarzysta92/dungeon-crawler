import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../../base/activity/activity.interface";
import { IGatheringController } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IQuestCompleter } from "../../entities/quest-completer/quest-completer.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";
import { IQuest } from "../../entities/quest/quest.interface";
import { FINISH_QUEST_ACTIVITY } from "../../quest.constants";
import { IFinishQuestActivity } from "./finish-quest.interface";


export class FinishQuestActivityFactory implements IMixinFactory<IFinishQuestActivity> {

  constructor() { }

  public validate(a: IFinishQuestActivity): boolean {
    return a.isActivity && a.id === FINISH_QUEST_ACTIVITY
  }

  public create(c: Constructor<IMixin>): Constructor<IFinishQuestActivity> {
    class FinishQuestActivity extends c implements IFinishQuestActivity {

      id: typeof FINISH_QUEST_ACTIVITY;
      cost?: IActivityCost[];
      isActivity = true as const;
      get quest(): IQuest | undefined { return this.subject as IQuest };

      @NotEnumerable()
      subject: IActivitySubject & IQuest;

      constructor(d: IFinishQuestActivity) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      canBeDone(c: IQuestResolver): boolean {
        return c.hasActive(this.id);
      }

      public async *doActivity(c: IQuestResolver, controller: IGatheringController): AsyncGenerator<any> {
        if (!this.canBeDone(c)) {
          throw new Error(`${FINISH_QUEST_ACTIVITY} cannot be performed`);
        }
        c.finishQuest(this.quest);
      }

      perform(bearer: any, value: number): void {}
    }

    return FinishQuestActivity;
  }
}