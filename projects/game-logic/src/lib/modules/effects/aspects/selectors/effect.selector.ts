import { ISelectorDeclaration, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { IEffect } from "../../entities/effect.interface";

export const EFFECT_SELECTOR_IDENTIFIER = "EFFECT_SELECTOR_IDENTIFIER";

export interface IEffectSelectorPayload {
  selectedEffectId?: string;
}

export class EffectSelector implements ISelectorHandler<IEffectSelectorPayload, IEffect> {
  delegateId = EFFECT_SELECTOR_IDENTIFIER;

  isApplicableTo(s: ISelectorDeclaration<IEffectSelectorPayload>): boolean {
    return this.delegateId === s.delegateId;
  }

  select(s: ISelectorDeclaration<IEffectSelectorPayload>, es: IEffect[]): IEffect[] {
    return es.filter(e => 
      (!s.payload.selectedEffectId || e.id === s.payload.selectedEffectId) &&
      e.isEffect
    );
  };
}