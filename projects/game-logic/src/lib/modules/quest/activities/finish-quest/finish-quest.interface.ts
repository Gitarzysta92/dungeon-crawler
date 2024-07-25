import { IActivity, } from "../../../../base/activity/activity.interface";
import { IGatheringController } from "../../../../cross-cutting/gatherer/data-gatherer.interface";
import { IQuestCompleter } from "../../entities/quest-completer/quest-completer.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";
import { IQuest } from "../../entities/quest/quest.interface";
import { FINISH_QUEST_ACTIVITY } from "../../quest.constants";



export interface IFinishQuestActivity extends IActivity {
  id: typeof FINISH_QUEST_ACTIVITY;
  readonly quest: IQuest;
  doActivity(resolver: IQuestResolver, controller: IGatheringController): AsyncGenerator<any>;
}

export interface IFinishQuestActivitySignature {

}
