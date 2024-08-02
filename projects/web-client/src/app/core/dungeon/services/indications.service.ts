import { Injectable } from "@angular/core";
import { DungeonStateStore } from "../stores/dungeon-state.store";
import { UiInteractionService } from "../../game-ui/services/ui-interaction.service";
import { SceneService } from "../../scene/services/scene.service";
import { IGatheringContext } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IPath, IPathSegment } from "@game-logic/lib/modules/board/pathfinding/pathfinding.interface";
import { BOARD_SELECTOR, IBoardSelector } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { ISelectorDeclaration } from "@game-logic/lib/cross-cutting/selector/selector.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { ControlsService } from "src/app/infrastructure/controls/controls.service";
import { SceneInteractionService } from "../../scene/api";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";
import { ProcedureFactory } from "@game-logic/lib/base/procedure/procedure.factory";


@Injectable()
export class IndicationsService {
  
  constructor(
    private readonly _stateStore: DungeonStateStore,
    private readonly _uiService: UiInteractionService,
    private readonly _sceneService: SceneService,
    private readonly _sceneInteractionService: SceneInteractionService,
    private readonly _controlsService: ControlsService
  ) {}

  public highlightAllowedSelections(playCardActivity: IActivity): any {
    const procedure = ProcedureFactory.asProcedure(playCardActivity);
    procedure.initializeSteps(procedure)
  }

  public showSelectionRange(context: IGatheringContext<unknown, unknown>) {
    const selector = context.selectors.find(s => s.delegateId === BOARD_SELECTOR) as ISelectorDeclaration<IBoardSelector>
    const fields = this._stateStore.currentState.board.getFieldsBySelector<ISceneMedium>(selector);
    for (let field of fields) {
      field.isHighlighted = true;
    }
  }

  public highlightAllowedData(context: IGatheringContext<unknown, unknown>) {
    const items = [];
    for (let item of context.allowedData as Array<IInteractableMedium & Partial<IPath> & Partial<IBoardField>>) {
      if ('distanceToOrigin' in item) {
        item = this._stateStore.currentState.board.getFieldByPosition((item as unknown as IPathSegment).position) as IBoardField & IInteractableMedium
      }
      if ('isHighlighted' in item) {
        item.isHighlighted = true;
        items.push(item)
      }
    }

    return () => items.forEach(i => i.isHighlighted = false);
  }

  public selectAllowedData(context: IGatheringContext<unknown, unknown>) {
    const items = [];
    for (let item of context.allowedData as Array<IInteractableMedium & Partial<IPath> & Partial<IBoardField>>) {
      if ('distanceToOrigin' in item) {
        item = this._stateStore.currentState.board.getFieldByPosition((item as unknown as IPathSegment).position) as IBoardField & IInteractableMedium
      }
      if ('isSelected' in item) {
        item.isSelected = true;
        items.push(item)
      }
    }

    return () => items.forEach(i => i.isHighlighted = false);
  }

  // public showGatheringDataSmartSuggestion(context: IGatheringContext<unknown, unknown>): void {
  //   if (context.allowedData.length <= 0) {
  //     throw new Error("There is not allowed data to gather")
  //   }
  //   if (context.dataType === ACTOR_DATA_TYPE) {
 
  //   }
  //   if (context.dataType === ROTATION_DATA_TYPE) {

  //   }
  //   if (context.dataType === FIELD_DATA_TYPE) {

  //   }
  //   if (context.dataType === PATH_DATA_TYPE) {

  //   }
  //   if (context.dataType === SOURCE_ACTOR_DATA_TYPE) {
  //   }


  //   const allowedFields = this._stateStore.currentState.getFields(context.allowedData);
  //   for (let item of context) {
  //     if ('isHighlighted' in item) {
  //       item.isHighlighted = true;
  //     }
  //   }
  // }

}