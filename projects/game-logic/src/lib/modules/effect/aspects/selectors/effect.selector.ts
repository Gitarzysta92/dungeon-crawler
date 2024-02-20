import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { ISelectorDefaultPayload, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { Effect } from "../../effect";

export const EFFECT_SELECTOR_IDENTIFIER = "EFFECT_SELECTOR_IDENTIFIER";

export interface IEffectSelectorPayload extends ISelectorDefaultPayload {
  selectedEffectId?: string;
  selectedEffectTargetingActors?: unknown[];
  selectedEffectSelectorTargets?: 'single' | 'multiple' | 'all' | 'caster';
  selectedEffectAmountOfTargets?: number;
}

export class EffectSelector implements ISelectorHandler<IEffectSelectorPayload, Effect> {
  delegateId = EFFECT_SELECTOR_IDENTIFIER;

  select: (s: ISelectorDefaultPayload, d: unknown[]) => Effect[];
  isApplicableTo: (d: IDelegateDeclaration<IEffectSelectorPayload>) => boolean;
  prepare: (ctx: unknown, d: IEffectSelectorPayload) => IEffectSelectorPayload;

}

// public static validateEffectSelector(selector: IEffectTargetSelector, actors: IActor[]): void {
//   if (selector.selectorTargets === 'multiple' && selector.amountOfTargets! < actors.length) {
//     throw new Error("EffectSelector: Too many selected actors");
//   }

//   for (let actor of actors) { 
//     if (selector.targetingActors && !selector.targetingActors.some(t => t === actor.actorType)) {
//       throw new Error(`EffectSelector: Given actor type (${actor.actorType}) cannot be selected`);
//     }
//   }
// }