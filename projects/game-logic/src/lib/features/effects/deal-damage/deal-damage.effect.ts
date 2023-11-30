import { IBasicStats, IEnemy } from "../../actors/actors.interface";
import { Board } from "../../board/board";
import { IBoardObject } from "../../board/board.interface";
import { IDealDamage, IDealDamageDefinition, IDealDamagePayload, IDealDamageSignature } from "./deal-damage.interface";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { DamageType, EffectName } from "../effects.constants";
import { calculateStats } from "../modify-statistics/modify-statistics.effect";
import { IEffect } from "../resolve-effect.interface";
import { ActorCollectableData } from "../effect-payload-collector-collectable-data";

export function dealDamage(hero: IBasicStats, effect: IDealDamage, enemy: IEnemy): number {
  let modifier = 0;
  if (effect.damageType === DamageType.Magical) {
    modifier = hero.spellPower;
  } else if (effect.damageType === DamageType.Phisical) {
    modifier = hero.attackPower;
  }
  const damage = modifier + effect.damageValue - enemy.defence;
  return damage > 0 ? damage : 0;
}

export function resolveDealDamage(
  dealDamagePayload: IDealDamagePayload,
  board: Board,
  lastingEffects: IEffect[]
): IDealDamageSignature {
  const { effect, payload } = dealDamagePayload;

  if (effect.effectName !== EffectName.DealDamage) {
    throw new Error("Provided payload is not suitable for Deal Damage effect resolver");
  }

  if (effect?.effectName !== EffectName.DealDamage) {
    throw new Error("No required payload provided for dealDamage effect");
  }

  if (!('selectorType' in payload)) {
    throw new Error("Deal damage: Board selector not provided");
  }

  for (let target of payload) {
    const isSelectable = board
      .getObjectsBySelector<IEnemy & IBoardObject>(effect)
      .some(o => o.id === target.actor.id);
    if (!isSelectable) {
      throw new Error("Not all selected targets are available to take an attack");
    }
  }


  const targets = payload.map(target => {
    const caster = calculateStats(target.caster, lastingEffects);
    return {
      damage: dealDamage(caster, effect, calculateStats(target.actor, lastingEffects)),
      actor: target.actor
    }
  })

  for (let target of targets) {
    target.actor.health -= target.damage;
  }

  

  return {
    effectId: dealDamagePayload.effect.id,
    effectName: EffectName.DealDamage,
    data: {
      damageType: dealDamagePayload.effect.damageType,
      casterId: dealDamagePayload.caster.id,
      targets: targets.map(t => ({ targetId: t.actor.id, damageDone: t.damage}))
    }
  }
}

export function getDealDamagePayloadDefinition(
  effectDefinition: IDealDamageDefinition,
  board: Board
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  const amountOfTargets = calculateMaxAmountOfTargets(effect, board, caster)
  return {
    effect,
    caster,
    amountOfTargets,
    gatheringSteps: [
      new ActorCollectableData({
        requireUniqueness: true,
        possibleActorsResolver: () => getPossibleActorsToSelect(effect, board, caster),
      })
    ]
  }
}