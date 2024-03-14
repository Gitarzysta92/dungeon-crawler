import { IInteractionDeclaration, IInteractionHandler } from "../../../../cross-cutting/interaction/interaction.interface";
import { IEffect, IEffectCaster } from "../../entities/effect.interface";

export const CAST_EFFECT_INTERACTION_IDENTIFIER = "CAST_EFFECT_INTERACTION_IDENTIFIER"

export interface ICastInteraction extends IInteractionDeclaration {
  id: typeof CAST_EFFECT_INTERACTION_IDENTIFIER,
}

export class CastInteractionHandler implements IInteractionHandler {
  
  delegateId = CAST_EFFECT_INTERACTION_IDENTIFIER;

  public isApplicableTo(d: IInteractionDeclaration): boolean {
    return d.delegateId === this.delegateId;
  }

  public resolveInteraction(initiator: IEffectCaster, subject: IEffect, interaction: ICastInteraction): boolean {
    return true;
  }
}