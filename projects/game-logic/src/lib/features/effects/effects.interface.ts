import { IActor } from "../actors/actors.interface";
import { ActorType } from "../actors/actors.constants";
import { DamageType, EffectName, EffectLifeTime, EffectTargetingResolveTime, EffectResolveType, EffectTrigger } from "./effects.constants";
import { IDeckInteraction } from "../dungeon/dungeon-deck.interface";

export interface IEffectsState {
  effectsToTrigger: ITriggeredLastingEffect[]
  effectLogs: IEffectLog[];
  getAllActors: () => Array<IActor & { effects: IEffectBase[] }>;
  getAllEffects: () => Array<IEffectBase>
}

export interface IAffectable {
  effects: IEffectBase[];
}

export interface IEffectBase {
  id: string;
  name?: string;
  owner?: ActorType;
  effectTargetingSelector: IEffectTargetSelector;
  effectName: EffectName;
  effectLifeTime: EffectLifeTime;
  secondaryEffects?: IEffectBase[];
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
  resolveTime: EffectTargetingResolveTime;
  targetingActors: ActorType[];
  selectorTargets: 'single' | 'multiple' | 'all';
  amountOfTargets?: number;
}

export interface IEffectLog {
  effect: IEffectBase;
  targets: IActor[];
  turn: number;
}


export type IEffect = |
  INoopEffect |
  IDealDamage |
  IDealDamageByWeapoon |
  IModifyStats<unknown> |
  IModifyPosition |
  IModifyDungeonDeck<IDeckInteraction> |
  ISpawnActor;



export interface INoopEffect extends IEffectBase {
  effectName: EffectName.Noop;
}


export interface IDealDamage extends IEffectBase {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamageByWeapoon extends IEffectBase {
  effectName: EffectName.DealDamageByWeapon,
}

export interface IModifyStats<T> extends IEffectBase {
  effectName: EffectName.ModifyStats;
  statsModifications: {
    statName: keyof T;
    modiferValue: number;
    modifierType: 'add' | 'substract';
  }[];
}

export interface IModifyPosition extends IEffectBase {
  effectName: EffectName.ModifyPosition;
  allowedMaxDistance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}

export interface IModifyDungeonDeck<T extends IDeckInteraction> extends IEffectBase {
  effectName: EffectName.ModifyDungeonDeck;
  deckInteraction: T
}

export interface ISpawnActor extends IEffectBase {
  effectName: EffectName.SpawnActor;
  enemyId: string;
}