import { IInteraction, IInteractionHandler } from "../../../cross-cutting/interaction/interaction.interface";
import { IAwardable, IReward } from "../rewards.interface";



export const CLAIM_REWARD_INTERACTION_IDENTIFIER = "CLAIM_REWARD_INTERACTION_IDENTIFIER"

export interface IClaimRewardInteraction extends IInteraction {
  id: typeof CLAIM_REWARD_INTERACTION_IDENTIFIER,
}

export class ClaimRewardInteractionHandler implements IInteractionHandler<IClaimRewardInteraction> {
  interactionId: string = typeof CLAIM_REWARD_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IAwardable, subject: IReward, interaction: IClaimRewardInteraction): boolean {
    return true;
  }
}