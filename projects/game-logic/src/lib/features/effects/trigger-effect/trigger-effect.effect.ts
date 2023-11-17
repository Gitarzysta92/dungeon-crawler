import { getPossibleEffectsToSelect } from "../effects-commons";
import { CastEffectPayload, IEffect } from "../effects-commons.interface";
import { IPayloadDefinition } from "../effect-payload.interface";
import { ITriggerEffect } from "./trigger-effect.interface";



export function resolveTriggerEffect(
  payloads: CastEffectPayload[]
): void {
  for (let payload of payloads) {

  }
}





export function getTriggerEffectPayloadDefinitions(
  effect: ITriggerEffect,
  allEffects: IEffect[],
): IPayloadDefinition[] {
  return [{
    effectId: effect.id,
    amountOfTargets: effect.effectTargetingSelector.amountOfTargets || Infinity,
    gatheringSteps: [
      {
        dataName: 'effect',
        requireUniqueness: true,
        possibleEffects: getPossibleEffectsToSelect(effect, allEffects),
      }
    ]
  }]
}