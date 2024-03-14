import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IAwardableDeclaration, IRewardDeclaration } from "../../rewards.interface";



export const CLAIM_REWARD_INTERACTION_IDENTIFIER = "CLAIM_REWARD_INTERACTION_IDENTIFIER"

export interface IClaimRewardInteraction extends IInteractionDeclaration {
  id: typeof CLAIM_REWARD_INTERACTION_IDENTIFIER,
}

export class ClaimRewardInteractionHandler implements IInteractionHandler {
  isApplicableTo: (d: IInteractionDeclaration) => boolean;
  delegateId: string = typeof CLAIM_REWARD_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IAwardableDeclaration, subject: IRewardDeclaration, interaction: IClaimRewardInteraction): boolean {
    return true;
  }
}