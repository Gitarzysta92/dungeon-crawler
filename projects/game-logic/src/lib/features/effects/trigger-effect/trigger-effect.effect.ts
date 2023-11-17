import { getPossibleEffectsToSelect } from "../effects-commons";
import { CastEffectPayload, IEffect } from "../effects-commons.interface";
import { IPayloadDefinition } from "../effect-payload.interface";
import { ITriggerEffect } from "./trigger-effect.interface";
import { resolveEffect } from "../resolve-effect";
import { IActor, IBasicStats } from "../../actors/actors.interface";
import { Board } from "../../board/board";
import { Inventory } from "../../items/inventory";


export function resolveTriggerEffect(
  triggeredEffects: (CastEffectPayload & { caster: IActor & IBasicStats })[],
  board: Board,
  heroInventory: Inventory,
  effects: IEffect[]
): void {
  for (let triggeredEffect of triggeredEffects) {
    resolveEffect(
      triggeredEffect.effect,
      triggeredEffect.effectData!,
      triggeredEffect.caster,
      board,
      heroInventory,
      effects
    );
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
        dataName: 'actor',
        requireUniqueness: true,
        autoCollect: true,
        possibleActors: []
      },
      {
        dataName: 'effect',
        incorporatePayloadDefinitionForSelectedEffect: true,
        requireUniqueness: true,
        possibleEffects: getPossibleEffectsToSelect(effect, allEffects),
      }
    ]
  }]
}