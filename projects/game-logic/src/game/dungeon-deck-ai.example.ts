import { IActor } from "../lib/features/actors/actors.interface";
import { IField, IBoardObjectRotation, IBoardSelectorOrigin } from "../lib/features/board/board.interface";
import { IDungeonCard } from "../lib/features/dungeon/dungeon-deck.interface";
import { IFieldCollectableData, IFieldCollectedDataStep, IEffectCollectableData, IEffectCollectedDataStep, IRotationCollectableData, IRotationCollectedDataStep, IActorCollectableData, IActorCollectedDataStep, IOriginCollectableData, IOriginCollectedDataStep, ISourceActorCollectableData, ISourceActorCollectedDataStep } from "../lib/features/effects/effect-payload.interface";
import { IEffectPayloadProviderResult } from "../lib/features/effects/effect-resolver.interface";
import { IEffectDefinition } from "../lib/features/effects/payload-definition.interface";
import { IEffect } from "../lib/features/effects/resolve-effect.interface";
import { DungeonState } from "../lib/states/dungeon-state";
import { IDungeonDeckInteractionHandler } from "./harness/dungeon-interaction-handler.interface";
import { DungeonStateStore } from "./harness/game-harness-state-store";


export class DungeonDeckAi implements IDungeonDeckInteractionHandler {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _modelService: any
  ) {}

  public chooseCardToCast(state: DungeonState): IDungeonCard<IEffect> {
    return {} as IDungeonCard<IEffect>
  };
  
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