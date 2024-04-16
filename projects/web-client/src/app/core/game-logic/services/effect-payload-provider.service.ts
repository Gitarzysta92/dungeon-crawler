import { Injectable } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneInteractionService } from 'src/app/core/dungeon-scene/api';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { UiInteractionService } from 'src/app/core/game-ui/services/ui-interaction.service';


@Injectable()
export class EffectPayloadProviderService implements IEffectPayloadProvider {

  constructor(
    private readonly _sceneInitializationService: SceneService,
    private readonly _dungeonState: DungeonStateStore,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
  ) { }


  public async collectActorTypeData(
    dataType: IActorCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider);
    const { data: actor, revertCallback } = await this._sceneInteractionService
      .requireSelectActor(dataType.possibleActors.map(f => f.id), acceptanceProvider);

    const data = this._dungeonState.currentState.board.getObjectsAsArray<IActor>().find(p => p.id === actor?.auxId)
    return {
      revertCallback,
      data: data,
      dataType: dataType,
      isDataGathered: !!data
    };
  }


  public async collectRotationTypeData(
    dataType: IRotationCollectableDataDefinition & ICollectableDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>> {
    const actor = dataType.prev.find(d => d.dataName === GatheringStepDataName.Actor).payload as IBoardObject;
    const tileObject = this._sceneInitializationService.components.boardComponent.getToken(actor.id);

    if (!actor || !tileObject) {
      throw new Error("Cannot initialize rotation without provided actor")
    }
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider);
    let { data: rotation, revertCallback } = await this._sceneInteractionService.requireSelectRotation(tileObject, actor.rotation, acceptanceProvider);

    return {
      revertCallback,
      data: rotation as IBoardObjectRotation,
      dataType: dataType,
      isDataGathered: rotation != null
    };
  }


  public async collectFieldTypeData(
    dataType: IFieldCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider)
    const { data, revertCallback } = await this._sceneInteractionService.requireSelectField(
      dataType.possibleFields.map(f => f.id),
      acceptanceProvider,
      dataType.initialPayload.id);
    return {
      revertCallback,
      data: !!data ? this._dungeonState.currentState.board.fields[data.auxId] : null,
      dataType,
      isDataGathered: !!data
    };
  }


  public async collectEffectTypeData(
    dataType: IEffectCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>> {
    const data = await this._uiInteractionService.requireSelectActivity()
    return {
      revertCallback: () => null,
      data: data,
      dataType: dataType,
      isDataGathered: !!data
    };
  }


  public async collectOriginTypeData(
    dataType: IOriginCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: true
    }
  }


  public async collectSourceActorTypeData(
    dataType: ISourceActorCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: false
    }
  }

}
