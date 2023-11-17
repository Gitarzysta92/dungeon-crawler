import { IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IBoardObjectRotation, IField } from "@game-logic/lib/features/board/board.interface";
import { ICollectableData } from "@game-logic/lib/features/effects/effect-payload.interface";
import { IEffect } from "@game-logic/lib/features/effects/effects-commons.interface";

export interface IEffectPayloadProvider {
  collectFieldTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IField>>
  collectEffectTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IEffect>>
  collectRotationTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IBoardObjectRotation>>
  collectActorTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IActor>>
}

export interface IEffectPayloadProviderResult<T> {
  revertCallback?: () => void;
  data: T | null;
  dataType: ICollectableData;
}