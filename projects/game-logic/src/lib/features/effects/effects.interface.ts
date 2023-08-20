import { IActor } from "../actors/actors.interface";
import { ActorType } from "../actors/actors.constants";
import { DamageType, EffectName, EffectLifeTime, EffectTargetingResolveTime, EffectResolveType, EffectTrigger } from "./effects.constants";
import { IDeckInteraction } from "../dungeon/dungeon-deck.interface";

export interface IEffectsState {
  effectLogs: IEffectLog[];
  getAllActors: () => Array<IActor & { effects: IEffect[] }>;
  getAllEffects: () => Array<IEffect>
}

export interface IAffectable {
  effects: IEffect[];
}

export interface IEffect {
  id: string;
  name?: string;
  owner?: ActorType;
  effectTargetingSelector: IEffectTargetSelector;
  effectName: EffectName;
  effectLifeTime: EffectLifeTime;
  secondaryEffects?: IEffect[];
}

export interface IImmediateEffect extends IEffect {
  effectLifeTime: EffectLifeTime.Instantaneous; 
}

export interface ILastingEffect extends IEffect {
  effectLifeTime: EffectLifeTime.Lasting;
  effectResolveType: EffectResolveType;
  durationInTurns: number;
  deploymentTurn?: number;
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
  effect: IEffect;
  targets: IActor[];
  turn: number;
}






export interface IDealDamage extends IEffect {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamageByWeapoon extends IEffect {
  effectName: EffectName.DealDamageByWeapon,
}

export interface IModifyStats<T> extends IEffect {
  effectName: EffectName.ModifyStats;
  statsModifications: {
    statName: keyof T;
    modiferValue: number;
    modifierType: 'add' | 'substract'
  }[];
}

export interface IModifyPosition extends IEffect {
  effectName: EffectName.ModifyPosition;
  allowedMaxDistance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}

export interface IModifyDungeonDeck<T extends IDeckInteraction> extends IEffect {
  effectName: EffectName.ModifyDungeonDeck;
  deckInteraction: T
}

export interface ISpawnActor extends IEffect {
  effectName: EffectName.SpawnActor;
  enemyId: string;
}