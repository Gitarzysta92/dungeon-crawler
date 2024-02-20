import { IInteraction, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { IQuestCompleter, IQuestResolver } from "../quest.interface";


export const START_QUEST_INTERACTION_IDENTIFIER = "START_QUEST_INTERACTION_IDENTIFIER"

export interface IStartQuestInteraction extends IInteraction {
  id: typeof START_QUEST_INTERACTION_IDENTIFIER,
}

export class StartQuestHandler implements IInteractionHandler<IStartQuestInteraction> {
  interactionId: string = typeof START_QUEST_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IQuestCompleter, subject: IQuestResolver, interaction: IStartQuestInteraction): boolean {
    return true;
  }
}