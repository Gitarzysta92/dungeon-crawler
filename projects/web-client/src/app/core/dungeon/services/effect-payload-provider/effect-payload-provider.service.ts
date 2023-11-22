import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IBoardObject, IBoardObjectRotation, IField } from '@game-logic/lib/features/board/board.interface';
import { ICollectableData, ICollectedDataStep } from '@game-logic/lib/features/effects/effect-payload.interface';
import { IEffectCaster } from '@game-logic/lib/features/effects/effects.interface';
import { IEffectDefinition } from '@game-logic/lib/features/effects/payload-definition.interface';
import { IEffect } from '@game-logic/lib/features/effects/resolve-effect.interface';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from 'src/app/core/dungeon-logic/interfaces/effect-payload-provider';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneInteractionService } from 'src/app/core/dungeon-scene/api';
import { SceneInitializationService } from 'src/app/core/dungeon-scene/services/scene-initialization/scene-initialization.service';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';

@Injectable()
export class EffectPayloadProviderService implements IEffectPayloadProvider {

  constructor(
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _dungeonState: DungeonStateStore,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
  ) { }

  public async collectFieldTypeData(dataType: ICollectableData, effectDefinition: IEffectDefinition): Promise<IEffectPayloadProviderResult<IField>> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider)
    const { data, revertCallback } = await this._sceneInteractionService.requireSelectField(dataType.possibleFields.map(f => f.id), acceptanceProvider);
    return {
      revertCallback,
      data: !!data ? this._dungeonState.currentState.board.fields[data.auxId] : null,
      dataType
    };
  }

  public async collectEffectTypeData(dataType: ICollectableData): Promise<IEffectPayloadProviderResult<IEffect>> {
    return {
      revertCallback: () => null,
      data: await this._uiInteractionService.requireSelectActivity(),
      dataType: dataType
    };
  }

  public async collectRotationTypeData(dataType: ICollectableData & ICollectedDataStep, effectDefinition: IEffectDefinition): Promise<IEffectPayloadProviderResult<IBoardObjectRotation>> {
    const actor = dataType.prev.find(d => d.dataName === 'actor').payload as IBoardObject;
    const tileObject = this._sceneInitializationService.boardComponent.getTile(actor.id);

    if (!actor || !tileObject) {
      throw new Error("Cannot initialize rotation without provided actor")
    }
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider);
    let { data: rotation, revertCallback } = await this._sceneInteractionService.requireSelectRotation(tileObject, acceptanceProvider);
    rotation = this._sceneInteractionService.normalizeRotation(rotation, actor.rotation);

    return {
      revertCallback,
      data: rotation as IBoardObjectRotation,
      dataType: dataType
    };
  }

  public async collectActorTypeData(dataType: ICollectableData, effectDefinition: IEffectDefinition): Promise<IEffectPayloadProviderResult<IActor>> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider);
    const { data: actor, revertCallback } = await this._sceneInteractionService.requireSelectActor(
      dataType.possibleFields.map(f => f.id),
      dataType.possibleActors.map(f => f.id),
      acceptanceProvider
    );
    return {
      revertCallback,
      data: Object.values(this._dungeonState.currentState.board.objects).find(p => p.id === actor.id),
      dataType: dataType
    };
  }

  public async collectCasterTypeData(dataType: ICollectableData, effectDefinition: IEffectDefinition): Promise<IEffectPayloadProviderResult<IEffectCaster>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null
    }
  }
}
