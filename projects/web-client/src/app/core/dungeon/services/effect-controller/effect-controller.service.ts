import { FieldObject } from '@3d-scene/lib/actors/game-objects/field.game-object';
import { Injectable } from '@angular/core';
import { IBoardObject } from '@game-logic/lib/features/board/board.interface';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { EffectPayloadCollector } from '@game-logic/lib/features/effects/effect-payload-collector';
import { ICollectableData, ICollectedDataStep } from '@game-logic/lib/features/effects/effect-payload.interface';
import { EffectResolverService } from 'src/app/core/dungeon-logic/services/effect-resolver/effect-resolver.service';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneInteractionService } from 'src/app/core/dungeon-scene/api';
import { SceneInitializationService } from 'src/app/core/dungeon-scene/services/scene-initialization/scene-initialization.service';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';

@Injectable()
export class EffectControllerService {

  public get selectedEffect() { return this._effectResolverService.resolvingEffect }

  private _selectedField: FieldObject | undefined;
  private _revertCallbacks: (() => void)[] = [];

  constructor(
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _dungeonState: DungeonStateStore,
    private readonly _effectResolverService: EffectResolverService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _uiInteractionService: UiInteractionService,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
  ) { }

  public async castEffect(effect: IEffect): Promise<void> {
    const effectPayloadCollector = this._effectResolverService.selectEffect(effect);

    while (!effectPayloadCollector.isCompleted) {
      const dataType = effectPayloadCollector.getDataTypeToCollect();

      this._emitCurrentStateOfPayloadCollector(effectPayloadCollector);

      let handled: boolean = false;
      let confirmed: boolean = false;
      if (dataType.dataName === 'field') {
        confirmed = await this._collectFieldTypeData(dataType, effectPayloadCollector);
        handled = true;
      }

      if (dataType.dataName === 'effect') {
        confirmed = await this._collectEffectTypeData(dataType, effectPayloadCollector);
        handled = true;
      }

      if (dataType.dataName === 'rotation') {
        confirmed = await this._collectRotationTypeData(dataType, effectPayloadCollector);
        handled = true;
      }

      if (dataType.dataName === 'actor') {
        confirmed = await this._collectActorTypeData(dataType, effectPayloadCollector);
        handled = true;
      }

      if (!handled) {
        throw new Error(`Cannot find payload data handler for: ${effect.effectName} - ${dataType.dataName}`);
      }

      if (confirmed) {
        this._emitCurrentStateOfPayloadCollector(effectPayloadCollector);
      } else {
        this._revertCallbacks.forEach(rc => rc());
        this._effectResolverService.removeEffect(effect);
        this._emitEmptyStateOfPayloadCollector();
        return;
      }
    }
    this._revertCallbacks.length = 0;
    this._effectResolverService.resolveEffect(effectPayloadCollector);
    this._emitEmptyStateOfPayloadCollector();
  }

  private async _collectFieldTypeData(dataType: ICollectableData, payloadCollector: EffectPayloadCollector): Promise<boolean> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(payloadCollector.effect.id, provider)
    const { data, revertCallback } = await this._sceneInteractionService.requireSelectField(dataType.possibleFields.map(f => f.id), acceptanceProvider);
    this._revertCallbacks.unshift(revertCallback);
    this._selectedField = data;
    if (!this._selectedField) {
      return false;
    }
    payloadCollector.collectData(dataType, this._dungeonState.currentState.board.fields[this._selectedField.auxId]);
    return true;
  }

  private async _collectEffectTypeData(dataType: ICollectableData, payloadCollector: EffectPayloadCollector): Promise<boolean> {
    const selectedEffect = await this._uiInteractionService.requireSelectActivity()
    payloadCollector.collectData(dataType, selectedEffect);
    return true;
  }

  private async _collectRotationTypeData(dataType: ICollectableData & ICollectedDataStep, payloadCollector: EffectPayloadCollector): Promise<boolean> {
    const actor = dataType.prev.find(d => d.dataName === 'actor').payload as IBoardObject;
    const tileObject = this._sceneInitializationService.boardComponent.getTile(actor.id);

    if (!actor || !tileObject) {
      throw new Error("Cannot initialize rotation without provided actor")
    }
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(payloadCollector.effect.id, provider);
    let { data: rotation, revertCallback } = await this._sceneInteractionService.requireSelectRotation(tileObject, acceptanceProvider);
    rotation = this._sceneInteractionService.normalizeRotation(rotation, actor.rotation);
    this._revertCallbacks.unshift(revertCallback);
    if (rotation === null) { 
      return false;
    }
    payloadCollector.collectData(dataType, rotation);
    return true;
  }

  private async _collectActorTypeData(dataType: ICollectableData, payloadCollector: EffectPayloadCollector): Promise<boolean> {
    const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(payloadCollector.effect.id, provider);
    const { data: actor, revertCallback } = await this._sceneInteractionService.requireSelectActor(
      dataType.possibleFields.map(f => f.id),
      dataType.possibleActors.map(f => f.id),
      acceptanceProvider
    );
    this._revertCallbacks.unshift(revertCallback);
    if (!actor) {
      return false;
    }
    payloadCollector.collectData(dataType, actor);
    return true;
  }

  private _emitCurrentStateOfPayloadCollector(payloadCollector: EffectPayloadCollector): void {
    this._dungeonInteractionStore.updateState({
      selectedActivityId: this._effectResolverService.resolvingEffect?.id,
      payloadDefinitions: payloadCollector.payloadDefinitions,
      collectedData: payloadCollector.collectedData
    });
  }

  private _emitEmptyStateOfPayloadCollector(): void {
    this._dungeonInteractionStore.updateState({
      selectedActivityId: undefined,
      payloadDefinitions: [],
      collectedData: []
    });
  }
}
