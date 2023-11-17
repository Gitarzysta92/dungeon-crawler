import { IActor } from "../actors/actors.interface";
import { IField } from "../board/board.interface";
import { IEffect } from "./effects-commons.interface";

export type GatheringStepDataName = 'actor' | 'effect' | 'rotation' | 'field';

export interface ICollectableData {
  dataName: GatheringStepDataName;
  requireUniqueness: boolean;
  incorporatePayloadDefinitionForSelectedEffect: boolean;
  possibleActors?: IActor[];
  possibleFields?: IField[];
  possibleEffects?: IEffect[];
  payload?: unknown;
}

export interface IPayloadDefinition {
  effectId: string;
  amountOfTargets: number;
  gatheringSteps: ICollectableData[];
}

export interface IEffectResolverState {
  effect: IEffect;
  definitions: IPayloadDefinition[];
}

export interface ICollectedData {
  index: number;
  effectId: string;
  gatheringSteps: ICollectedDataStep[];
  isCompleted: boolean;
}

export interface ICollectedDataStep {
  collectedDataIndex: number;
  dataName: GatheringStepDataName;
  payload?: unknown;
  prev?: ICollectedDataStep[];
}
