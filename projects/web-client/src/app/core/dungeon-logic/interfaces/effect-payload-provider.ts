import { IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IBoardObjectRotation, IField } from "@game-logic/lib/features/board/board.interface";
import { ICollectableData } from "@game-logic/lib/features/effects/effect-payload.interface";
import { IEffectCaster } from "@game-logic/lib/features/effects/effects.interface";
import { IEffectDefinition } from "@game-logic/lib/features/effects/payload-definition.interface";
import { IEffect } from "@game-logic/lib/features/effects/resolve-effect.interface";

export interface IEffectPayloadProvider {
  collectFieldTypeData: (dataType: ICollectableData, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IField>>
  collectEffectTypeData: (dataType: ICollectableData, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IEffect>>
  collectRotationTypeData: (dataType: ICollectableData, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IBoardObjectRotation>>
  collectActorTypeData: (dataType: ICollectableData, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IActor>>
  collectCasterTypeData: (dataType: ICollectableData, effectDefinition: IEffectDefinition) => Promise<IEffectPayloadProviderResult<IEffectCaster>>
}

export interface IEffectPayloadProviderResult<T> {
  revertCallback?: () => void;
  data: T | null;
  dataType: ICollectableData;
}