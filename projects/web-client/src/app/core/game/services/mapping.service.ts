import { Injectable } from "@angular/core";
import { IGatheringContext } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { IInteractableMedium } from "../../game-ui/mixins/interactable-medium/interactable-medium.interface";
import { BOARD_SELECTOR, IBoardSelector } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { IBoardField } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IPathSegment } from "@game-logic/lib/modules/board/pathfinding/pathfinding.interface";
import { CubeCoordsHelper } from "@game-logic/lib/modules/board/helpers/coords.helper";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";
import { BoardService } from "@game-logic/lib/modules/board/board.service";
import { ISelectorDeclaration } from "@game-logic/lib/cross-cutting/selector/selector.interface";
import { ICommand } from "../interfaces/command.interface";

@Injectable()
export class MappingService {


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