import { ISelectorDeclaration, ISelectorHandler } from "../../../../cross-cutting/selector/selector.interface";
import { BoardService } from "../../board.service";
import { BoardFieldFactory } from "../../entities/board-field/board-field.factory";
import { IBoardField } from "../../entities/board-field/board-field.interface";
import { BoardObjectFactory } from "../../entities/board-object/board-object.factory";
import { IBoardAssignment, IBoardObject } from "../../entities/board-object/board-object.interface";
import { CubeCoordsHelper } from "../../helpers/coords.helper";
import { PathfindingService } from "../../pathfinding/pathfinding.service";


export const BOARD_SELECTOR2 = "BOARD_SELECTOR2";

export interface IBoardSelector {
  shape: 'line' | 'cone' | 'radius' | 'path';
  origin?: IBoardSelectorOrigin;
  range?: number;
  includeOccupied?: boolean
}

export type IBoardSelectorOrigin = Partial<Omit<IBoardObject & IBoardAssignment, 'id'>>;


export class BoardSelector2 implements ISelectorHandler<IBoardSelector, IBoardObject | IBoardField> {
  
  delegateId: string = BOARD_SELECTOR2;

  constructor(
    private readonly _boardService: BoardService,
    private readonly _pathfindingService: PathfindingService
  ) { }

  public static isBoardSelector(data: any): boolean {
    return data.delegateId === BOARD_SELECTOR2; 
  }
  
  public static asBoardSelector<T>(data: T): T & ISelectorDeclaration<IBoardSelector> {
    if (!this.isBoardSelector(data)) {
      throw new Error("Provided data is not a Procedure");
    } 
    return data as ISelectorDeclaration<IBoardSelector> & T;
  }

  public isApplicableTo(d: ISelectorDeclaration<IBoardSelector>): boolean {
    return this.delegateId === d.delegateId;
  }
  
  public select(
    selector: ISelectorDeclaration<IBoardSelector>,
    d: Array<IBoardObject | IBoardField>
  ): Array<IBoardObject | IBoardField> {
    if (!selector.payload.origin) {
      throw new Error("Selector origin must be provided for given selector type");
    }

    if (selector.payload.range == null) {
      throw new Error("Selector range must be provided for LINE, CONE and RADIUS selector type")
    }

    if (!selector.payload.origin.position) {
      throw new Error("Selector origin must have provided position for LINE, CONE and RADIUS selector type")
    }

    d = this._selectOccupied(selector.payload, d);

    if (selector.payload.shape === "line") {
      d = this._selectByLine(selector.payload, d);
    }

    if (selector.payload.shape === "cone") {
      d = this._selectByCone(selector.payload, d);
    }

    if (selector.payload.shape === "radius") {
      d = this._selectByRadius(selector.payload, d);
    }

    if (selector.payload.shape === "path") {
      d = this._selectByPath(selector.payload, d);
    }
    
    return d;
  }

  private _selectByRadius(
    selector: IBoardSelector,
    d: Array<IBoardObject | IBoardField>
  ): Array<IBoardObject | IBoardField> {
    return CubeCoordsHelper.getCircleOfCoordinates(this._asSelectorOrigin(selector.origin).position, selector.range)
      .reduce((acc, c) => {
        const o = d.find(d => CubeCoordsHelper.isCoordsEqual(d.position, c))
        return o ? [...acc, o] : acc;
      }, [])
  }

  
  private _selectByCone(
    selector: IBoardSelector,
    d: Array<IBoardObject | IBoardField>
  ): Array<IBoardObject | IBoardField> {
    return this._asSelectorOrigin(selector.origin).actualOutlets
      .flatMap(direction => CubeCoordsHelper.getConeOfCoordinates(selector.origin.position, direction, selector.range))
      .reduce((acc, c) => {
        const o =  d.find(d => CubeCoordsHelper.isCoordsEqual(d.position, c))
        return o ? [...acc, o] : acc;
      }, [])
  }


  private _selectByLine(
    selector: IBoardSelector,
    d: Array<IBoardObject | IBoardField>
  ): Array<IBoardObject | IBoardField> {
    return this._asSelectorOrigin(selector.origin).actualOutlets
      .flatMap(direction => CubeCoordsHelper.getLineOfCoordinates(selector.origin.position, direction, selector.range))
      .reduce((acc, c) => {
        const o =  d.find(d => CubeCoordsHelper.isCoordsEqual(d.position, c))
        return o ? [...acc, o] : acc;
      }, [])
  }

  private _selectByPath(
    selector: IBoardSelector,
    d: Array<IBoardObject | IBoardField>
  ): Array<IBoardObject | IBoardField> {
    const positions = this._boardService.getFields().map(f => f.position);
    const occupiedPositions = this._boardService.getOccupiedFields().map(f => f.position);
    // TO DO
    // create vector map restricted by range
    //const map = this._pathfindingService.createVectorDistanceMap(selector.origin.position, occupiedPositions, positions, selector.range);
    const map = this._pathfindingService.createVectorDistanceMap(selector.origin.position, occupiedPositions, positions);
    const result = [];
    for (let s of map.values()) {
      if (s.distanceToOrigin > selector.range) {
        continue;
      }
      const r = d.find(i => CubeCoordsHelper.isCoordsEqual(i.position, s.position))
      if (!!r) {
        result.push(r);
      }
    }
    return result;
  }


  private _selectOccupied(
    selector: IBoardSelector,
    d: Array<IBoardObject | IBoardField>
  ): Array<IBoardObject | IBoardField> {
    return d.filter(o => {
      if (selector.includeOccupied) {
        return true;
      }
      if (BoardObjectFactory.isBoardObject(o)) {
        return true;
      }
      if (BoardFieldFactory.isBoardField(o)) {
        return !BoardFieldFactory.asBoardField(o).isOccupied()
      }
    });
  }


  private _asSelectorOrigin<T>(data: T): T & IBoardSelectorOrigin {
    if (!('actualOutlets' in (data as any) && 'position' in (data as any))) {
      throw new Error("Provided data is not a Seletor Origin");
    } 
    return data as ISelectorDeclaration<IBoardObject> & T;
  }

}