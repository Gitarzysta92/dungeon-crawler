import { IActivityDeclaration, IActivityHandler } from "../../../../base/activity/activity.interface";

import { IQuestOrigin } from "../../entities/quest-origin/quest-origin.interface";


export const FINISH_QUEST_INTERACTION_IDENTIFIER = "FINISH_QUEST_INTERACTION_IDENTIFIER";

export interface IFinishQuestInteraction extends IActivityDeclaration {
  id: typeof FINISH_QUEST_INTERACTION_IDENTIFIER,
}

export class FinishQuestHandler implements IActivityHandler {
  isApplicableTo(d: IActivityDeclaration): boolean {
    throw new Error("Method not implemented.");
  }
  delegateId: string = typeof FINISH_QUEST_INTERACTION_IDENTIFIER;;

  public resolveInteraction(initiator: unknown, subject: IQuestOrigin, interaction: IFinishQuestInteraction): boolean {
    return true;
  }
}