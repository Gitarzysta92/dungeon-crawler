import { IActivityDeclaration } from "../../../../base/activity/activity.interface";
import { IEffect, IEffectCaster } from "../../entities/effect.interface";

export const CAST_EFFECT_INTERACTION_IDENTIFIER = "CAST_EFFECT_INTERACTION_IDENTIFIER"

export interface ICastInteraction extends IActivityDeclaration {
  id: typeof CAST_EFFECT_INTERACTION_IDENTIFIER,
}

export class CastInteractionHandler  {
  
  delegateId = CAST_EFFECT_INTERACTION_IDENTIFIER;

  public isApplicableTo(d: IActivityDeclaration): boolean {
    return false
  }

  public resolveInteraction(initiator: IEffectCaster, subject: IEffect, interaction: ICastInteraction): boolean {
    return true;
  }
}