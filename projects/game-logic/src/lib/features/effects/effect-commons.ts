import { IActor, IBasicStats, IEnemy } from "../actors/actors.interface";
import { Board } from "../board/board";
import { IBoardObject } from "../board/board.interface";
import { dealDamage } from "./deal-damage.effect";
import { IEffect, CastEffectPayload } from "./effect-commons.interface";
import { EffectName } from "./effects.constants";
import { IEffectTargetSelector, ILastingEffect } from "./effects.interface";
import { modifyPosition } from "./modify-position.effect";
import { calculateStats, modifyStats } from "./modify-statistics.effect";
import { spawnActor } from "./spawn-actor.effect";


export function validateEffectSelector(selector: IEffectTargetSelector, actors: IActor[]): void {
  if (selector.selectorTargets === 'multiple' && selector.amountOfTargets! < actors.length) {
    throw new Error("EffectSelector: Too many selected actors");
  }

  for (let actor of actors) { 
    if (!selector.targetingActors.some(t => t === actor.actorType)) {
      throw new Error(`EffectSelector: Given actor type (${actor.actorType}) cannot be selected`);
    }
  }
}

export function disposeLastingEffects(effects: ILastingEffect[], turn: number): void {
  for (let effect of effects) {
    if (effect.deploymentTurn != null && effect.deploymentTurn + effect.durationInTurns < turn) {
      effect.inactive = true;
    }
  }
}


export function resolveEffect(
  board: Board,
  payload: CastEffectPayload,
  effects: IEffect[],
  originActor?: IActor & IBasicStats
): void {
  if (payload.effect.effectName === EffectName.DealDamage) {
    if (payload.effectData?.effectName !== EffectName.DealDamage) {
      throw new Error("No required payload provided for dealDamage effect");
    }

    const actualTargets = board.getSelectedObjects<IEnemy & IBoardObject>(payload.effect, payload.effectData.payload);
    if (!!payload.effectData && payload.effectData.payload.length > actualTargets.length) {
      throw new Error("Not all selected targets are available to take an attack");
    }

    if (!originActor) {
      throw new Error("Origin actor is not provided for deal damage effect");
    }

    const heroStats = calculateStats(originActor, effects);
    for (let actualTarget of actualTargets) {
      const damage = dealDamage(heroStats, payload.effect, calculateStats(actualTarget, effects));
      actualTarget.health -= damage;
    }
  }

  if (payload.effect.effectName === EffectName.SpawnActor) {
    if (payload.effectData?.effectName !== EffectName.SpawnActor) {
      throw new Error("No required payload provided for spawnActor effect");
    }
    spawnActor(board, payload.effect, payload.effectData.payload);
  }

  if (payload.effect.effectName === EffectName.ModifyPosition) {
    if (payload.effectData?.effectName !== EffectName.ModifyPosition) {
      throw new Error("No required payload provided for spawnActor effect");
    }
    modifyPosition(board, payload.effect, payload.effectData.payload);
  }

  if (payload.effect.effectName === EffectName.ModifyStats) {
    if (payload.effectData?.effectName !== EffectName.ModifyStats) {
      throw new Error("No required payload provided for modifyStats effect");
    }
    const actors = payload.effectData.payload.map<IActor & IBasicStats>(p => board.getObjectById(p.id) as any);
    if (actors.some(a => !a)) {
      throw new Error("Cannot find actor")
    } 

    modifyStats(payload.effect, actors);
  }
}