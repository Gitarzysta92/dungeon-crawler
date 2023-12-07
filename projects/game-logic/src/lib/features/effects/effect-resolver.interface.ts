import { IActor } from "../actors/actors.interface";
import { IField, IBoardObjectRotation, IBoardSelectorOrigin } from "../board/board.interface";
import { EffectPayloadCollector } from "./effect-payload-collector";
import { IFieldCollectableDataDefinition, ICollectedDataStep, IEffectCollectableDataDefinition, IRotationCollectableDataDefinition, IActorCollectableDataDefinition, IOriginCollectableDataDefinition, ISourceActorCollectableDataDefinition, ICollectableDataDefinitionBase } from "./effect-payload.interface";
import { GatheringPayloadHook } from "./effect-resolver.constants";
import { IEffectDefinition, IEffectPayload } from "./payload-definition.interface";
import { IEffect } from "./resolve-effect.interface";

export interface IEffectPayloadProvider {
  collectFieldTypeData: (dataType: IFieldCollectableDataDefinition & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>>;
  collectEffectTypeData: (dataType: IEffectCollectableDataDefinition & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>>;
  collectRotationTypeData: (dataType: IRotationCollectableDataDefinition & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>>;
  collectActorTypeData: (dataType: IActorCollectableDataDefinition & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>>;
  collectOriginTypeData: (dataType: IOriginCollectableDataDefinition & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>>;
  collectSourceActorTypeData: (dataType: ISourceActorCollectableDataDefinition & ICollectedDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>>;
}

export interface IEffectPayloadProviderResult<D, T extends ICollectableDataDefinitionBase> {
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