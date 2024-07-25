import { IActivity } from "../../../../base/activity/activity.interface";
import { IGatheringController } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";
import { IQuest } from "../../entities/quest/quest.interface";
import { START_QUEST_ACTIVITY } from "../../quest.constants";


export interface IStartQuestActivity extends IActivity {
  id: typeof START_QUEST_ACTIVITY;
  readonly quest: IQuest;
  doActivity(resolver: IQuestResolver, controller: IGatheringController): AsyncGenerator<void>;
}

export interface IStartQuestActivitySignature {

}
