import { IActivityDeclaration, IActivityHandler } from "../../../../base/activity/activity.interface";
import { IPerkBearer } from "../../entities/perk-bearer/perk-bearer.interface";
import { IPerk } from "../../perk.interface";

export const UNLOCK_PERK_INTERACTION = "UNLOCK_PERK_INTERACTION"

export interface IUnlockPerkInteractionPayload extends IActivityDeclaration {
  id: typeof UNLOCK_PERK_INTERACTION,
}

export class UnlockPerkInteractionHandler implements IActivityHandler {

  delegateId = typeof UNLOCK_PERK_INTERACTION;

  public isApplicableTo(d: IActivityDeclaration): boolean {
    return this.delegateId === d.delegateId;
  }

  public resolveInteraction(initiator: IPerkBearer, perk: IPerk): boolean {
    return initiator.unlock(perk)
  }
}