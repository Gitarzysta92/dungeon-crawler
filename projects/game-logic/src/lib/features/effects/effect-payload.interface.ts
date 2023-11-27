import { IActor } from "../actors/actors.interface";
import { IBoardSelectorOrigin, IField } from "../board/board.interface";
import { GatheringStepDataName } from "./effect-payload-collector.constants";
import { IEffectCaster } from "./effects.interface";
import { IEffect } from "./resolve-effect.interface";

export interface IPayloadDefinition {
  effect: IEffect;
  preparationSteps?: ICollectableData[];
  gatheringSteps?: ICollectableData[];
  amountOfTargets?: number;
  caster: IEffectCaster;
  nestedDefinitionFactory?: (prep: ICollectedData) => IPayloadDefinition
}

export interface ICollectableDataBase {
  effectId?: string;
  dataName: GatheringStepDataName;
  requireUniqueness: boolean;
  autoCollect?: boolean;
  incorporatePayloadDefinitionForSelectedEffect?: boolean;
}

export interface ICollectedData {
  index: number;
  effect: IEffect;
  steps: ICollectedDataStep[];
  isCompleted: boolean;
}

export interface ICollectedDataStepBase {
  effectId: string;
  collectedDataIndex: number;
  dataName: GatheringStepDataName;
  prev?: ICollectedDataStep[];
  attemptWasMade: boolean;
}


export type ICollectedDataStep =
  IOriginCollectedDataStep |
  ISourceActorCollectedDataStep |
  IActorCollectedDataStep |
  IFieldCollectedDataStep |
  IEffectCollectedDataStep |
  IRotationCollectedDataStep;


  
export interface IOriginCollectedDataStep extends ICollectedDataStepBase {
  dataName: GatheringStepDataName.Origin;
  payload?: IBoardSelectorOrigin;
}

export interface ISourceActorCollectedDataStep extends ICollectedDataStepBase {
  dataName: GatheringStepDataName.SourceActor;
  payload?: string;
}

export interface IActorCollectedDataStep extends ICollectedDataStepBase {
  dataName: GatheringStepDataName.Actor;
  payload?: IActor;
}

export interface IFieldCollectedDataStep extends ICollectedDataStepBase {
  dataName: GatheringStepDataName.Field;  
  payload?: IField;
}

export interface IEffectCollectedDataStep extends ICollectedDataStepBase {
  dataName: GatheringStepDataName.Effect;  
  payload?: IEffect;
}

export interface IRotationCollectedDataStep extends ICollectedDataStepBase {
  dataName: GatheringStepDataName.Rotation
  payload?: number;
}



export type ICollectableData =
  IOriginCollectableData |
  ISourceActorCollectableData |
  IActorCollectableData |
  IFieldCollectableData |
  IEffectCollectableData |
  IRotationCollectableData;


export interface IOriginCollectableData extends ICollectableDataBase {
  dataName: GatheringStepDataName.Origin;
  possibleOriginsResolver?: (prev: ICollectedDataStep[]) => IBoardSelectorOrigin[];
  possibleOrigins?: IBoardSelectorOrigin[];
  payload?: IBoardSelectorOrigin;
}

export interface ISourceActorCollectableData extends ICollectableDataBase {
  dataName: GatheringStepDataName.SourceActor;
  possibleSourceActorIdsResolver?: (prev: ICollectedDataStep[]) => string[];
  possibleSourceActorIds?: string[];
  payload?: string;
}

export interface IActorCollectableData extends ICollectableDataBase {
  dataName: GatheringStepDataName.Actor;
  possibleActorsResolver?: (prev: ICollectedDataStep[]) => IActor[];
  possibleActors?: IActor[];
  payload?: IActor;
}

export interface IFieldCollectableData extends ICollectableDataBase {
  dataName: GatheringStepDataName.Field;  
  possibleFieldsResolver?: (prev: ICollectedDataStep[]) => IField[];
  possibleFields?: IField[];
  payload?: IField;
}

export interface IEffectCollectableData extends ICollectableDataBase {
  dataName: GatheringStepDataName.Effect;  
  possibleEffectsResolver?: (prev: ICollectedDataStep[]) => IEffect[];
  possibleEffects?: IEffect[];
  payload?: IEffect;
}

export interface IRotationCollectableData extends ICollectableDataBase {
  dataName: GatheringStepDataName.Rotation
  payload?: number;
}