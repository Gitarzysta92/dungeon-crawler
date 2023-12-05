import { IDungeonPlayerInteractionHandler } from "@game-logic/game/harness/dungeon-interaction-handler.interface";
import { DungeonStateStore } from "@game-logic/game/harness/game-harness-state-store";
import { IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IField, IBoardObjectRotation, IBoardSelectorOrigin } from "@game-logic/lib/features/board/board.interface";
import { IFieldCollectableData, IFieldCollectedDataStep, IEffectCollectableData, IEffectCollectedDataStep, IRotationCollectableData, IRotationCollectedDataStep, IActorCollectableData, IActorCollectedDataStep, IOriginCollectableData, IOriginCollectedDataStep, ISourceActorCollectableData, ISourceActorCollectedDataStep } from "@game-logic/lib/features/effects/effect-payload.interface";
import { IEffectPayloadProviderResult } from "@game-logic/lib/features/effects/effect-resolver.interface";
import { IEffectDefinition } from "@game-logic/lib/features/effects/payload-definition.interface";
import { IEffect } from "@game-logic/lib/features/effects/resolve-effect.interface";
import { DungeonState } from "@game-logic/lib/states/dungeon-state";

export class DungeonPlayerAi implements IDungeonPlayerInteractionHandler {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _modelService: any
  ) {}

  public chooseEffectToCast(state: DungeonState): IEffect {
    return {} as IEffect
  }

  public async collectFieldTypeData(
    dataType: IFieldCollectableData & IFieldCollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableData>> {
    return {} as IEffectPayloadProviderResult<IField, IFieldCollectableData>;
  }

  public async collectEffectTypeData(
    dataType: IEffectCollectableData & IEffectCollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableData>> {
    return {} as IEffectPayloadProviderResult<IEffect, IEffectCollectableData>;
  }

  public async collectRotationTypeData(
    dataType: IRotationCollectableData & IRotationCollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>> {
    return {} as IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>
  }

  public async collectActorTypeData(
    dataType: IActorCollectableData & IActorCollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableData>> {
    return {} as IEffectPayloadProviderResult<IActor, IActorCollectableData>
  }

  public async collectOriginTypeData(
    dataType: IOriginCollectableData & IOriginCollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>> {
    return {} as IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>
  }

  public async collectSourceActorTypeData(
    dataType: ISourceActorCollectableData & ISourceActorCollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>> {
    return {} as IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>;
  }

}