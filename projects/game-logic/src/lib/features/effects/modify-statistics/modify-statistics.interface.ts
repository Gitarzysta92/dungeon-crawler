import { IActor, IBasicStats } from "../../actors/actors.interface";
import { IBoardSelector } from "../../board/board.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";

export interface IModifyStats<T> extends IEffectBase {
  effectName: EffectName.ModifyStats;
  statsModifications: {
    statName: keyof T;
    modiferValue: number;
    modifierType: 'add' | 'substract';
  }[];
}


export interface IModifyStatsDefinition extends IEffectDefinitionBase {
  effect: IModifyStats<unknown> & IBoardSelector;
  effectName: EffectName.ModifyStats;
  caster: IEffectCaster;
} 


export interface IModifyStatsPayload extends IModifyStatsDefinition {
  payload: (IActor & IBasicStats)[];
}