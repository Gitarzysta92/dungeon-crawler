import { IActor } from "../actors/actors.interface";
import { IField } from "../board/board.interface";
import { IEffect } from "./effect-commons.interface";

export type GatheringStepDataName = 'actor' | 'effect' | 'rotation' | 'field';

export interface ICollectableData {
  dataName: GatheringStepDataName;
  possibleActors?: IActor[];
  possibleFields?: IField[];
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
  effectId: string;
  gatheringSteps: ICollectedDataStep[];
  isCompleted: boolean;
}

export interface ICollectedDataStep {
  dataName: GatheringStepDataName;
  payload?: unknown | undefined;
  prev?: ICollectedDataStep[];
}
