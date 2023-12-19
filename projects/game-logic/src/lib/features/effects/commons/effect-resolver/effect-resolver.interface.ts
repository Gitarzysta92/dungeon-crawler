import { IActor } from "../../../actors/actors.interface";
import { IField, IBoardObjectRotation, IBoardSelectorOrigin } from "../../../board/board.interface";
import { EffectPayloadCollector } from "../effect-payload-collector/effect-payload-collector";
import { IFieldCollectableDataDefinition, ICollectableDataStep, IEffectCollectableDataDefinition, IRotationCollectableDataDefinition, IActorCollectableDataDefinition, IOriginCollectableDataDefinition, ISourceActorCollectableDataDefinition, ICollectableDataDefinitionBase } from "../effect-payload-collector/effect-payload.interface";
import { GatheringPayloadHook } from "./effect-resolver.constants";
import { IEffectDefinition, IEffectPayload } from "../../payload-definition.interface";
import { IEffect } from "../../resolve-effect.interface";

export interface IEffectPayloadProvider {
  collectFieldTypeData: (dataType: IFieldCollectableDataDefinition & ICollectableDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>>;
  collectEffectTypeData: (dataType: IEffectCollectableDataDefinition & ICollectableDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>>;
  collectRotationTypeData: (dataType: IRotationCollectableDataDefinition & ICollectableDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>>;
  collectActorTypeData: (dataType: IActorCollectableDataDefinition & ICollectableDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>>;
  collectOriginTypeData: (dataType: IOriginCollectableDataDefinition & ICollectableDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>>;
  collectSourceActorTypeData: (dataType: ISourceActorCollectableDataDefinition & ICollectableDataStep, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>>;
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