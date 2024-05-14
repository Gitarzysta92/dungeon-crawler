import { ISelectorDeclaration, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { BoardService } from "../../board.service";
import { IBoardField } from "../../entities/board-field/board-field.interface";
import { IBoardAssignment, IBoardObject } from "../../entities/board-object/board-object.interface";
import { CubeCoordsHelper } from "../../helpers/coords.helper";
import { RotationHelper } from "../../helpers/rotation.helper";


export const BOARD_SELECTOR = "BOARD_SELECTOR";

export interface IBoardSelector {
  selectorType: 'line' | 'cone' | 'radius' | 'global';
  selectorOrigin?: IBoardSelectorOrigin;
  selectorRange?: number;
  traversableSize?: number;
}

export type IBoardSelectorOrigin = Partial<Omit<IBoardObject & IBoardAssignment, 'id'>>;


export class BoardSelector implements ISelectorHandler<IBoardSelector, IBoardObject | IBoardField> {
  
  delegateId: string = BOARD_SELECTOR;

  constructor(
    private readonly _boardService: BoardService
  ) { }
  

  public select(
    s: ISelectorDeclaration<IBoardSelector>,
    d: Array<IBoardObject & IBoardAssignment | IBoardField>
  ): Array<IBoardObject & IBoardAssignment | IBoardField> {
    const fields = this.getFieldsBySelector(s.payload);
    return d.filter(o => fields.some(f => CubeCoordsHelper.isCoordsEqual(o.position, f.position)));
  }

  
  public isApplicableTo(d: ISelectorDeclaration<IBoardSelector>): boolean {
    return this.delegateId === d.delegateId;
  }


  public validateSelectorOriginAgainstBoardSelector(
    origin: Partial<IBoardObject & IBoardAssignment>,
    selector: Omit<IBoardSelector, 'selectorOriginDeterminant'>
  ): void {
    const hasNotDeclaredPosition = (
      selector.selectorType === 'cone' ||
      selector.selectorType === 'line' ||
      selector.selectorType === 'radius'
    ) && !origin.position;
    if (hasNotDeclaredPosition) {
      throw new Error("LINE, CONE and RADIUS selector must have provided position");
    }

    const hasNotDeclaredOutlets = (
      selector.selectorType === 'cone' ||
      selector.selectorType === 'line'
    ) && !Array.isArray(origin.outlets);
    if (hasNotDeclaredOutlets) {
      throw new Error("LINE and CONE selector must have provided position");
    }
  }


  public getNonOccupiedFieldsBySelector(selector: IBoardSelector): IBoardField[] {
    return this.getFieldsBySelector(selector).filter(f => !f.isOccupied())
  }


  public getFieldsBySelector(selector: IBoardSelector): IBoardField[] {
    let boardFields: IBoardField[] = [];
    if (selector.selectorType !== "global" && !selector.selectorOrigin) {
      throw new Error("Selector origin must be provided for given selector type");
    }

    if (selector.selectorType === "global") {
      boardFields = this._boardService.getFields();
    } else if (!!selector.selectorOrigin) {
      if (selector.selectorRange == null) {
        throw new Error("Selector range must be provided for LINE, CONE and RADIUS selector type")
      }

      if (!selector.selectorOrigin.position) {
        throw new Error("Selector origin must have provided position for LINE, CONE and RADIUS selector type")
      }

      if (selector.selectorType === "line") {
        boardFields = this._selectFieldsByLine(selector);
      }

      if (selector.selectorType === "cone") {
        boardFields = this.selectFieldsByCone(selector);
      }

      if (selector.selectorType === "radius") {
        boardFields = this.selectFieldsByRadius(selector);
      }
    }

    return boardFields;
  }


  private selectFieldsByRadius(selector: IBoardSelector): IBoardField[] {
    return CubeCoordsHelper.getCircleOfCoordinates(
      selector.selectorOrigin.position,
      selector.selectorRange,
      (coords) => {
        const field = this._boardService.getFieldByPosition(coords);
        const object = this._boardService.getObjectByPosition(coords);
        return field.isOccupied() && selector.traversableSize <= object?.size;
      }
    ).reduce((acc, c) => {
      const field = this._boardService.getFieldByPosition(c)
      return field ? [...acc, field] : acc;
    }, [])
  }

  
  private selectFieldsByCone(selector: IBoardSelector): IBoardField[] {
    if (!selector.selectorOrigin.outlets) {
      throw new Error("Selector origin outlets must be provided for CONE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualSides(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
    return actualOutlets.flatMap(direction => {
      return CubeCoordsHelper.getConeOfCoordinates(
        selector.selectorOrigin.position,
        direction,
        selector.selectorRange,
        (coords) => {
          const field = this._boardService.getFieldByPosition(coords);
          if (!field) {
            return;
          }
          const object = this._boardService.getObjectByPosition(coords);
          return !object || selector.traversableSize <= object?.size;
        }
      );
    }).reduce((acc, c) => {
      const field = this._boardService.getFieldByPosition(c)
      return field ? [...acc, field] : acc;
    }, [])

  }

  private _selectFieldsByLine(selector: IBoardSelector): IBoardField[] {
    if (!selector.selectorOrigin?.outlets) {
      throw new Error("Selector origin outlets must be provided for LINE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualSides(selector.selectorOrigin.outlets, selector.selectorOrigin.rotation!);
    return actualOutlets.flatMap(direction => {
      let nonSelectable = [];
      return CubeCoordsHelper.getLineOfCoordinates(
        selector.selectorOrigin.position,
        direction,
        selector.selectorRange,
        (coords) => {
          const field = this._boardService.getFieldByPosition(coords);
          if (!field) {
            return;
          }
          if (nonSelectable.includes(field)) {
            return;
          }
          const object = this._boardService.getObjectByPosition(coords);
          if (object && selector.traversableSize < object?.size) {
            nonSelectable = nonSelectable
              .concat(CubeCoordsHelper.getLineOfCoordinates(coords, direction, selector.selectorRange)
                .map(c => this._boardService.getFieldByPosition(coords)));
          }

          return true;
        }
      ).map(c => this._boardService.getFieldByPosition(c))
        
    })
  }

}