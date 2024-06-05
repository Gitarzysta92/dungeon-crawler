
import { EntityService } from "../../../lib/base/entity/entity.service";
import { INestedArea } from "../../../lib/modules/areas/entities/area/area.interface";
import { BoardService } from "../../../lib/modules/board/board.service";
import { CubeCoordsHelper } from "../../../lib/modules/board/helpers/coords.helper";
import { PathfindingService } from "../../../lib/modules/board/pathfinding/pathfinding.service";
import { IBoardAreaTravelPath, IBoardAreaTravelSegment } from "./board-areas.interface";
import { IBoardArea } from "./entities/board-area/board-area.interface";
import { IBoardAreaResident } from "./entities/board-resident/resident.interface";
import { IBoardTraveler } from "./entities/board-traveler/board-traveler.interface";

export class BoardAreaService {

  constructor(
    private readonly _entityService: EntityService,
    private readonly _pathfindingService: PathfindingService,
    private readonly _boardService: BoardService
  ) {}

  public getArea<T>(delegate?: (a: IBoardArea & T) => boolean): T & IBoardArea {
    return this._entityService.getEntity(a => a.isBoardArea && (!delegate || delegate(a)));
  }


  public getAreas<T>(delegate?: (a: IBoardArea & T) => boolean): Array<T & IBoardArea> {
    return this._entityService.getEntities(a => a.isBoardArea && (!delegate || delegate(a)))
  }


  public getRootArea<T>(nestedArea: INestedArea): T & IBoardArea {
    const areas = this.getAreas();
    const area = areas.find(a => a.nestedAreas.some(na => na.id === nestedArea.id));
    return (area ?? nestedArea) as T & IBoardArea;
  }


  public getAvailableAreas(): IBoardArea[] {
    return this.getAreas(a => a.isUnlocked);
  }

  
  public getNestedAreas(area: INestedArea): INestedArea[] {
    if (!area || !area.nestedAreas) {
      return [];
    }
    return area.nestedAreas.reduce((acc, a) => acc.concat(this.getNestedAreas(a)), [...area.nestedAreas]);
  }


  public getResidentsFor(a: IBoardArea): IBoardAreaResident[] {
    const nestedAreas = this.getNestedAreas(a).concat(a);
    return this._entityService.getEntities<IBoardAreaResident>(e => e.isResident && nestedAreas.some(a => a.id === e.occupiedAreaId));
  }


  public getOccupierFor(a: IBoardArea): IBoardTraveler {
    return this._entityService.getEntity<IBoardTraveler>(e => e.isTraveler && e.occupiedArea.id === a.id);
  }


  public getTraveler(): IBoardTraveler {
    return this._entityService.getEntity<IBoardTraveler>(e => e.isTraveler);
  }


  public hasConnection(startArea: IBoardArea, endArea: IBoardArea): boolean {
    const excludedCoords = this.getAreas(a => !a.isTravelable || !a.isUnlocked || a.isOccupied()).map(a => a.position);
    const coords = this.getAreas().map(a => a.position);
    const path = this._pathfindingService.findShortestPathBetweenCoordinatesV2(startArea.position, endArea.position, coords, excludedCoords);
    return !!path;
  }


  public getConnection(startArea: IBoardArea, endArea: IBoardArea): IBoardAreaTravelPath | undefined {
    const excludedCoords = this.getAreas(a => !a.isTravelable || !a.isUnlocked || a.isOccupied()).map(a => a.position);
    const coords = this.getAreas().map(a => a.position);
    const path = this._pathfindingService.findShortestPathBetweenCoordinatesV2(startArea.position, endArea.position, coords, excludedCoords);
    if (!path) {
      throw new Error("Cannot find path between given areas");
    }
    const origin = this.getArea(a => CubeCoordsHelper.isCoordsEqual(a.position, path.origin.position));
    const destination = this.getArea(a => CubeCoordsHelper.isCoordsEqual(a.position, path.destination.position));
    const areas = this.getAreas(a => path.segments.some(s => CubeCoordsHelper.isCoordsEqual(s.position, a.position)));
    if (!origin || areas.length !== path.segments.length || path.segments.some(s => !s) || !destination) {
      throw new Error("Cannot find area related to path segment");
    }
    return {
      origin: Object.assign(path.origin, origin),
      destination: Object.assign(path.destination, destination),
      segments: path.segments.map(s => Object.assign(s, areas.find(a => CubeCoordsHelper.isCoordsEqual(a.position, s.position)) ))
    }
  }


  public travel(traveler: IBoardTraveler, targetArea: IBoardAreaTravelSegment): void {
    this._boardService.move(traveler, targetArea)
  }


  public calculateSummarizedTravelCost(startArea: IBoardArea, endArea: IBoardArea): number {
    const connection = this.getConnection(startArea, endArea);
    if (!connection.segments.every(a => a.isUnlocked)) {
      throw new Error("Cannot calculate travel. Some of the areas are locked.")
    }
    return connection.segments.reduce((acc, s) => acc + this.calculateTravelCost(s), 0)
  }

  public calculateTravelCost(from: IBoardArea): number {
    return from.terrainDifficulty;
  }


  public unlockAreas(area: IBoardArea): void {
    const coords = [
      ...CubeCoordsHelper.getCircleOfCoordinates(area.position, 1),
      ...CubeCoordsHelper.getCircleOfCoordinates(area.position, 2)
    ]
    const areas = this.getAreas(a => coords.some(c => a.position && CubeCoordsHelper.isCoordsEqual(a.position, c)));
    areas.forEach(a => a.isUnlocked = true);
    area.isUnlocked = true;
  }


}