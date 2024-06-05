import { IActivityDeclaration } from "../../../../base/activity/activity.interface";
import { IQuestCompleter } from "../../entities/quest-completer/quest-completer.interface";
import { IQuest } from "../../entities/quest/quest.interface";
import { FINISH_QUEST_ACTIVITY } from "../../quest.constants";



export interface IFinishQuestActivity extends IActivityDeclaration {
  id: typeof FINISH_QUEST_ACTIVITY;
  readonly quest: IQuest;
  perform2(completer: IQuestCompleter): AsyncGenerator<any>;
}

export interface IFinishQuestActivitySignature {

}
