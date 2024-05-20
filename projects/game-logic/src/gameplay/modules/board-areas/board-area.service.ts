import { EntityService } from "../../../lib/base/entity/entity.service";
import { Guid } from "../../../lib/extensions/types";
import { CubeCoordsHelper } from "../../../lib/modules/board/helpers/coords.helper";
import { IPath } from "../../../lib/modules/board/pathfinding/pathfinding.interface";
import { PathfindingService } from "../../../lib/modules/board/pathfinding/pathfinding.service";
import { IBoardArea } from "./entities/board-area/board-area.interface";
import { IBoardAreaResident } from "./entities/board-resident/resident.interface";
import { IBoardTraveler } from "./entities/board-traveler/board-traveler.interface";

export class BoardAreaService {

  constructor(
    private readonly _entityService: EntityService,
    private readonly _pathfindingService: PathfindingService
  ) {}

  public getArea<T>(arg0: (a: IBoardArea & T) => boolean): T & IBoardArea {
    return this._entityService.getEntity(arg0);
  }

  public getAreas<T>(arg0: (a: IBoardArea & T) => boolean): Array<T & IBoardArea> {
    return this._entityService.getEntities(arg0)
  }

  public getAvailableAreas(): IBoardArea[] {
    return this.getAreas(a => a.isUnlocked);
  }

  public getResidentsFor(a: IBoardArea): IBoardAreaResident[] {
    return this._entityService.getEntities<IBoardAreaResident>(e => e.isResident && e.occupiedAreaId === a.id);
  }

  public getOccupierFor(a: IBoardArea): IBoardTraveler {
    return this._entityService.getEntity<IBoardTraveler>(e => e.isTraveler && e.occupiedAreaId === a.id);
  }

  public getTraveler(): IBoardTraveler {
    return this._entityService.getEntity<IBoardTraveler>(e => e.isTraveler);
  }

  public getConnection(startAreaId: Guid, endAreaId: Guid): IPath | undefined {
    const startArea = this.getArea(a => a.id === startAreaId);
    const endArea = this.getArea(a => a.id === endAreaId);
    const excludedCoords = this.getAreas(a => !a.isTravelable && a.position && (!a.isUnlocked || a.isOccupied())).map(a => a.position);
    return this._pathfindingService.findShortestPathBetweenCoordinatesV2(startArea.position, endArea.position, excludedCoords)
  }

  public calculateTravel(startAreaId: Guid, endAreaId: Guid): number {
    const connection = this.getConnection(startAreaId, endAreaId);
    const areas = connection.segments.map(s => this.getArea((a => CubeCoordsHelper.isCoordsEqual(s.position, a.position))));
    if (!areas.every(a => a.isUnlocked)) {
      throw new Error("Cannot calculate travel. Some of the areas are not unlocked.")
    }

    const averageDifficulty = Math.round(areas.reduce((acc, curr) => acc += curr.terrainDifficulty, 0) / areas.length);
    return averageDifficulty * areas.length;
  }

  public unlockAreas(area: IBoardArea): void {
    const coords = CubeCoordsHelper.getCircleOfCoordinates(area.position, 1);
    const areas = this.getAreas(a => coords.some(c => a.position && CubeCoordsHelper.isCoordsEqual(a.position, c)));
    areas.forEach(a => a.isUnlocked = true);
  }


}