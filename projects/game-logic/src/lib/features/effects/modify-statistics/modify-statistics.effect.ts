import { IActor, IBasicStats } from "../../actors/actors.interface";
import { BoardStateHandler } from "../../board/board.state-handler";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect, validateEffectSelector } from "../commons/effects-commons";
import { IPayloadDefinition } from "../commons/effect-payload-collector/effect-payload.interface";
import { EffectLifeTime, EffectResolveType, EffectName } from "../commons/effect.constants";
import { IEffectBase, IPassiveLastingEffect } from "../commons/effect.interface";
import { IModifyStats, IModifyStatsDefinition, IModifyStatsPayload, IModifyStatsResult, IModifyStatsSignature } from "./modify-statistics.interface";
import { ActorCollectableDataDefinition } from "../commons/effect-payload-collector/collectable-data-types/actor-collectable-data";


export function calculateStats<T extends IActor & IBasicStats>(
  stats: T,
  effects: (IEffectBase & Omit<Partial<IPassiveLastingEffect>, "effectLifeTime">)[]
): T {
  stats = { ...stats };

  for (let effect of effects) {
    if (effect.effectLifeTime !== EffectLifeTime.Lasting) {
      continue;
    } 

    if (effect.effectResolveType !== EffectResolveType.Passive) {
      continue;
    }

    if (effect.effectName === EffectName.ModifyStats) {
      modifyStats(effect as IModifyStats<IBasicStats>, stats);
    }
  }
  return stats;
}


export function modifyStats<T extends IActor & IBasicStats>(effect: IModifyStats<any>, actor: T): IModifyStatsResult<T> {
  const modifications: Array<{
    statName: keyof T
    statBefore: number;
    statAfter: number;
  }> = [];

  for (let mod of effect.statsModifications) {
    const modification: any = {
      statName: mod.statName
    }
    if (mod.statName in actor) {
      modification.statBefore = actor[mod.statName as keyof typeof actor] as number;
      switch (mod.modifierType) {
        case "add":
          (actor[mod.statName as keyof typeof actor] as number) += mod.modiferValue;
          break;
        
        case "substract":
          (actor[mod.statName as keyof typeof actor] as number) -= mod.modiferValue;
          break;
      
        default:
          break;
      }
      modification.statAfter = actor[mod.statName as keyof typeof actor] as number;
      modifications.push(modification);
    }
  }

  return {
    targetId: actor.id,
    modifications: modifications
  }
}


export function resolveModifyStats<T extends IActor & IBasicStats>(
  payloadModifyStats: IModifyStatsPayload,
  board: BoardStateHandler,
): IModifyStatsSignature<T> {
  if (payloadModifyStats.effect.effectName !== EffectName.ModifyStats) {
    throw new Error("Provided payload is not suitable for modifyStats effect resolver");
  }

  if (payloadModifyStats.effect.effectName !== EffectName.ModifyStats) {
    throw new Error("No required payload provided for modifyStats effect");
  }
  const actors = payloadModifyStats.payload.map<IActor & IBasicStats>(p => board.getObjectById(p.actor.id) as any);
  if (actors.some(a => !a)) {
    throw new Error("Cannot find actor")
  }

  validateEffectSelector(payloadModifyStats.effect.effectTargetingSelector, actors);
  const result = actors.map(a => modifyStats(payloadModifyStats.effect, a));

  return {
    effectId: payloadModifyStats.effect.id,
    effectName: EffectName.ModifyStats,
    data: {
      casterId: payloadModifyStats.caster.id,
      targets: result
    }
  }
}


export function getModifyStatsPayloadDefinitions(
  effectDefinition: IModifyStatsDefinition,
  board: BoardStateHandler,
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  return {
    effect,
    caster,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board, caster),
    gatheringSteps: [
      new ActorCollectableDataDefinition({
        requireUniqueness: true,
        possibleActorsResolver: () => getPossibleActorsToSelect(effect, board, caster),
      })
    ]
  }
}