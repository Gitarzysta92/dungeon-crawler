import { IActor } from "../framework/modules/actor/actor.interface";
import { IField, IBoardObjectRotation } from "../framework/modules/board/board.interface";
import { IBoardSelectorOrigin } from "../framework/modules/board/aspects/selectors/board-selector";
import { ICard } from "../framework/modules/cards-deck/cards-deck.interface";
import { IFieldCollectableDataDefinition, IFieldCollectableDataStep, IEffectCollectableDataDefinition, IEffectCollectableDataStep, IRotationCollectableDataDefinition, IRotationCollectableDataStep, IActorCollectableDataDefinition, IActorCollectableDataStep, IOriginCollectableDataDefinition, IOriginCollectableDataStep, ISourceActorCollectableDataDefinition, ISourceActorCollectableDataStep } from "../framework/base/data-gatherer/data-gatherer.interface";
import { IEffectPayloadProviderResult } from "../framework/modules/effect/effect-resolver/effect-resolver.interface";
import { IEffectDefinition } from "../lib/entities/effects/payload-definition.interface";
import { IEffect } from "../framework/modules/effect/resolve-effect.interface";
import { DungeonGameplay } from "../lib/gameplay/dungeon/dungeon-gameplay";
import { IDungeonDeckInteractionHandler } from "../../harness/dungeon/dungeon-interaction-handler.interface";
import { DungeonStateStore } from "../../harness/dungeon/dungeon-state-store";


export class DungeonDeckAi implements IDungeonDeckInteractionHandler {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _modelService: any
  ) {}

  public chooseCardToCast(state: DungeonGameplay): ICard<IEffect> {
    return {} as ICard<IEffect>
  };
  
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