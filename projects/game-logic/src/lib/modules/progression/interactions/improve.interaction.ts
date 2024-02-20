import { IInteraction, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { IProgressable, IImprovable } from "../progression.interface";


export const IMPROVE_INTERACTION_IDENTIFIER = "IMPROVE_INTERACTION_IDENTIFIER"

export interface IImproveInteraction extends IInteraction {
  id: typeof IMPROVE_INTERACTION_IDENTIFIER,
}

export class CastInteractionHandler implements IInteractionHandler<IImproveInteraction> {
  interactionId: string = typeof IMPROVE_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IProgressable, subject: IImprovable, interaction: IImproveInteraction): boolean {
    return true;
  }
}