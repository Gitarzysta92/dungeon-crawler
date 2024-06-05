import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IQuestCompleter } from "../../entities/quest-completer/quest-completer.interface";
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

      canBePerformed(c: IQuestCompleter): boolean {
        return c.canCompleteQuest(this.quest);
      }

      public async *perform2(c: IQuestCompleter): AsyncGenerator<any> {
        if (!this.canBePerformed(c)) {
          throw new Error(`${FINISH_QUEST_ACTIVITY} cannot be performed`);
        }
        c.completeQuest(this.quest);
      }

      perform(bearer: any, value: number): void {}
    }

    return FinishQuestActivity;
  }
}