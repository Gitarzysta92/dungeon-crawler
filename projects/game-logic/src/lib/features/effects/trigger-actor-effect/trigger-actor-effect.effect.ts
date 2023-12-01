import { getPossibleEffectsToSelect } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { ITriggerActorEffectDefinition, ITriggerActorEffectPayload, ITriggerActorSignature } from "./trigger-actor-effect.interface";
import { resolveEffect } from "../resolve-effect";
import { Board } from "../../board/board";
import { Inventory } from "../../items/inventory";
import { IEffect } from "../resolve-effect.interface";
import { IEffectDefinition } from "../payload-definition.interface";
import { EffectCollectableData } from "../effect-payload-collector-collectable-data";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { IEffectSignature } from "../signature.interface";


export function resolveTriggerActorEffect(
  triggeredEffects: ITriggerActorEffectPayload,
  board: Board,
  heroInventory: Inventory,
  lastingEffects: IEffect[]
): ITriggerActorSignature {
  const signatures = triggeredEffects.payload
    .map(p => resolveEffect(p, board, heroInventory, lastingEffects))

  return {
    effectId: triggeredEffects.effect.id,
    effectName: triggeredEffects.effect.effectName,
    data: {
      casterId: triggeredEffects.caster.id,
      signatures: signatures as IEffectSignature[]
    }
  }
}

export function getTriggerActorEffectPayloadDefinitions(
  effectData: ITriggerActorEffectDefinition,
  allEffects: IEffect[],
  inventory: Inventory,
  board: Board,
  getPayloadDefinitions: (
    effectData: IEffectDefinition,
    board: Board,
    inventory: Inventory,
    allEffects: IEffect[]
  ) => IPayloadDefinition
): IPayloadDefinition {
  const { effect, caster } = effectData;
  return {
    effect,
    caster,
    amountOfTargets: effect.effectTargetingSelector.amountOfTargets ?? Infinity,
    preparationSteps: [
      new EffectCollectableData({
        requireUniqueness: true,
        possibleEffectsResolver : () => getPossibleEffectsToSelect(effect, allEffects, caster),
      })
    ],
    nestedDefinitionFactory: (preparationSteps) => {
      const effect = preparationSteps.steps.find(s => s.dataName === GatheringStepDataName.Effect)?.payload as IEffect;
      return getPayloadDefinitions({
        effect: effect,
        effectName: effect.effectName,
        caster: effect
      } as IEffectDefinition, board, inventory,  allEffects, )
    }
  }
}