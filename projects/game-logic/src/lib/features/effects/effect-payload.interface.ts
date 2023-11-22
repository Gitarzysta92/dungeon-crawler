import { IActor } from "../actors/actors.interface";
import { IField } from "../board/board.interface";
import { IEffectCaster } from "./effects.interface";
import { IEffect } from "./resolve-effect.interface";

export type GatheringStepDataName = 'actor' | 'effect' | 'rotation' | 'field' | 'caster';

export interface IPayloadDefinition {
  effect: IEffect;
  preparationSteps?: ICollectableData[];
  gatheringSteps?: ICollectableData[];
  amountOfTargets?: number;
  caster: IEffectCaster;
  nestedDefinitionFactory?: (prep: ICollectedData) => IPayloadDefinition
}


export interface ICollectableData {
  effectId?: string;
  dataName: GatheringStepDataName;
  requireUniqueness: boolean;
  autoCollect?: boolean;
  incorporatePayloadDefinitionForSelectedEffect?: boolean;
  possibleCastersResolver?: (prev: any) => IActor[];
  possibleCasters?: IActor[];
  possibleActorsResolver?: (prev: any) => IActor[];
  possibleActors?: IActor[];
  possibleFieldsResolver?: (prev: any) => IField[];
  possibleFields?: IField[]
  possibleEffectsResolver?: (prev: any) => IEffect[];
  possibleEffects?: IEffect[];
  payload?: unknown;
}

export interface IEffectResolverState {
  effect: IEffect;
  definitions: IPayloadDefinition[];
}

export interface ICollectedData {
  index: number;
  effect: IEffect;
  steps: ICollectedDataStep[];
  isCompleted: boolean;
}

export interface ICollectedDataStep {
  effectId: string;
  collectedDataIndex: number;
  dataName: GatheringStepDataName;
  payload?: unknown;
  prev?: ICollectedDataStep[];
}
