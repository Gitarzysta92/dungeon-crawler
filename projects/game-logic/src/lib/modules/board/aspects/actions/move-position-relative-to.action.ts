import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../extensions/types";
import { ICubeCoordinates } from "../../board.interface";
import { IBoardAssignment, IBoardObject, IBoardObjectDeclaration } from "../../entities/board-object/board-object.interface";
import { BoardService } from "../../board.service";
import { Path, PathSegment } from "../../pathfinding/path";
import { PathfindingService } from "../../pathfinding/pathfinding.service";
import { CubeCoordsHelper } from "../../helpers/coords.helper";

export const MOVE_POSITION_RELATIVE = "MOVE_POSITION_RELATIVE";

export interface IMovePositionRelativeToActionPayload {
  target: ResolvableReference<IBoardObjectDeclaration>;
  origin: ResolvableReference<IBoardObjectDeclaration>;
  towards: boolean;
  distance: number;
}


export class MovePositionRelativeToHandler implements IActionHandler<IMovePositionRelativeToActionPayload> {

  public delegateId: string = MOVE_POSITION_RELATIVE;

  constructor(
    private readonly _pathfindingService: PathfindingService,
    private readonly _boardService: BoardService
  ) { }
  
  public isApplicableTo(m: IActionDeclaration<IMovePositionRelativeToActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }


  public async process(payload: IMovePositionRelativeToActionPayload): Promise<void> {
    const target = payload.target as IBoardObject & IBoardAssignment;
    const origin = payload.target as IBoardObject & IBoardAssignment;
    const positions = this._boardService.getFields().map(f => f.position);
    const occupiedPositions = this._boardService.getOccupiedFields().map(f => f.position);
    const map = this._pathfindingService.createVectorDistanceMap(origin.position, occupiedPositions, positions);


    let path: Path;
    if (payload.towards) {
      path = this._moveTowards(origin.position, payload.distance, map);
    } else {
      path = this._moveAway(origin.position, payload.distance, map);
    }
    for (let segment of path.segments) {
      this._boardService.move(target, segment);
    }
  }

  
  private _moveAway(origin: ICubeCoordinates, distance: number, map: Map<string, PathSegment>): Path {
    const originSegment = map.get(CubeCoordsHelper.createKeyFromCoordinates(origin));
    const segments = [originSegment];
    while (distance > 0) {
      const s = segments[segments.length - 1]?.successorSegment;
      if (s) {
        segments.push(s);
      }
    }
    return new Path(segments);
  }

  private _moveTowards(origin: ICubeCoordinates, distance: number, map: Map<string, PathSegment>): Path {
    const originSegment = map.get(CubeCoordsHelper.createKeyFromCoordinates(origin));
    const segments = [originSegment];
    while (distance > 0) {
      const s = segments[segments.length - 1]?.predcessorSegments?.find(s => s);
      if (s) {
        segments.push(s);
      }
    }
    return new Path(segments);
  }

}