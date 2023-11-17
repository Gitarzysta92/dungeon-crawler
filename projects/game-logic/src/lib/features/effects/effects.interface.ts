import { IActor } from "../actors/actors.interface";
import { ActorType } from "../actors/actors.constants";
import { EffectName, EffectLifeTime, EffectTargetingResolveTime, EffectResolveType, EffectTrigger } from "./effects.constants";

export interface IEffectsState {
  effectsToTrigger: ITriggeredLastingEffect[]
  effectLogs: IEffectLog[];
  getAllActors: () => Array<IActor & { effects: IEffectBase[] }>;
  getAllEffects: () => Array<IEffectBase>
}

export interface IAffectable<T extends IEffectBase> {
  lastingEffects: T[];
}

export interface IEffectBase {
  id: string;
  owner?: ActorType;
  effectTargetingSelector: IEffectTargetSelector;
  effectName: EffectName;
  effectLifeTime: EffectLifeTime;
  effectResolveTime: EffectTargetingResolveTime;
  secondaryEffects?: IEffectBase[];
  requiredPayload?: boolean
}

export interface IEffectPayloadBase {
  effectId: string;
  effectName: EffectName;
}


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

export interface INoopEffect extends IEffectBase {
  effectName: EffectName.Noop;
}