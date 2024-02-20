import { IBoardCoordinates } from "../board.interface";
import { BoardService } from "../board.service";
import { CoordsHelper } from "../helpers/coords.helper";
import { PathSegment } from "./path";
import { IPathSegment } from "./pathfinding.interface";

export class PathfindingService {

  constructor(
    private readonly _boardService: BoardService
  ) {}

  public getClosestCoords(
    refCoords: IBoardCoordinates,
    possibleCoords: IBoardCoordinates[]
  ): IBoardCoordinates | undefined {
    let target = { distance: null, coords: null };

    for (let pc of possibleCoords) {
      const distance = CoordsHelper.getDistanceBetweenBoardCoordinates(refCoords, pc);
      if (target.distance === null || target.distance > distance) {
        target.distance = distance
        target.coords = pc;
      }
    }
    return target.coords;
  }


  public findShortestPathBetweenCoordinates(
    from: IBoardCoordinates,
    to: IBoardCoordinates,
    vectorMap: Map<string, IPathSegment>
  ): IPathSegment[] {
    let entry = vectorMap.get(CoordsHelper.createKeyFromCoordinates(from));
    if (!entry) {
      return [];
    }

    if (CoordsHelper.isCoordsEqual(entry.coords, to)) {
      return [entry]
    }

    const adjanced = CoordsHelper.getAdjancedCoordsBySide(from, entry.vector);
    const nested = this.findShortestPathBetweenCoordinates(adjanced, to, vectorMap);
    return [entry, ...nested];
  }


  public generateBoardCoordinatesVectorMap(
    from: IBoardCoordinates,
    occupiedCoords?: IBoardCoordinates[]
  ): Map<string, PathSegment> {
    const fields = this._boardService.getFields();

    if (!occupiedCoords) {
      occupiedCoords = fields
      .filter(f => f.isOccupied())
      .map(f => f.position);
    }

    const allCoords = fields.map(f => f.position);
    return this.createVectorDistanceMap(from, occupiedCoords, allCoords);
  }


  public createVectorDistanceMap(
    from: IBoardCoordinates,
    occupiedCoords: IBoardCoordinates[],
    allCoords: IBoardCoordinates[],
  ): Map<string, PathSegment> {
    const vectorAndDistanceEntry: IPathSegment = {
      coords: from,
      vector: 0,
      distanceToOrigin: 0,
      isOrigin: true
    }
    const map = new Map([[CoordsHelper.createKeyFromCoordinates(from), vectorAndDistanceEntry]]);
    this._collectVectorAndDistanceEntries([vectorAndDistanceEntry], occupiedCoords, allCoords, map);
    this._optimizeVectors(map);
    return this._initializeVectorMap(map);
  }


  private _optimizeVectors(vectorMap: Map<string, IPathSegment>): void {
    for (let entry of vectorMap.values()) {
      const adjacentCoords = CoordsHelper.getCircleOfCoordinates(entry.coords, 1);
      let vectorTarget = vectorMap.get(
        CoordsHelper.createKeyFromCoordinates(
          CoordsHelper.getAdjancedCoordsBySide(entry.coords, entry.vector)));
      
      if (!vectorTarget) {
        continue;
      }
      
      for (let coords of adjacentCoords) {
        const adjancedEntry = vectorMap.get(CoordsHelper.createKeyFromCoordinates(coords));
        if (adjancedEntry?.distanceToOrigin < vectorTarget?.distanceToOrigin) {
          vectorTarget = adjancedEntry;
        }
      }
      entry.vector = CoordsHelper.getAdjancedSide(entry.coords, vectorTarget.coords);
    }
  }


  private _collectVectorAndDistanceEntries(
    from: IPathSegment[],
    occupiedCoords: IBoardCoordinates[],
    allCoords: IBoardCoordinates[],
    map: Map<string, IPathSegment>,
  ): void {
    const tempMap: Map<string, IPathSegment> = new Map();

    for (let fromEntry of from) {
      const adjacentCoordsToCreate = CoordsHelper.getCircleOfCoordinates(fromEntry.coords, 1)
        .filter(c => {
          return !occupiedCoords.find(oc => CoordsHelper.isCoordsEqual(c, oc)) &&
            !map.has(CoordsHelper.createKeyFromCoordinates(c)) &&
            allCoords.find(ac => CoordsHelper.isCoordsEqual(c, ac))
        });
      
      for (let coords of adjacentCoordsToCreate) {
        const entry = {
          coords: coords,
          vector: CoordsHelper.getAdjancedSide(coords, fromEntry.coords),
          distanceToOrigin: fromEntry.distanceToOrigin + 1
        }
        tempMap.set(CoordsHelper.createKeyFromCoordinates(entry.coords), entry);
      }
    }

    for (let tempEntry of tempMap) {
      map.set(tempEntry[0], tempEntry[1]);
    }

    if (from.length > 0) {
      this._collectVectorAndDistanceEntries(
        Array.from(tempMap.values()),
        occupiedCoords,
        allCoords,
        map,
      );
    }
  }

  private _initializeVectorMap(map: Map<string, IPathSegment>): Map<string, PathSegment> {
    for (let segment of map.entries()) {
      map.set(segment[0], new PathSegment(segment[1], map as Map<string, PathSegment>))
    }

    for (let segment of (map as Map<string, PathSegment>).values()) {
      const targetCoords = CoordsHelper.getAdjancedCoordsBySide(segment.coords, segment.vector);
      const targetSegment = map.get(CoordsHelper.createKeyFromCoordinates(targetCoords)) as PathSegment;
      segment.successorSegment = targetSegment;
    }

    return map as Map<string, PathSegment>;
  }

}