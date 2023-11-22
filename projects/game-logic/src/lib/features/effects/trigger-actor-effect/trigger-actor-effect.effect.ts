import { getPossibleEffectsToSelect } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { ITriggerActorEffect, ITriggerActorEffectDefinition, ITriggerActorEffectPayload } from "./trigger-actor-effect.interface";
import { resolveEffect } from "../resolve-effect";
import { Board } from "../../board/board";
import { Inventory } from "../../items/inventory";
import { IEffect } from "../resolve-effect.interface";
import { IEffectCaster } from "../effects.interface";
import { IEffectDefinition } from "../payload-definition.interface";


export function resolveTriggerActorEffect(
  triggeredEffects: ITriggerActorEffectPayload,
  board: Board,
  heroInventory: Inventory,
  lastingEffects: IEffect[]
): void {
  for (let triggeredEffect of triggeredEffects.payload) {
    resolveEffect(
      triggeredEffect,
      board,
      heroInventory,
      lastingEffects
    );
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
      {
        dataName: 'effect',
        requireUniqueness: true,
        possibleEffectsResolver : () => getPossibleEffectsToSelect(effect, allEffects, caster),
      }
    ],
    nestedDefinitionFactory: (preparationSteps) => {
      const effect = preparationSteps.steps.find(s => s.dataName === 'effect')?.payload as IEffectDefinition;
      return getPayloadDefinitions(effect, board, inventory,  allEffects, )
    }
  }
}