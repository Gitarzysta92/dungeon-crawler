import { IActor } from "../../../actors/actors.interface";
import { IBoardSelectorOrigin, IField } from "../../../board/board.interface";
import { GatheringStepDataName } from "./effect-payload-collector.constants";
import { IEffectCaster } from "../effects-commons.interface";
import { IEffect } from "../../resolve-effect.interface";

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
  steps: ICollectableDataStep[];
  isCompleted: boolean;
}

export interface ICollectableDataStepBase {
  effectId: string;
  collectedDataIndex: number;
  dataName: GatheringStepDataName;
  prev?: ICollectableDataStep[];
  attemptWasMade: boolean;
}


export type ICollectableDataStep =
  IOriginCollectableDataStep |
  ISourceActorCollectableDataStep |
  IActorCollectableDataStep |
  IFieldCollectableDataStep |
  IEffectCollectableDataStep |
  IRotationCollectableDataStep;


  
export interface IOriginCollectableDataStep extends ICollectableDataStepBase {
  dataName: GatheringStepDataName.Origin;
  payload?: IBoardSelectorOrigin;
  possibleOrigins?: IBoardSelectorOrigin[];
}

export interface ISourceActorCollectableDataStep extends ICollectableDataStepBase {
  dataName: GatheringStepDataName.SourceActor;
  payload?: string;
  possibleSourceActorIds?: string[];
}

export interface IActorCollectableDataStep extends ICollectableDataStepBase {
  dataName: GatheringStepDataName.Actor;
  payload?: IActor;
  possibleActors?: IActor[];
}

export interface IFieldCollectableDataStep extends ICollectableDataStepBase {
  dataName: GatheringStepDataName.Field;  
  payload?: IField;
  possibleFields?: IField[];
}

export interface IEffectCollectableDataStep extends ICollectableDataStepBase {
  dataName: GatheringStepDataName.Effect;  
  payload?: IEffect;
  possibleEffects?: IEffect[];
}

export interface IRotationCollectableDataStep extends ICollectableDataStepBase {
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
  possibleOriginsResolver?: (prev: ICollectableDataStep[]) => IBoardSelectorOrigin[];
  possibleOrigins?: IBoardSelectorOrigin[];
  payload?: IBoardSelectorOrigin;
  prev?: ICollectableDataStep[];
  initialPayload?: IBoardSelectorOrigin;
  initialPayloadResolver?: (prev: ICollectableDataStep[]) => IBoardSelectorOrigin | undefined;
}

export interface ISourceActorCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.SourceActor;
  possibleSourceActorIdsResolver?: (prev: ICollectableDataStep[]) => string[];
  possibleSourceActorIds?: string[];
  payload?: string;
  prev?: ICollectableDataStep[];
  initialPayload?: string;
  initialPayloadResolver?: (prev: ICollectableDataStep[]) => string | undefined;
}

export interface IActorCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Actor;
  possibleActorsResolver?: (prev: ICollectableDataStep[]) => IActor[];
  possibleActors?: IActor[];
  payload?: IActor;
  prev?: ICollectableDataStep[];
  initialPayload?: IActor;
  initialPayloadResolver?: (prev: ICollectableDataStep[]) => IActor | undefined;
}

export interface IFieldCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Field;  
  possibleFieldsResolver?: (prev: ICollectableDataStep[]) => IField[];
  possibleFields?: IField[];
  payload?: IField;
  prev?: ICollectableDataStep[];
  initialPayload?: IField;
  initialPayloadResolver?: (prev: ICollectableDataStep[]) => IField | undefined;
}

export interface IEffectCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Effect;  
  possibleEffectsResolver?: (prev: ICollectableDataStep[]) => IEffect[];
  possibleEffects?: IEffect[];
  payload?: IEffect;
  prev?: ICollectableDataStep[];
  initialPayload?: IEffect;
  initialPayloadResolver?: (prev: ICollectableDataStep[]) => IEffect | undefined;
}

export interface IRotationCollectableDataDefinition extends ICollectableDataDefinitionBase {
  dataName: GatheringStepDataName.Rotation
  payload?: number;
  prev?: ICollectableDataStep[];
  initialPayload?: number;
  initialPayloadResolver?: (prev: ICollectableDataStep[]) => number | undefined;
}

export interface IPayloadCollectorTempStep {
  initialize: (data: ICollectableData[]) => void
}