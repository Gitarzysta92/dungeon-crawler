import { IActor, IBasicStats } from "../actors/actors.interface";
import { validateEffectSelector } from "./effect-commons";
import { EffectLifeTime, EffectResolveType, EffectName } from "./effects.constants";
import { IEffectBase, IPassiveLastingEffect } from "./effects.interface";
import { IModifyStats } from "./modify-statistics.interface";


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