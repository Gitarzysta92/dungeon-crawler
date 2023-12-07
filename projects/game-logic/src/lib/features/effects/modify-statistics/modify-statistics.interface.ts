import { IActor, IBasicStats } from "../../actors/actors.interface";
import { IBoardSelector } from "../../board/board.interface";
import { EffectName } from "../commons/effects-commons.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../commons/effects-commons.interface";

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
  payload: { actor: (IActor & IBasicStats) }[];
}

export interface IModifyStatsSignature<T> extends IEffectSignatureBase {
  effectName: EffectName.ModifyStats;
  data: {
    casterId: string;
    targets: Array<IModifyStatsResult<T>>
  }
}

export interface IModifyStatsResult<T> {
  targetId: string;
  modifications: Array<{
    statName: keyof T
    statBefore: number;
    statAfter: number;
  }>
}