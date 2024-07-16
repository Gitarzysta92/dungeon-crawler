import { Injectable } from '@angular/core';
import { IProcedureController } from '@game-logic/lib/base/procedure/procedure.interface';
import { IDistinguishableData, IGatheredData, IGatheringContext, IGatheringController } from '@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface';
import { ACTOR_DATA_TYPE, SOURCE_ACTOR_DATA_TYPE } from '@game-logic/lib/modules/actors/actors.constants';
import { IActor } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';
import { FIELD_DATA_TYPE, ROTATION_DATA_TYPE } from '@game-logic/lib/modules/board/board.constants';
import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { IBoardField } from '@game-logic/lib/modules/board/entities/board-field/board-field.interface';
import { firstValueFrom, race } from 'rxjs';
import { SceneInteractionService } from 'src/app/core/scene/api';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { ISceneMedium } from '../../scene/mixins/scene-medium/scene-medium.interface';
import { ControlsService } from 'src/app/infrastructure/controls/controls.service';
import { UiService } from '../../game-ui/services/ui.service';
import { SuggestionService } from '../../game/services/suggestion.service';
import { IDataRequestResult } from '../../game/interfaces/data-request.interface';
import { BOARD_SELECTOR } from '@game-logic/lib/modules/board/aspects/selectors/board.selector';
import { IBoardObject } from '@game-logic/lib/modules/board/entities/board-object/board-object.interface';
import { DataFeedService } from '../../game-data/services/data-feed.service';



@Injectable()
export class HumanPlayerService implements IProcedureController, IGatheringController {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _uiService: UiService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _controlsService: ControlsService,
    private readonly _suggestionService: SuggestionService,
    private readonly _dataFeed: DataFeedService
  ) { }



  public gather(context: IGatheringContext<unknown, unknown>): Promise<IGatheredData<IDistinguishableData | number | string | null>> {
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
    let result: IDataRequestResult<IActor & ISceneMedium>;
    let confirmed: boolean = false;
    const actorPredicate = r => r.isActor && context.allowedData.some(a => a === r);
    do {
      this._suggestionService.showSmartSuggestion(context.allowedData);

      const boardSelector = context.selectors.find(s => s.delegateId === BOARD_SELECTOR);
      if (!!boardSelector) {
        this._suggestionService.showSelectionRangeSuggestion(boardSelector);
      }

      result = await firstValueFrom(race([
        this._sceneInteractionService.requestSceneMediumSelection<IActor & ISceneMedium>(
          this._controlsService.listenForSelectEvent(this._sceneService.canvasRef), actorPredicate),
        this._uiService.requestUiMediumSelection<IActor & ISceneMedium>(actorPredicate)
      ]))

      confirmed = await firstValueFrom(this._uiService.requestConfirmation())
    } while (confirmed && !!result)

    if (result.value === undefined) {
      throw new Error("Provided data is not defined");
    }

    return Object.assign(result, { isDataGathered: true });
  }



  private async _collectRotationTypeData(context: IGatheringContext<IBoardObjectRotation>): Promise<IGatheredData<IBoardObjectRotation>> {
    let result: IDataRequestResult<IBoardObjectRotation>;
    let confirmed: boolean = false;
    const target = Object.values(context.prev).find((s: IGatheredData<IBoardObject>) => s.value.isBoardObject).value as ISceneMedium;
    if (!target) {
      throw new Error("Cannot find an boardObject in previous steps");
    }
    do {
      result = await firstValueFrom(
        this._sceneInteractionService.requestSelectRotation(
          target,
          this._controlsService.listenForSelectEvent(this._sceneService.canvasRef),
          this._controlsService.listenForHoverEvent(this._sceneService.canvasRef)
        )
      );
      confirmed = await firstValueFrom(this._uiService.requestConfirmation())
    } while (confirmed && !!result)

    if (result.value === undefined) {
      throw new Error("Provided data is not defined");
    }

    return Object.assign(result, { isDataGathered: true });
  }



  private async _collectFieldTypeData(context: IGatheringContext<IBoardField>): Promise<IGatheredData<IBoardField>> {
    let result: IDataRequestResult<IBoardField & ISceneMedium>;
    let confirmed: boolean = false;
    const actorPredicate = r => r.isBoardField && context.allowedData.some(a => a === r);
    do {
      this._suggestionService.showSmartSuggestion(context.allowedData);

      const boardSelector = context.selectors.find(s => s.delegateId === BOARD_SELECTOR);
      if (!!boardSelector) {
        this._suggestionService.showSelectionRangeSuggestion(boardSelector);
      }

      result = await firstValueFrom(this._sceneInteractionService.requestSceneMediumSelection<IBoardField & ISceneMedium>(
        this._controlsService.listenForSelectEvent(this._sceneService.canvasRef), actorPredicate))

      confirmed = await firstValueFrom(this._uiService.requestConfirmation())
    } while (confirmed && !!result)

    if (result.value === undefined) {
      throw new Error("Provided data is not defined");
    }

    return Object.assign(result, { isDataGathered: true });
  }



  private async _collectSourceActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {
    let actor: IActor;
    if (context.allowedData.length >= 1) {
      actor = await this._dataFeed.getActor(context.allowedData[0] as unknown as string);
    }

    if (!actor) {
      throw new Error("Cannot find source actor");
    }

    return {
      value: actor,
      isDataGathered: true
    }
  }

}
