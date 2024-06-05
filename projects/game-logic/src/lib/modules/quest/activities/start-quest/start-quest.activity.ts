
import { IActivityCost, IActivitySubject } from "../../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";
import { IQuest } from "../../entities/quest/quest.interface";
import { START_QUEST_ACTIVITY } from "../../quest.constants";
import { IStartQuestActivity } from "./start-quest.interface";


export class StartQuestActivityFactory implements IMixinFactory<IStartQuestActivity> {

  constructor() { }

  public validate(a: IStartQuestActivity): boolean {
    return a.isActivity && a.id === START_QUEST_ACTIVITY
  }

  public create(c: Constructor<IMixin>): Constructor<IStartQuestActivity> {
    class StartQuestActivity extends c implements IStartQuestActivity {

      id: typeof START_QUEST_ACTIVITY;
      cost?: IActivityCost[];
      isActivity = true as const;
      get quest(): IQuest | undefined { return this.subject as IQuest };

      @NotEnumerable()
      subject: IActivitySubject & IQuest;

      constructor(d: IStartQuestActivity) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      public canBePerformed(r: IQuestResolver): boolean {
        if (!this.quest.origin.deref()) {
          return false;
        }

        if (!r.isAdjanced(this.quest.origin.deref())) {
          return false;
        }

        if (!this.quest.origin.deref().isExposingQuest(this.quest)) {
          return false
        }

        if (r.hasActive(this.quest.id)) {
          return false;
        }

        if (r.hasResolved(this.quest.id)) {
          return false;
        }

        return this.quest.isPossibleToStart()
      }

      public async *perform2(r: IQuestResolver): AsyncGenerator<any> {
        if (!this.canBePerformed(r)) {
          throw new Error(`${START_QUEST_ACTIVITY} cannot be performed`);
        }

        this.quest.origin.deref()?.giveQuest(r, this.quest);
      }

      perform(bearer: any, value: number): void {}
    }

    return StartQuestActivity;
  }
}