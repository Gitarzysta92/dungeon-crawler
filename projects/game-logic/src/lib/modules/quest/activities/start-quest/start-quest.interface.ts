import { IActivityDeclaration } from "../../../../base/activity/activity.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";
import { IQuest } from "../../entities/quest/quest.interface";
import { START_QUEST_ACTIVITY } from "../../quest.constants";


export interface IStartQuestActivity extends IActivityDeclaration {
  id: typeof START_QUEST_ACTIVITY;
  readonly quest: IQuest;
  perform2(traveler: IQuestResolver): AsyncGenerator<any>;
}

export interface IStartQuestActivitySignature {

}
