import { IActor } from "../lib/features/actors/actors.interface";
import { IBoardObjectRotation, IBoardSelectorOrigin, IField } from "../lib/features/board/board.interface";
import { IEffectCollectableDataDefinition, IEffectCollectableDataStep, IRotationCollectableDataDefinition, IRotationCollectableDataStep, IActorCollectableDataDefinition, IActorCollectableDataStep, IOriginCollectableDataDefinition, IOriginCollectableDataStep, ISourceActorCollectableDataDefinition, ISourceActorCollectableDataStep, IFieldCollectableDataDefinition, IFieldCollectableDataStep } from "../lib/features/effects/commons/effect-payload-collector/effect-payload.interface";
import { IEffectPayloadProviderResult } from "../lib/features/effects/commons/effect-resolver/effect-resolver.interface";
import { IEffectDefinition } from "../lib/features/effects/payload-definition.interface";
import { IEffect } from "../lib/features/effects/resolve-effect.interface";
import { DungeonGameplayState } from "../lib/gameplay/dungeon/dungeon-global-state";
import { IDungeonPlayerInteractionHandler } from "./harness/dungeon-interaction-handler.interface";
import { DungeonStateStore } from "./harness/game-harness-state-store";

export class DungeonPlayerAi implements IDungeonPlayerInteractionHandler {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _modelService: any
  ) {}

  public chooseEffectToCast(state: DungeonGameplayState): IEffect {
    return {} as IEffect
  }

  public async collectFieldTypeData(
    dataType: IFieldCollectableDataDefinition & IFieldCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>> {
    return {} as IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>;
  }

  public async collectEffectTypeData(
    dataType: IEffectCollectableDataDefinition & IEffectCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>> {
    return {} as IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>;
  }

  public async collectRotationTypeData(
    dataType: IRotationCollectableDataDefinition & IRotationCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>> {
    return {} as IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>
  }

  public async collectActorTypeData(
    dataType: IActorCollectableDataDefinition & IActorCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>> {
    return {} as IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>
  }

  public async collectOriginTypeData(
    dataType: IOriginCollectableDataDefinition & IOriginCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>> {
    return {} as IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>
  }

  public async collectSourceActorTypeData(
    dataType: ISourceActorCollectableDataDefinition & ISourceActorCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>> {
    return {} as IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>;
  }

}