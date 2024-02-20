import { IInteraction, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { IProgressable, IUnlockable } from "../progression.interface";


export const UNLOCK_INTERACTION_IDENTIFIER = "UNLOCK_INTERACTION_IDENTIFIER"

export interface IUnlockInteraction extends IInteraction {
  id: typeof UNLOCK_INTERACTION_IDENTIFIER,
}

export class UnlockInteractionHandler implements IInteractionHandler<IUnlockInteraction> {
  interactionId: string = typeof UNLOCK_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IProgressable, subject: IUnlockable, interaction: IUnlockInteraction): boolean {
    return true;
  }
}