import { ISelectorDeclaration, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { BoardService } from "../../board.service";
import { IBoardField } from "../../entities/board-field/board-field.interface";
import { IBoardAssignment, IBoardObject } from "../../entities/board-object/board-object.interface";
import { CubeCoordsHelper } from "../../helpers/coords.helper";
import { RotationHelper } from "../../helpers/rotation.helper";
import { IPath, IPathSegment } from "../../pathfinding/pathfinding.interface";
import { PathfindingService } from "../../pathfinding/pathfinding.service";


export const BOARD_SELECTOR = "BOARD_SELECTOR";

export interface IBoardSelector {
  shape: 'line' | 'cone' | 'radius' | 'global' | 'path';
  origin?: IBoardSelectorOrigin;
  range?: number;
}

export type IBoardSelectorOrigin = Partial<Omit<IBoardObject & IBoardAssignment, 'id'>>;


export class BoardSelector implements ISelectorHandler<IBoardSelector, IBoardObject | IBoardField | IPathSegment> {
  
  delegateId: string = BOARD_SELECTOR;

  constructor(
    private readonly _boardService: BoardService,
    private readonly _pathfindingService: PathfindingService
  ) { }

  public static isBoardSelector(data: any): boolean {
    return data.delegateId === BOARD_SELECTOR; 
  }
  
  public static asBoardSelector<T>(data: T): T & ISelectorDeclaration<IBoardSelector> {
    if (!this.isBoardSelector(data)) {
      throw new Error("Provided data is not a Procedure");
    } 
    return data as ISelectorDeclaration<IBoardSelector> & T;
  }
  

  public select(
    s: ISelectorDeclaration<IBoardSelector>,
    d: Array<IBoardObject & IBoardAssignment | IBoardField>
  ): Array<IBoardObject & IBoardAssignment | IBoardField | IPathSegment> {
    if (s.payload.shape === 'path') {
      return this._selectPath(s.payload)
    } else {
      const fields = this.getFieldsBySelector(s.payload);
      return d.filter(o => fields.some(f => CubeCoordsHelper.isCoordsEqual(o.position, f.position))); 
    }
  }

  
  public isApplicableTo(d: ISelectorDeclaration<IBoardSelector>): boolean {
    return this.delegateId === d.delegateId;
  }


  public validateSelectorOriginAgainstBoardSelector(
    origin: Partial<IBoardObject & IBoardAssignment>,
    selector: Omit<IBoardSelector, 'selectorOriginDeterminant'>
  ): void {
    const hasNotDeclaredPosition = (
      selector.shape === 'cone' ||
      selector.shape === 'line' ||
      selector.shape === 'radius'
    ) && !origin.position;
    if (hasNotDeclaredPosition) {
      throw new Error("LINE, CONE and RADIUS selector must have provided position");
    }

    const hasNotDeclaredOutlets = (
      selector.shape === 'cone' ||
      selector.shape === 'line'
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
    if (selector.shape !== "global" && !selector.origin) {
      throw new Error("Selector origin must be provided for given selector type");
    }

    if (selector.shape === "global") {
      boardFields = this._boardService.getFields();
    } else if (!!selector.origin) {
      if (selector.range == null) {
        throw new Error("Selector range must be provided for LINE, CONE and RADIUS selector type")
      }

      if (!selector.origin.position) {
        throw new Error("Selector origin must have provided position for LINE, CONE and RADIUS selector type")
      }

      if (selector.shape === "line") {
        boardFields = this._selectFieldsByLine(selector);
      }

      if (selector.shape === "cone") {
        boardFields = this._selectFieldsByCone(selector);
      }

      if (selector.shape === "radius") {
        boardFields = this._selectFieldsByRadius(selector);
      }
    }

    return boardFields;
  }


  private _selectFieldsByRadius(selector: IBoardSelector): IBoardField[] {
    return CubeCoordsHelper.getCircleOfCoordinates(
      selector.origin.position,
      selector.range,
      (coords) => {
        const field = this._boardService.getFieldByPosition(coords);
        const object = this._boardService.getObjectByPosition(coords);
        return field.isOccupied();
      }
    ).reduce((acc, c) => {
      const field = this._boardService.getFieldByPosition(c)
      return field ? [...acc, field] : acc;
    }, [])
  }

  
  private _selectFieldsByCone(selector: IBoardSelector): IBoardField[] {
    if (!selector.origin.outlets) {
      throw new Error("Selector origin outlets must be provided for CONE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualSides(selector.origin.outlets, selector.origin.rotation!);
    return actualOutlets.flatMap(direction => {
      return CubeCoordsHelper.getConeOfCoordinates(
        selector.origin.position,
        direction,
        selector.range,
        (coords) => {
          const field = this._boardService.getFieldByPosition(coords);
          if (!field) {
            return;
          }
          const object = this._boardService.getObjectByPosition(coords);
          return !object
        }
      );
    }).reduce((acc, c) => {
      const field = this._boardService.getFieldByPosition(c)
      return field ? [...acc, field] : acc;
    }, [])

  }

  private _selectFieldsByLine(selector: IBoardSelector): IBoardField[] {
    if (!selector.origin?.outlets) {
      throw new Error("Selector origin outlets must be provided for LINE selector type");
    }
    const actualOutlets = RotationHelper.calculateActualSides(selector.origin.outlets, selector.origin.rotation!);
    return actualOutlets.flatMap(direction => {
      let nonSelectable = [];
      return CubeCoordsHelper.getLineOfCoordinates(
        selector.origin.position,
        direction,
        selector.range,
        (coords) => {
          const field = this._boardService.getFieldByPosition(coords);
          if (!field) {
            return;
          }
          if (nonSelectable.includes(field)) {
            return;
          }
          const object = this._boardService.getObjectByPosition(coords);
          if (object) {
            nonSelectable = nonSelectable
              .concat(CubeCoordsHelper.getLineOfCoordinates(coords, direction, selector.range)
                .map(c => this._boardService.getFieldByPosition(coords)));
          }

          return true;
        }
      ).map(c => this._boardService.getFieldByPosition(c))
        
    })
  }

  private _selectPath(selector: IBoardSelector): IPathSegment[] {
    if (!selector.origin) {
      throw new Error("Selector origin must be provided for selecting path")
    }
    const positions = this._boardService.getFields().map(f => f.position);
    const occupiedPositions = this._boardService.getOccupiedFields().map(f => f.position);
    const map = this._pathfindingService.createVectorDistanceMap(selector.origin.position, occupiedPositions, positions);
    const segments = Array.from(map.values())
      .filter(s => s.distanceToOrigin <= selector.range)
    return segments;
  }

}