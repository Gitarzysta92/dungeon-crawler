import { Injectable } from '@angular/core';
import { IProcedureController } from '@game-logic/lib/base/procedure/procedure.interface';
import { IDistinguishableData, IGatheredData, IGatheringContext, IGatheringController } from '@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface';
import { ACTOR_DATA_TYPE, SOURCE_ACTOR_DATA_TYPE } from '@game-logic/lib/modules/actors/actors.constants';
import { IActor } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';
import { FIELD_DATA_TYPE, ROTATION_DATA_TYPE } from '@game-logic/lib/modules/board/board.constants';
import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { IBoardField } from '@game-logic/lib/modules/board/entities/board-field/board-field.interface';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneInteractionService } from 'src/app/core/scene/api';
import { SceneService } from 'src/app/core/scene/services/scene.service';


@Injectable()
export class HumanPlayerService implements IProcedureController, IGatheringController {

  constructor(
    private readonly _sceneInitializationService: SceneService,
    private readonly _dungeonState: DungeonStateStore,
    private readonly _sceneInteractionService: SceneInteractionService,
  ) { }

  public gather(context: IGatheringContext<unknown, unknown>): Promise<IGatheredData<IDistinguishableData>> {
    if (context.allowedData.length <= 0) {
      throw new Error("There is not allowed data to gather")
    }
    if (context.dataType === ACTOR_DATA_TYPE) {
      return this._collectActorTypeData(context as IGatheringContext<IActor>)
    }
    if (context.dataType === ROTATION_DATA_TYPE) {
      return this._collectRotationTypeData(context as IGatheringContext<IBoardObjectRotation>)
    }
    if (context.dataType === FIELD_DATA_TYPE) {
      return this._collectFieldTypeData(context as IGatheringContext<IBoardField>)
    }
    if (context.dataType === SOURCE_ACTOR_DATA_TYPE) {
      return this._collectSourceActorTypeData(context as IGatheringContext<IActor>)
    }
  }

  public listenForEarlyResolve(s: boolean): Promise<boolean> {
    throw new Error('Method not implemented.');
  }


  private async _collectActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {
    // const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider);
    // const { data: actor, revertCallback } = await this._sceneInteractionService
    //   .requireSelectActor(dataType.possibleActors.map(f => f.id), acceptanceProvider);

    // const data = this._dungeonState.currentState.board.getObjectsAsArray<IActor>().find(p => p.id === actor?.auxId)
    return {
      value: null,
      isDataGathered: true
    }
  }


  private async _collectRotationTypeData(context: IGatheringContext<IBoardObjectRotation>): Promise<IGatheredData<IBoardObjectRotation & any>> {
    // const actor = dataType.prev.find(d => d.dataName === GatheringStepDataName.Actor).payload as IBoardObject;
    // const tileObject = this._sceneInitializationService.components.boardComponent.getToken(actor.id);

    // if (!actor || !tileObject) {
    //   throw new Error("Cannot initialize rotation without provided actor")
    // }
    // const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider);
    // let { data: rotation, revertCallback } = await this._sceneInteractionService.requireSelectRotation(tileObject, actor.rotation, acceptanceProvider);
    return {
      value: null,
      isDataGathered: true
    }
  }


  private async _collectFieldTypeData(context: IGatheringContext<IBoardField>): Promise<IGatheredData<IBoardField>> {
    // const acceptanceProvider = provider => this._uiInteractionService.requireActivityConfirmationOrAbandon(effectDefinition.effect.id, provider)
    // const { data, revertCallback } = await this._sceneInteractionService.requireSelectField(
    //   dataType.possibleFields.map(f => f.id),
    //   acceptanceProvider,
    //   dataType.initialPayload.id);
    return {
      value: null,
      isDataGathered: true
    }
  }


  private async _collectSourceActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>>  {
    return {
      value: null,
      isDataGathered: true
    }
  }

}
