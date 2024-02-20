import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { IActionDefaultPayload, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../extensions/json-path";
import { ResolvableReference } from "../../../../extensions/types";
import { BoardObject } from "../../board-object/board-object";
import { IBoardCoordinates, IBoardObject } from "../../board.interface";
import { BoardService } from "../../board.service";
import { Path, PathSegment } from "../../pathfinding/path";
import { PathfindingService } from "../../pathfinding/pathfinding.service";

export const MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER = "MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER";

export interface IMovePositionRelativeToActionPayload extends IActionDefaultPayload {
  target: ResolvableReference<IBoardObject>;
  origin: ResolvableReference<IBoardObject>;
  towards: boolean;
  distance: number;
}


export class MovePositionRelativeToHandler implements IActionHandler<IMovePositionRelativeToActionPayload> {

  public delegateId: string = MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER;

  constructor(
    private readonly _pathfindingService: PathfindingService,
    private readonly _boardService: BoardService
  ) { }
  
  public isApplicableTo(m: IDelegateDeclaration<IMovePositionRelativeToActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public prepare(
    d: IMovePositionRelativeToActionPayload,
    ctx: unknown
  ): MovePositionRelativeToPayload {
    const payload = new MovePositionRelativeToPayload(JsonPathResolver.resolve(d, ctx));
    if (!payload.origin.position) {
      throw new Error(`${MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER}: Origin must have position`);
    }

    if (!payload.target.position) {
      throw new Error(`${MOVE_POSITION_RELATIVE_TO_HANDLER_IDENTIFIER}: Target must have position`);
    }
    return payload;
  };

  public async process(payload: MovePositionRelativeToPayload): Promise<void> {
    const coords = this._boardService.getFields().map(f => f.position)
    const occupiedCoords = this._boardService.getOccupiedFields().map(f => f.position);
    const map = this._pathfindingService.createVectorDistanceMap(payload.origin.position, occupiedCoords, coords);

    for (let s of map.values()) {
      if (s.coords.isEqual(payload.target.position)) {
        let segments;
        if (payload.towards) {
          segments = this._moveTowards(s.coords, payload.distance, map)
        } else {
          segments = this._moveAway(s.coords, payload.distance, map)
        }
        this._boardService.move(payload.target, segments);
      }
    }
  }
  private _moveAway(coords: IBoardCoordinates, distance: number, map: Map<string, PathSegment>): Path {
    throw new Error("Method not implemented.");
  }

  private _moveTowards(coords: IBoardCoordinates, distance: number, map: Map<string, PathSegment>): Path {
    throw new Error("Method not implemented.");
  }

}


export class MovePositionRelativeToPayload {
  value: number;
  path: any[];
  target: BoardObject;
  origin: BoardObject;
  towards: boolean;
  distance: number;

  constructor(_p: IMovePositionRelativeToActionPayload) {
    this.origin = _p.origin as BoardObject;
    this.target = _p.target as BoardObject;
    this.towards = _p.towards;
    this.distance = _p.distance;
  }
}

