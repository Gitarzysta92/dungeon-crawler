import { IInteraction, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { IInventoryBearer } from "../../item/inventory/inventory-bearer.interface";
import { IQuestOrigin } from "../quest.interface";


export const FINISH_QUEST_INTERACTION_IDENTIFIER = "FINISH_QUEST_INTERACTION_IDENTIFIER";

export interface IFinishQuestInteraction extends IInteraction {
  id: typeof FINISH_QUEST_INTERACTION_IDENTIFIER,
}

export class FinishQuestHandler implements IInteractionHandler<IFinishQuestInteraction> {
  interactionId: string = typeof FINISH_QUEST_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IInventoryBearer, subject: IQuestOrigin, interaction: IFinishQuestInteraction): boolean {
    return true;
  }
}