import { ActorType } from "../actors/actors.constants";
import { IActor } from "../actors/actors.interface";
import { Board } from "../board/board";
import { IBoardSelector } from "../board/board.interface";
import { IEffect } from "./effects-commons.interface";
import { IEffectBase, IEffectSelector, IEffectTargetSelector, ILastingEffect } from "./effects.interface";


export function validateEffectSelector(selector: IEffectTargetSelector, actors: IActor[]): void {
  if (selector.selectorTargets === 'multiple' && selector.amountOfTargets! < actors.length) {
    throw new Error("EffectSelector: Too many selected actors");
  }

  for (let actor of actors) { 
    if (selector.targetingActors && !selector.targetingActors.some(t => t === actor.actorType)) {
      throw new Error(`EffectSelector: Given actor type (${actor.actorType}) cannot be selected`);
    }
  }
}

export function calculateMaxAmountOfTargets(
  effect: IEffectBase & IBoardSelector,
  board: Board,
): number {
  if (effect.effectTargetingSelector.selectorTargets === 'caster' || effect.effectTargetingSelector.selectorTargets === 'single') {
    return 1;
  }

  if (effect.effectTargetingSelector.selectorTargets === 'multiple') {
    if (effect.effectTargetingSelector.amountOfTargets == null) {
      throw new Error('Amount of targets not provided')
    }
    return effect.effectTargetingSelector.amountOfTargets!;
  }

  if (effect.effectTargetingSelector.selectorTargets === 'all' &&
    Array.isArray(effect.effectTargetingSelector.targetingActors)) {
    for (let actorType of effect.effectTargetingSelector.targetingActors) {
      if (actorType === ActorType.Enemy) {
        return getPossibleActorsToSelect(effect, board).length
      }
    }
  }

  return 0;
}

export function getPossibleActorsToSelect(
  effect: IEffectBase & IBoardSelector,
  board: Board,
): IActor[] {
  return board.getSelectedFields(effect)
    .map(f => Object.assign({}, board.getObjectFromField(f.coords)) as unknown as IActor)
    .filter(a => !!a &&
      effect.effectTargetingSelector.targetingActors &&
      effect.effectTargetingSelector.targetingActors.some(t => t === a.actorType));
}

export function disposeLastingEffects(effects: ILastingEffect[], turn: number): void {
  for (let effect of effects) {
    if (effect.deploymentTurn != null && effect.deploymentTurn + effect.durationInTurns < turn) {
      effect.inactive = true;
    }
  }
}

export function getPossibleEffectsToSelect(
  effect: IEffectBase & IEffectSelector,
  allEffects: IEffect[]
): IEffect[] {
  return allEffects;
}