import { IActor, IBasicStats } from "../actors/actors.interface";
import { EffectName } from "./effects.constants";
import { IEffectBase, IEffectPayloadBase } from "./effects.interface";

export interface IModifyStats<T> extends IEffectBase {
  effectName: EffectName.ModifyStats;
  statsModifications: {
    statName: keyof T;
    modiferValue: number;
    modifierType: 'add' | 'substract';
  }[];
}


export interface IModifyStatsPayload extends IEffectPayloadBase {
  effectName: EffectName.ModifyStats;
  payload: (IActor & IBasicStats)[]
}