import { IActivityDeclaration, IActivityHandler } from "../../../../base/activity/activity.interface";
import { IEffect, IEffectCaster } from "../../entities/effect.interface";

export const CAST_EFFECT_INTERACTION_IDENTIFIER = "CAST_EFFECT_INTERACTION_IDENTIFIER"

export interface ICastInteraction extends IActivityDeclaration {
  id: typeof CAST_EFFECT_INTERACTION_IDENTIFIER,
}

export class CastInteractionHandler implements IActivityHandler {
  
  delegateId = CAST_EFFECT_INTERACTION_IDENTIFIER;

  public isApplicableTo(d: IActivityDeclaration): boolean {
    return d.delegateId === this.delegateId;
  }

  public resolveInteraction(initiator: IEffectCaster, subject: IEffect, interaction: ICastInteraction): boolean {
    return true;
  }
}