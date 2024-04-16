import { IActivityDeclaration, IActivityHandler } from "../../../../base/activity/activity.interface";
import { IAwardableDeclaration, IRewardDeclaration } from "../../rewards.interface";



export const CLAIM_REWARD_INTERACTION_IDENTIFIER = "CLAIM_REWARD_INTERACTION_IDENTIFIER"

export interface IClaimRewardInteraction extends IActivityDeclaration {
  id: typeof CLAIM_REWARD_INTERACTION_IDENTIFIER,
}

export class ClaimRewardInteractionHandler implements IActivityHandler {
  isApplicableTo: (d: IActivityDeclaration) => boolean;
  delegateId: string = typeof CLAIM_REWARD_INTERACTION_IDENTIFIER;

  public resolveInteraction(initiator: IAwardableDeclaration, subject: IRewardDeclaration, interaction: IClaimRewardInteraction): boolean {
    return true;
  }
}