import { IBasicStats } from "../actors/actor";
import { IDeckInteraction } from "../dungeon/dungeon.interface";
import { DamageType, EffectOwner, EffectType } from "./effects.constants";

export interface IEffect {
  effectType: EffectType;
}

export interface IPersistedEffect extends IEffect {
  owner: EffectOwner;
  durationInTurns: number;
  deploymentTurn: number;
  resolveTime: any;
}

export interface IDealDamage extends IEffect {
  effectType: EffectType.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamageByWeapoon extends IEffect {
  effectType: EffectType.DealDamageByWeapoon,
}

export interface IModifyStats<T extends IBasicStats> extends IEffect {
  effectType: EffectType.ModifyStats;
  statName: keyof T;
  modiferValue: number;
  modifierType: 'add' | 'substract';
}

export interface IModifyPosition extends IEffect {
  effectType: EffectType.ModifyPosition;
  distance?: number;
  multiplayer?: number;
  preserveRotation: boolean;
}

export interface IModifyDungeonDeck<T extends IDeckInteraction> extends IEffect {
  effectType: EffectType.ModifyDungeonDeck;
  deckInteraction: T
}

export interface ISpawnActor extends IEffect {
  effectType: EffectType.SpawnActor;
  enemyId: string;
}