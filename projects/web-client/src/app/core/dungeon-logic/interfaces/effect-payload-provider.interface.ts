import { IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IBoardObjectRotation, IBoardSelectorOrigin, IField } from "@game-logic/lib/features/board/board.interface";
import { IActorCollectableData, IOriginCollectableData, ICollectableDataBase, ICollectedDataStep, IEffectCollectableData, IFieldCollectableData, IRotationCollectableData, ISourceActorCollectableData } from "@game-logic/lib/features/effects/effect-payload.interface";
import { IEffectDefinition } from "@game-logic/lib/features/effects/payload-definition.interface";
import { IEffect } from "@game-logic/lib/features/effects/resolve-effect.interface";

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
  data: D | null;
  dataType: T;
  isDataGathered: boolean;
}