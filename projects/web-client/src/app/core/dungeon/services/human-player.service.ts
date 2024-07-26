import { Injectable } from '@angular/core';
import { IProcedureController } from '@game-logic/lib/base/procedure/procedure.interface';
import { IDistinguishableData, IGatheredData, IGatheringContext, IGatheringController } from '@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface';
import { ACTOR_DATA_TYPE, SOURCE_ACTOR_DATA_TYPE } from '@game-logic/lib/modules/actors/actors.constants';
import { IActor } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';
import { FIELD_DATA_TYPE, PATH_DATA_TYPE, ROTATION_DATA_TYPE } from '@game-logic/lib/modules/board/board.constants';
import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { IBoardField } from '@game-logic/lib/modules/board/entities/board-field/board-field.interface';
import { SceneInteractionService } from 'src/app/core/scene/api';
import { ISceneMedium } from '../../scene/mixins/scene-medium/scene-medium.interface';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { ICommand, ICommandExecutionController } from '../../game/interfaces/command.interface';
import { DISCARD_CARD_ACTIVITY, TRASH_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { IPath, IPathSegment } from '@game-logic/lib/modules/board/pathfinding/pathfinding.interface';
import { PathfindingService } from '@game-logic/lib/modules/board/pathfinding/pathfinding.service';
import { CubeCoordsHelper } from '@game-logic/lib/modules/board/helpers/coords.helper';
import { InteractionService } from '../../game/services/interaction.service';
import { MappingService } from '../../game/services/mapping.service';
import { IInteractableMedium } from '../../game-ui/mixins/interactable-medium/interactable-medium.interface';
import { DungeonStateStore } from '../stores/dungeon-state.store';
import { HEXAGON_RADIUS } from '../../scene/constants/hexagon.constants';
import { mapCubeCoordsTo3dCoords } from '../../scene/misc/coords-mappings';
import { HexagonHelper } from '../../scene/misc/hexagon.helper';
import { startWith } from 'rxjs';



@Injectable()
export class HumanPlayerService implements IProcedureController, IGatheringController, ICommandExecutionController {
  private _pathfindingService: PathfindingService;

  constructor(
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _interactionService: InteractionService,
    private readonly _mappingService: MappingService,
    private readonly _stateStore: DungeonStateStore,
    private readonly _dataFeed: DataFeedService,
  ) { 
    this._pathfindingService = new PathfindingService()
  }


  public async selectCommandType(types: { [key: string]: ICommand[]; }): Promise<ICommand[]> {
    if (DISCARD_CARD_ACTIVITY in types && TRASH_CARD_ACTIVITY in types) {
      return types[DISCARD_CARD_ACTIVITY];
    }
    return Object.values(types)[0]
  }

  public async selectCommand(availableCommands: ICommand[]): Promise<ICommand> {
    return availableCommands[0];
  }

  //
  // ################
  // Procedure controller
  // ################
  //

  public gather(context: IGatheringContext<unknown, unknown>): Promise<IGatheredData<IDistinguishableData | number | string | null | object>> {
    if (context.dataType === ACTOR_DATA_TYPE) {
      return this._collectActorTypeData(context as IGatheringContext<IActor>)
    }
    if (context.dataType === ROTATION_DATA_TYPE) {
      return this._collectRotationTypeData(context as IGatheringContext<IBoardObjectRotation>)
    }
    if (context.dataType === FIELD_DATA_TYPE) {
      return this._collectFieldTypeData(context as IGatheringContext<IBoardField>)
    }
    if (context.dataType === PATH_DATA_TYPE) {
      return this._collectPathTypeData(context as IGatheringContext<IPathSegment>)
    }
    if (context.dataType === SOURCE_ACTOR_DATA_TYPE) {
      return this._collectSourceActorTypeData(context as IGatheringContext<IActor>)
    }
  }

  public listenForEarlyResolve(s: boolean): Promise<boolean> {
    throw new Error('Method not implemented.');
  }



  private async _collectActorTypeData(context: IGatheringContext<IActor>): Promise<IGatheredData<IActor>> {

    const unhighlightElements = this._interactionService.highlightElements(this._mappingService.mapGatheringContextToInteractableElements(context));
    const preventHovering = this._interactionService.allowHovering(this._mappingService.mapGatheringContextToInteractableElementsMap(context));
    const unhighlightSelectionRange = this._interactionService.highlightElements(this._mappingService.extractSelectionRangeElementsFromGatheringContext(context, this._stateStore.currentState.board))

    const result = await new Promise<IGatheredData<IActor & ISceneMedium>>((resolve) => {
      const dataProvider = this._sceneInteractionService
        .requestSceneMediumSelection<IActor & ISceneMedium & IInteractableMedium>(r =>
          r.isActor && context.allowedData.some(a => a === r));
      this._interactionService.requestInteraction(dataProvider)
        .subscribe(async c => {
          this._interactionService.selectElements([c.data])
          if (c.isCompleted) {
            resolve({value: c.data, isDataGathered: c.isSuccessful});
          }
      });
    });

    unhighlightSelectionRange();
    unhighlightElements();
    preventHovering();

    return result;
  }



  private async _collectRotationTypeData(context: IGatheringContext<IBoardObjectRotation>): Promise<IGatheredData<IBoardObjectRotation>> {
    const sceneMedium = context.steps.find((s: IGatheredData<ISceneMedium>) => s.value.position).value as ISceneMedium
    const target = this._sceneInteractionService.getDummy(sceneMedium);
    if (!target) {
      throw new Error("Cannot find an boardObject in previous steps");
    }

    const result = await new Promise<IGatheredData<IBoardObjectRotation> >((resolve) => {
      const dataProvider = this._sceneInteractionService.requestSelectRotation(target).pipe(startWith(sceneMedium.rotation ?? 0));
      this._interactionService.requestInteraction<IBoardObjectRotation>(dataProvider, false)
        .subscribe(c => {
          if (c.isCompleted) {
            this._sceneInteractionService.hideSelectRotationControl();
            resolve({ value: c.data, isDataGathered: c.isSuccessful });
          }
        });
    });
    return result
  }



  private async _collectFieldTypeData(context: IGatheringContext<IBoardField>): Promise<IGatheredData<IBoardField>> {
    const unhighlightElements = this._interactionService.highlightElements(this._mappingService.mapGatheringContextToInteractableElements(context));
    const preventHovering = this._interactionService.allowHovering(this._mappingService.mapGatheringContextToInteractableElementsMap(context));
    const unhighlightSelectionRange = this._interactionService.highlightElements(this._mappingService.extractSelectionRangeElementsFromGatheringContext(context, this._stateStore.currentState.board));

    const result = await new Promise<IGatheredData<IBoardField & ISceneMedium>>((resolve) => {
      const dataProvider = this._sceneInteractionService
        .requestSceneMediumSelection<IBoardField & ISceneMedium & IInteractableMedium>(r => r.isBoardField && context.allowedData.some(a => a === r));
      this._interactionService.requestInteraction(dataProvider)
        .subscribe(async c => {
          this._interactionService.selectElements([c.data])
          if (c.isCompleted) {
            resolve({value: c.data, isDataGathered: c.isSuccessful});
          }
      });
    });

    unhighlightSelectionRange();
    unhighlightElements();
    preventHovering();

    return result;
  }


  private async _collectPathTypeData(context: IGatheringContext<IPathSegment>): Promise<IGatheredData<IPath>> {
    const fields = this._mappingService.mapPathSegmentsToFields(context.allowedData, this._stateStore.currentState.board.getFields())
    const unhighlightElements = this._interactionService.highlightElements(fields);
    const preventHovering = this._interactionService.allowHovering(this._mappingService.createInteractableElementsMap(fields));

    const result: IGatheredData<IPath> = await new Promise((resolve) => {
      const dataProvider = this._sceneInteractionService.requestSceneMediumSelection<IBoardField & ISceneMedium>(
        r => r.isBoardField && context.allowedData.some(a => CubeCoordsHelper.isCoordsEqual(a.position, r.position)));
      let unselectElements;
      this._interactionService.requestInteraction<IBoardField & ISceneMedium>(dataProvider)
        .subscribe(async c => {
          if (!!unselectElements) {
            unselectElements()
          }
          this._sceneInteractionService.hideDummy();
          let path: IPath;
          if (c.data) {
            const destination = context.allowedData.find(a => CubeCoordsHelper.isCoordsEqual(a.position, c.data.position));
            await this._sceneInteractionService.showDummy(
              context.steps.find((s: IGatheredData<ISceneMedium>) => s.value.position).value as ISceneMedium,
              HexagonHelper.calculatePositionInGrid(mapCubeCoordsTo3dCoords(destination.position), HEXAGON_RADIUS)
            );
            path = this._pathfindingService.establishPath(context.allowedData.find(s => s.isOrigin), destination, context.allowedData);
            unselectElements = this._interactionService.selectElements(this._mappingService.mapPathSegmentsToFields(path.segments, this._stateStore.currentState.board.getFields<IInteractableMedium>()));
          }
          if (c.isCompleted) {
            resolve({
              value: path,
              isDataGathered: c.isSuccessful,
              userData: {
                finalize: () => {
                  unselectElements && unselectElements();
                  this._sceneInteractionService.hideDummy();
                }
              }
            });
          }
      });
    });

    unhighlightElements();
    preventHovering();

    return result;
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
