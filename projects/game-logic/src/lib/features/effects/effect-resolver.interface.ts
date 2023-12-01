import { IActor } from "../actors/actors.interface";
import { IField, IBoardObjectRotation, IBoardSelectorOrigin } from "../board/board.interface";
import { EffectPayloadCollector } from "./effect-payload-collector";
import { IFieldCollectableData, ICollectedDataStep, IEffectCollectableData, IRotationCollectableData, IActorCollectableData, IOriginCollectableData, ISourceActorCollectableData, ICollectableDataBase } from "./effect-payload.interface";
import { GatheringPayloadHook } from "./effect-resolver.constants";
import { IEffectDefinition, IEffectPayload } from "./payload-definition.interface";
import { IEffect } from "./resolve-effect.interface";

export interface IEffectPayloadProvider {
  collectFieldTypeData: (dataType: IFieldCollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IField, IFieldCollectableData>>;
  collectEffectTypeData: (dataType: IEffectCollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableData>>;
  collectRotationTypeData: (dataType: IRotationCollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>>;
  collectActorTypeData: (dataType: IActorCollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor, IActorCollectableData>>;
  collectOriginTypeData: (dataType: IOriginCollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>>;
  collectSourceActorTypeData: (dataType: ISourceActorCollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>>;
}

export interface IEffectPayloadProviderResult<D, T extends ICollectableDataBase> {
  revertCallback?: () => void;
  data: D | undefined;
  dataType: T;
  isDataGathered: boolean;
}

export interface IGatherPayloadStep {
  name: GatheringPayloadHook,
  payload?: IEffectPayload,
  collector?: EffectPayloadCollector
}