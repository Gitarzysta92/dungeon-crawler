import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { BoardObjectMovedEvent } from "./aspects/events/board-object-moved.events";
import { ICubeCoordinates } from "./board.interface";
import { IBoardField } from "./entities/board-field/board-field.interface";
import { IBoardAssignment, IBoardObject } from "./entities/board-object/board-object.interface";
import { CoordsHelper } from "./helpers/coords.helper";
import { IPathSegment } from "./pathfinding/pathfinding.interface";


export class BoardService {
  
  private get _fields() { return this._entityService.getEntities<IBoardField>(e => e.isBoardField) };
  private get _tiles() { return this._entityService.getEntities<IBoardObject>(e => e.isBoardObject) };

  constructor(
    private readonly _entityService: EntityService,
    private readonly _eventService: EventService
  ) {}

  public dehydrate(state: {}): void {
  }

  public hydrate(state: {}): void {
  }

  public getObjects(): IBoardObject[] {
    return this._tiles;
  }

  public getFields(): IBoardField[] {
    return this._fields;
  }

  public getOccupiedFields(): IBoardField[] {
    return this._fields.filter(f => f.isOccupied())
  }

  public getObjectByPosition(coords: ICubeCoordinates): IBoardObject | undefined {
    return this._entityService.getEntities<IBoardObject & IBoardAssignment>(e => e.isBoardObject && CoordsHelper.isCoordsEqual(e.position, coords))[0];
  }

  public getFieldByPosition(coords: ICubeCoordinates): IBoardField | undefined {
    return this._entityService.getEntities<IBoardField>(e => e.isBoardField && CoordsHelper.isCoordsEqual(e.position, coords))[0];
  }

  public move(target: IBoardObject, segment: IPathSegment): void {
    const field = this._entityService.getEntity<IBoardField>(e => e.isBoardField && !e.isOccupied() && CoordsHelper.isCoordsEqual(e.position, segment.position))
    if (!field) {
      return;
    } 
    target.unassign();
    target.assign(segment);
    this._eventService.emit(new BoardObjectMovedEvent(target))
  }

}