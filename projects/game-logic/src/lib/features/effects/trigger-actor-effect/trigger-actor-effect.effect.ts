import { IPayloadDefinition } from "../commons/payload-collector/effect-payload.interface";
import { ITriggerActorEffectDefinition, ITriggerActorEffectPayload, ITriggerActorSignature } from "./trigger-actor-effect.interface";
import { resolveEffect } from "../resolve-effect";
import { Board } from "../../board/board";
import { Inventory } from "../../items/inventory";
import { IEffect } from "../resolve-effect.interface";
import { IEffectDefinition } from "../payload-definition.interface";
import { EffectCollectableDataDefinition } from "../commons/payload-collector/collectable-data-types/effect-collectable-data";
import { GatheringStepDataName } from "../commons/payload-collector/effect-payload-collector.constants";
import { IEffectSignature } from "../signature.interface";
import { validateEffect } from "../commons/effects-commons";
import { IActor } from "../../actors/actors.interface";
import { validateActor } from "../../actors/actor-commons";


export function resolveTriggerActorEffect(
  triggeredEffects: ITriggerActorEffectPayload,
  board: Board,
  heroInventory: Inventory,
  lastingEffects: IEffect[]
): ITriggerActorSignature {
  const signatures = triggeredEffects.nestedPayloads
    .map(p => resolveEffect(p, board, heroInventory, lastingEffects));
  
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
  //TODO remove any assertion
  return {
    effect,
    caster,
    amountOfTargets: effect.effectTargetingSelector.amountOfTargets ?? getPossibleActorEffectsToSelect(board.objectList as any).length,
    preparationSteps: [
      new EffectCollectableDataDefinition({
        requireUniqueness: true,
        possibleEffectsResolver : () => getPossibleActorEffectsToSelect(board.objectList as any),
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



export function getPossibleActorEffectsToSelect(
  allEffects: IActor & IEffect[],
): IEffect[] {
  return allEffects.filter(e => validateEffect(validateActor(e)));
}