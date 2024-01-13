import { IBasicStats, ICreature } from "../../actors/actors.interface";
import { BoardService } from "../../board/board.service";
import { IAassignedBoardObject, IBoardSelectorOrigin } from "../../board/board.interface";
import { IDealDamage, IDealDamageDefinition, IDealDamagePayload, IDealDamageSignature } from "./deal-damage.interface";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect } from "../commons/effects-commons";
import { IPayloadDefinition } from "../commons/effect-payload-collector/effect-payload.interface";
import { DamageType, EffectName } from "../commons/effect.constants";
import { calculateStats } from "../modify-statistics/modify-statistics.effect";
import { IEffect } from "../resolve-effect.interface";
import { ActorCollectableDataDefinition } from "../commons/effect-payload-collector/collectable-data-types/actor-collectable-data";
import { OriginCollectableDataDefinition } from "../commons/effect-payload-collector/collectable-data-types/origin-collectable-data";

export function dealDamage(hero: IBasicStats, effect: IDealDamage, enemy: ICreature): number {
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
  board: BoardService,
  lastingEffects: IEffect[]
): IDealDamageSignature {
  let { effect, payload } = dealDamagePayload;

  if (effect.effectName !== EffectName.DealDamage) {
    throw new Error("Provided payload is not suitable for Deal Damage effect resolver");
  }

  if (effect?.effectName !== EffectName.DealDamage) {
    throw new Error("No required payload provided for dealDamage effect");
  }

  if (!('selectorType' in effect)) {
    throw new Error("Deal damage: Board selector not provided");
  }

  for (let target of payload) {
    // TODO : get rid of copying this object
    effect.selectorOrigin = { ...target.origin };
    const isSelectable = board
      .getObjectsBySelector<ICreature & IAassignedBoardObject>(effect)
      .some(o => o.id === target.actor.id);
    if (!isSelectable) {
      throw new Error("Not all selected targets are available to take an attack");
    }
  }

  const targets = payload.map(target => {
    // TODO : get rid of copying this object
    effect = Object.assign({ ...effect }, {
      // TODO : get rid of copying this object 
      selectorOrigin: { ...target.origin },
      selectorDirection: target.origin.rotation
    });

    const caster = calculateStats(target.origin, lastingEffects);
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
  board: BoardService
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  const amountOfTargets = calculateMaxAmountOfTargets(effect, board, caster);

  return {
    effect,
    caster,
    amountOfTargets,
    gatheringSteps: [
      // TODO remove type assertion
      new OriginCollectableDataDefinition({
        requireUniqueness: false,
        payload: caster as unknown as IBoardSelectorOrigin
      }),
      new ActorCollectableDataDefinition({
        requireUniqueness: true,
        possibleActorsResolver: () => getPossibleActorsToSelect(effect, board, caster),
      })
    ]
  }
}