import { IDungeonDeckInteractionHandler } from "@game-logic/game/harness/dungeon-interaction-handler.interface";
import { DungeonStateStore } from "@game-logic/game/harness/game-harness-state-store";
import { IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IField, IBoardObjectRotation, IBoardSelectorOrigin } from "@game-logic/lib/features/board/board.interface";
import { IDungeonCard } from "@game-logic/lib/features/dungeon/dungeon-deck.interface";
import { IFieldCollectableData, IFieldCollectableDataStep, IEffectCollectableData, IEffectCollectableDataStep, IRotationCollectableData, IRotationCollectableDataStep, IActorCollectableData, IActorCollectableDataStep, IOriginCollectableData, IOriginCollectableDataStep, ISourceActorCollectableData, ISourceActorCollectableDataStep } from "@game-logic/lib/features/effects/effect-payload.interface";
import { IEffectPayloadProviderResult } from "@game-logic/lib/features/effects/effect-resolver.interface";
import { IEffectDefinition } from "@game-logic/lib/features/effects/payload-definition.interface";
import { IEffect } from "@game-logic/lib/features/effects/resolve-effect.interface";
import { DungeonState } from "@game-logic/lib/states/dungeon-state";



export class DungeonDeckAi implements IDungeonDeckInteractionHandler {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _modelService: any
  ) {}

  public chooseCardToCast(state: DungeonState): IDungeonCard<IEffect> {
    return {} as IDungeonCard<IEffect>
  };
  
  public async collectFieldTypeData(
    dataType: IFieldCollectableData & IFieldCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableData>> {
    return {} as IEffectPayloadProviderResult<IField, IFieldCollectableData>;
  }

  public async collectEffectTypeData(
    dataType: IEffectCollectableData & IEffectCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableData>> {
    return {} as IEffectPayloadProviderResult<IEffect, IEffectCollectableData>;
  }

  public async collectRotationTypeData(
    dataType: IRotationCollectableData & IRotationCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>> {
    return {} as IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>
  }

  public async collectActorTypeData(
    dataType: IActorCollectableData & IActorCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableData>> {
    return {} as IEffectPayloadProviderResult<IActor, IActorCollectableData>
  }

  public async collectOriginTypeData(
    dataType: IOriginCollectableData & IOriginCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>> {
    return {} as IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>
  }

  public async collectSourceActorTypeData(
    dataType: ISourceActorCollectableData & ISourceActorCollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>> {
    return {} as IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>;
  }

}