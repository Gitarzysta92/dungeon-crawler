import { IActor } from "../../actors/actors.interface";
import { ActorType } from "../../actors/actors.constants";
import { EffectName, EffectLifeTime, EffectTargetingResolveTime, EffectResolveType, EffectTrigger } from "./effect.constants";
import { Guid } from "../../../extensions/types";

export interface IEffectContext {
  effectsToTrigger: ITriggeredLastingEffect[]
  getAllActors: () => Array<IActor & { effects: IEffectBase[] }>;
  getAllEffects: () => Array<IEffectBase>
}

export interface IAffectable<T extends IEffectBase> {
  lastingEffects: T[];
}

export interface IEffectBase {
  id: string;
  effectTargetingSelector: IEffectTargetSelector;
  effectName: EffectName;
  effectLifeTime: EffectLifeTime;
  effectResolveTime: EffectTargetingResolveTime;
  secondaryEffects?: IEffectBase[];
  requiredPayload?: boolean
}

export interface IEffectDeclarationBase {
  effect: IEffectBase;
  effectName: EffectName;
}

export interface IEffectSignatureBase {
  effectId: string;
  effectName: EffectName;
  data: unknown;
}

// dodać emitowanie hooków, np z przypisanie do field


export interface IImmediateEffect extends IEffectBase {
  effectLifeTime: EffectLifeTime.Instantaneous; 
}

export interface ILastingEffect extends IEffectBase {
  effectLifeTime: EffectLifeTime.Lasting;
  effectResolveType: EffectResolveType;
  durationInTurns: number;
  deploymentTurn?: number;
  inactive?: boolean;
}

export interface IPassiveLastingEffect extends ILastingEffect {
  effectResolveType: EffectResolveType.Passive;
}

export interface ITriggeredLastingEffect extends ILastingEffect {
  effectResolveType: EffectResolveType.Triggered;
  effectTriggers: EffectTrigger[];
}


export interface IEffectTargetSelector {
  targetingActors?: ActorType[];
  selectorTargets?: 'single' | 'multiple' | 'all' | 'caster';
  amountOfTargets?: number;
  requireUniqueTargets?: boolean;
}

export interface IEffectSelector {
  selectedEffectId?: string;
  selectedEffectName?: EffectName;
  selectedEffectTargetingActors?: ActorType[];
  selectedEffectSelectorTargets?: 'single' | 'multiple' | 'all' | 'caster';
  selectedEffectAmountOfTargets?: number;
}


export interface IEffectLog {
  effect: IEffectBase;
  targets: IActor[];
  turn: number;
}

export interface IEffectCaster {
  id: string;
  groupId?: string;
}

export interface IEffectSubject {
  id: string;
}