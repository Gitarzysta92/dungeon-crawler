import { Injectable } from "@angular/core";
import { IGatheringContext } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { BOARD_SELECTOR, BoardSelector, IBoardSelector } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IPathSegment } from "@game-logic/lib/modules/board/pathfinding/pathfinding.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { IActivity, IActivityDoer } from "@game-logic/lib/base/activity/activity.interface";
import { BoardService } from "@game-logic/lib/modules/board/board.service";
import { ISelectorDeclaration } from "@game-logic/lib/cross-cutting/selector/selector.interface";
import { ICommand } from "../interfaces/command.interface";
import { ProcedureAggregate } from "@game-logic/lib/base/procedure/procedure-aggregate";
import { ProcedureFactory } from "@game-logic/lib/base/procedure/procedure.factory";
import { MakeActionProcedureStep } from "@game-logic/lib/cross-cutting/action/action.procedure-step";
import { GatheringDataProcedureStep } from "@game-logic/lib/cross-cutting/gatherer/gathering-data.procedure-step";
import { InteractableMediumFactory } from "../../game-ui/mixins/interactable-medium/interactable-medium.factory";
import { IProcedure } from "@game-logic/lib/base/procedure/procedure.interface";

@Injectable()
export class MappingService {


  public async extractInteractableMediumsFromProcedure(
    activity: IProcedure & IActivity,
    performer: IActivityDoer,
    boardService: BoardService,
    map: Map<IInteractableMedium, IInteractableMedium>
  ): Promise<void> {
    if (ProcedureFactory.isProcedure(activity)) {
      const initialStep = ProcedureFactory.asProcedure(activity).initialStep as GatheringDataProcedureStep & MakeActionProcedureStep;
      if (initialStep.isGatheringDataStep) {
        const aggregate = new ProcedureAggregate();

        const step = await initialStep.parse(aggregate, {
          data: Object.assign({ performer, subject: activity.subject }, activity),
          controller: {} as any
        });

        const boardSelector = step.selectors.find(s => BoardSelector.isBoardSelector(s));
        if (boardSelector) {
          const fields = boardService.getFieldsBySelector(BoardSelector.asBoardSelector(boardSelector));
          for (let field of fields) {
            if (InteractableMediumFactory.isInteractableMedium(field)) {
              map.set(InteractableMediumFactory.asInteractableMedium(field), InteractableMediumFactory.asInteractableMedium(field));
            }
          }
        }

        if (Array.isArray(step.allowedData)) {
          for (let d of step.allowedData) {
            if (InteractableMediumFactory.isInteractableMedium(d)) {
              map.set(InteractableMediumFactory.asInteractableMedium(d), InteractableMediumFactory.asInteractableMedium(d));
            }
          }
        }

        if (!!step.payload) {
          if (Array.isArray(step.payload)) {
            for (let item of step.payload) {
              if (InteractableMediumFactory.isInteractableMedium(item)) {
                map.set(InteractableMediumFactory.asInteractableMedium(item), InteractableMediumFactory.asInteractableMedium(item));
              }
            }
          }
          if (InteractableMediumFactory.isInteractableMedium(step.payload)) {
            map.set(InteractableMediumFactory.asInteractableMedium(step.payload), InteractableMediumFactory.asInteractableMedium(step.payload));
          }
        }
      }
    }
  }


  public mapPathSegmentsToFields(segments: IPathSegment[], boarFields: Array<IBoardField & IInteractableMedium>): Array<IBoardField & IInteractableMedium> {
    return segments.map(s => boarFields.find(f => CubeCoordsHelper.isCoordsEqual(s.position, f.position)));
  }

  public extractSelectionRangeElementsFromGatheringContext(context: IGatheringContext<unknown, unknown>, boardService: BoardService): IInteractableMedium[] {
    const boardSelector = context.selectors.find(s => s.delegateId === BOARD_SELECTOR) as ISelectorDeclaration<IBoardSelector>;
    return boardService.getFieldsBySelector(boardSelector)
  }

  public mapGatheringContextToInteractableElementsMap(context: IGatheringContext<unknown, unknown>): Map<IInteractableMedium, IInteractableMedium> {
    return this.createInteractableElementsMap(context.allowedData as IInteractableMedium[])
  }

  public mapGatheringContextToInteractableElements(context: IGatheringContext<unknown, unknown>): IInteractableMedium[] {
    return context.allowedData as IInteractableMedium[];
  }

  public extractActivitySubjects(activities: IActivity[]): IInteractableMedium[] {
    const map = new Map()
    for (let a of activities) {
      map.set(a.subject, a.subject);
    }
    return Array.from(map.values());
  }

  public createInteractableElementsMap<T>(items: IInteractableMedium[]): Map<T & IInteractableMedium, T & IInteractableMedium> {
    const map = new Map()
    for (let c of items) {
      map.set(c, c);
    }
    return map;
  }

  public mapCommandsToInteractableElementsMap<T>(items: ICommand[]): Map<T & IInteractableMedium, T & IInteractableMedium> {
    const map = new Map()
    for (let c of items) {
      map.set(c.subject, c.subject);
    }
    return map;
  }
  
}