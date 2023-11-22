import { IActor, IBasicStats } from "../../actors/actors.interface";
import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect, validateEffectSelector } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectLifeTime, EffectResolveType, EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IPassiveLastingEffect } from "../effects.interface";
import { IModifyStats, IModifyStatsDefinition, IModifyStatsPayload } from "./modify-statistics.interface";


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
      modifyStats(effect as IModifyStats<IBasicStats>, [stats])
    }
  }
  return stats;
}


export function modifyStats(effect: IModifyStats<any>, actors: (IActor & IBasicStats)[]): void {
  validateEffectSelector(effect.effectTargetingSelector, actors);

  for (let actor of actors) {
    for (let mod of effect.statsModifications) {
      if (mod.statName in actor) {
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
      }
    }
  }
}


export function resolveModifyStats(
  payloadModifyStats: IModifyStatsPayload,
  board: Board,
): void {
  if (payloadModifyStats.effect.effectName !== EffectName.ModifyStats) {
    throw new Error("Provided payload is not suitable for modifyStats effect resolver");
  }

  if (payloadModifyStats.effect.effectName !== EffectName.ModifyStats) {
    throw new Error("No required payload provided for modifyStats effect");
  }
  const actors = payloadModifyStats.payload.map<IActor & IBasicStats>(p => board.getObjectById(p.id) as any);
  if (actors.some(a => !a)) {
    throw new Error("Cannot find actor")
  }

  modifyStats(payloadModifyStats.effect, actors);
}


export function getModifyStatsPayloadDefinitions(
  effectDefinition: IModifyStatsDefinition,
  board: Board,
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  return {
    effect,
    caster,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board, caster),
    gatheringSteps: [
      {
        dataName: 'actor',
        requireUniqueness: true,
        possibleActorsResolver: () => getPossibleActorsToSelect(effect, board, caster),
        //possibleFieldsResolver: () => board.getSelectedFields(effect, caster.outlets),
      }
    ]
  }
}