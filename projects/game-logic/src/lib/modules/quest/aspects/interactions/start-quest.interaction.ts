import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IQuestCompleter } from "../../entities/quest-completer/quest-completer.interface";
import { IQuestResolver } from "../../entities/quest-resolver/quest-resolver.interface";


export const START_QUEST_INTERACTION_IDENTIFIER = "START_QUEST_INTERACTION_IDENTIFIER"

export interface IStartQuestInteraction extends IInteractionDeclaration {
  id: typeof START_QUEST_INTERACTION_IDENTIFIER,
}

export class StartQuestHandler implements IInteractionHandler<IStartQuestInteraction> {
  interactionId: string = typeof START_QUEST_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IQuestResolver, subject: IQuestCompleter, interaction: IStartQuestInteraction): boolean {
    return true;
  }
}