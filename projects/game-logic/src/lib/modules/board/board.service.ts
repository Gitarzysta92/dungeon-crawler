import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../base/event/event.service";
import { BoardField } from "./board-field/board-field";
import { BoardObject } from "./board-object/board-object";
import { IBoardCoordinates } from "./board.interface";
import { IPathSegment } from "./pathfinding/pathfinding.interface";


export class BoardService {
  
  private get _fields() { return this._entityService.getEntities<BoardField>(e => e.isBoardField) };
  private get _tiles() { return this._entityService.getEntities<BoardObject>(e => e.isBoardObject) };

  constructor(
    private readonly _entityService: EntityService,
    private readonly _eventService: EventService
  ) {}

  public dehydrate(state: {}): void {
  }

  public hydrate(state: {}): void {
  }

  public getObjects(): BoardObject[] {
    return this._tiles;
  }

  public getFields(): BoardField[] {
    return this._fields;
  }

  public getOccupiedFields(): BoardField[] {
    return this._fields.filter(f => f.isOccupied())
  }

  public getObjectByPosition(coords: IBoardCoordinates): BoardObject | undefined {
    return this._entityService.getEntities<BoardObject>(e => e.isBoardObject && e.position.isEqual(coords))[0];
  }

  public getFieldByPosition(coords: IBoardCoordinates): BoardField | undefined {
    return this._entityService.getEntities<BoardField>(e => e.isBoardField && e.position.isEqual(coords))[0];
  }

  public move(target: BoardObject, segment: IPathSegment): void {
    target.unassign();
    target.assign(segment);
    this._eventService.emit();
  }

}