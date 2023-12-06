import { validateActor } from "../actors/actor-commons";
import { ActorType } from "../actors/actors.constants";
import { IActor } from "../actors/actors.interface";
import { Board } from "../board/board";
import { validateBoardObject } from "../board/board-commons";
import { IBoardObject, IBoardSelector, IBoardSelectorOrigin } from "../board/board.interface";
import { IEffectBase, IEffectCaster, IEffectSelector, IEffectTargetSelector, ILastingEffect } from "./effects.interface";
import { IEffect } from "./resolve-effect.interface";


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
  caster: IEffectCaster & Partial<IBoardObject> 
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
        return getPossibleActorsToSelect(effect, board, caster).length
      }
    }
  }

  return 0;
}


export function disposeLastingEffects(effects: ILastingEffect[], turn: number): void {
  for (let effect of effects) {
    if (effect.deploymentTurn != null && effect.deploymentTurn + effect.durationInTurns < turn) {
      effect.inactive = true;
    }
  }
}


export function getPossibleActorsToSelect(
  effect: IEffectBase & IBoardSelector,
  board: Board,
  caster: Partial<IBoardObject>                      
): IActor[] {

  if (!!caster.position) {
    effect.selectorOrigin = caster as IBoardObject;
  }

  const actors = board.getObjectsBySelector<IActor>(effect);
  const casterActor = validateActor(validateBoardObject(caster));
  if (!!casterActor) {
    actors.push(casterActor)
  }

  return actors.filter(a =>
      effect.effectTargetingSelector.targetingActors &&
      effect.effectTargetingSelector.targetingActors.some(t => t === a.actorType));
}


export function getPossibleOriginsToSelect(
  effect: IEffectBase & IBoardSelector,
  board: Board,
  caster: IEffectCaster & Partial<IBoardObject>    
): IBoardSelectorOrigin[] {
  if (!effect.selectorOriginDeterminant || effect.selectorOriginDeterminant.isCaster === true) {
    return [caster as IBoardSelectorOrigin]
  }

  effect.selectorOriginDeterminant.selectorOrigin = caster as IBoardObject;
  return board.determineValidOriginsForSelector(effect.selectorOriginDeterminant);
}


export function getPossibleEffectsToSelect(
  effect: IEffectBase & IEffectSelector,
  allEffects: IEffect[],
  caster: IEffectCaster
): IEffect[] {
  return allEffects;
}