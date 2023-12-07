import { IActor } from "../actors/actors.interface";
import { IBoardSelectorOrigin, IField } from "../board/board.interface";
import { GatheringStepDataName } from "./effect-payload-collector.constants";
import { IEffectCaster } from "./effects.interface";
import { IEffect } from "./resolve-effect.interface";

export interface IPayloadDefinition {
  effect: IEffect;
  preparationSteps?: ICollectableDataDefinition[];
  gatheringSteps?: ICollectableDataDefinition[];
  amountOfTargets?: number;
  caster: IEffectCaster;
  nestedDefinitionFactory?: (prep: ICollectableData) => IPayloadDefinition
}

export interface ICollectableDataDefinitionBase {
  effectId?: string;
  dataName: GatheringStepDataName;
  requireUniqueness: boolean;
  autoCollect?: boolean;
  incorporatePayloadDefinitionForSelectedEffect?: boolean;
}

export interface ICollectableData {
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


export type ICollectableDataDefinition =
  IOriginCollectableDataDefinition |
  ISourceActorCollectableDataDefinition |
  IActorCollectableDataDefinition |
  IFieldCollectableDataDefinition |
  IEffectCollectableDataDefinition |
  IRotationCollectableDataDefinition;


export interface IOriginCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Origin;
  possibleOriginsResolver?: (prev: ICollectedDataStep[]) => IBoardSelectorOrigin[];
  possibleOrigins?: IBoardSelectorOrigin[];
  payload?: IBoardSelectorOrigin;
  prev?: ICollectedDataStep[];
  initialPayload?: IBoardSelectorOrigin;
  initialPayloadResolver?: (prev: ICollectedDataStep[]) => IBoardSelectorOrigin | undefined;
}

export interface ISourceActorCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.SourceActor;
  possibleSourceActorIdsResolver?: (prev: ICollectedDataStep[]) => string[];
  possibleSourceActorIds?: string[];
  payload?: string;
  prev?: ICollectedDataStep[];
  initialPayload?: string;
  initialPayloadResolver?: (prev: ICollectedDataStep[]) => string | undefined;
}

export interface IActorCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Actor;
  possibleActorsResolver?: (prev: ICollectedDataStep[]) => IActor[];
  possibleActors?: IActor[];
  payload?: IActor;
  prev?: ICollectedDataStep[];
  initialPayload?: IActor;
  initialPayloadResolver?: (prev: ICollectedDataStep[]) => IActor | undefined;
}

export interface IFieldCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Field;  
  possibleFieldsResolver?: (prev: ICollectedDataStep[]) => IField[];
  possibleFields?: IField[];
  payload?: IField;
  prev?: ICollectedDataStep[];
  initialPayload?: IField;
  initialPayloadResolver?: (prev: ICollectedDataStep[]) => IField | undefined;
}

export interface IEffectCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Effect;  
  possibleEffectsResolver?: (prev: ICollectedDataStep[]) => IEffect[];
  possibleEffects?: IEffect[];
  payload?: IEffect;
  prev?: ICollectedDataStep[];
  initialPayload?: IEffect;
  initialPayloadResolver?: (prev: ICollectableDataDefinition[]) => IEffect | undefined;
}

export interface IRotationCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Rotation
  payload?: number;
  prev?: ICollectedDataStep[];
  initialPayload?: number;
  initialPayloadResolver?: (prev: ICollectedDataStep[]) => number | undefined;
}