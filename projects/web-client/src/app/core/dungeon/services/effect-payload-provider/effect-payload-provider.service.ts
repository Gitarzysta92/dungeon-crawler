import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IBoardObject, IBoardObjectRotation, IBoardSelectorOrigin, IField } from '@game-logic/lib/features/board/board.interface';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/effect-payload-collector.constants';
import { IActorCollectableData, IOriginCollectableData, ICollectedDataStep, IEffectCollectableData, IFieldCollectableData, IRotationCollectableData, ISourceActorCollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';
import { IEffectCaster } from '@game-logic/lib/features/effects/effects.interface';
import { IEffectDefinition } from '@game-logic/lib/features/effects/payload-definition.interface';
import { IEffect } from '@game-logic/lib/features/effects/resolve-effect.interface';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from 'src/app/core/dungeon-logic/interfaces/effect-payload-provider.interface';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneInteractionService } from 'src/app/core/dungeon-scene/api';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';

@Injectable()
export class EffectPayloadProviderService implements IEffectPayloadProvider {

  constructor(
    private readonly _sceneInitializationService: SceneService,
    private readonly _dungeonState: DungeonStateStore,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
  ) { }

  public async collectActorTypeData(
    dataType: IActorCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableData>> {
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
    dataType: IRotationCollectableData & ICollectedDataStep,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>> {
    const actor = dataType.prev.find(d => d.dataName === GatheringStepDataName.Actor).payload as IBoardObject;
    const tileObject = this._sceneInitializationService.boardComponent.getTile(actor.id);

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
    dataType: IFieldCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableData>> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider)
    const { data, revertCallback } = await this._sceneInteractionService.requireSelectField(dataType.possibleFields.map(f => f.id), acceptanceProvider);
    return {
      revertCallback,
      data: !!data ? this._dungeonState.currentState.board.fields[data.auxId] : null,
      dataType,
      isDataGathered: !!data
    };
  }

  public async collectEffectTypeData(
    dataType: IEffectCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableData>> {
    const data = await this._uiInteractionService.requireSelectActivity()
    return {
      revertCallback: () => null,
      data: data,
      dataType: dataType,
      isDataGathered: !!data
    };
  }


  public async collectOriginTypeData(
    dataType: IOriginCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: true
    }
  }

  public async collectSourceActorTypeData(
    dataType: ISourceActorCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: false
    }
  }

}
