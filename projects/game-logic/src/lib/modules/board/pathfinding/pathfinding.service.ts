import { ICubeCoordinates } from "../board.interface";
import { BoardService } from "../board.service";
import { CubeCoordsHelper } from "../helpers/coords.helper";
import { PathSegment } from "./path";
import { IPath, IPathSegment } from "./pathfinding.interface";

export class PathfindingService {

  constructor(
    private readonly _boardService: BoardService
  ) {}

  public getClosestCoords(
    refCoords: ICubeCoordinates,
    possibleCoords: ICubeCoordinates[]
  ): ICubeCoordinates | undefined {
    let target = { distance: null, coords: null };

    for (let pc of possibleCoords) {
      const distance = CubeCoordsHelper.getDistanceBetweenBoardCoordinates(refCoords, pc);
      if (target.distance === null || target.distance > distance) {
        target.distance = distance
        target.coords = pc;
      }
    }
    return target.coords;
  }


  public findShortestPathBetweenCoordinatesV2(
    from: ICubeCoordinates,
    to: ICubeCoordinates,
    excludedCoords: ICubeCoordinates[]
  ): IPath | undefined {
    const map = this.generateBoardCoordinatesVectorMap(to, excludedCoords)
    const segments = this.findShortestPathBetweenCoordinates(from, to, map);
    if (segments.length <= 0) {
      return;
    }
    return {
      segments: segments,
      origin: segments.find(s => s.isOrigin)
    }
  }


  public findShortestPathBetweenCoordinates(
    from: ICubeCoordinates,
    to: ICubeCoordinates,
    vectorMap: Map<string, IPathSegment>
  ): IPathSegment[] {
    let entry = vectorMap.get(CubeCoordsHelper.createKeyFromCoordinates(from));
    if (!entry) {
      return [];
    }

    if (CubeCoordsHelper.isCoordsEqual(entry.position, to)) {
      return [entry]
    }

    const adjanced = CubeCoordsHelper.getAdjancedCoordsBySide(from, entry.rotation);
    const nested = this.findShortestPathBetweenCoordinates(adjanced, to, vectorMap);
    return [entry, ...nested];
  }


  public generateBoardCoordinatesVectorMap(
    from: ICubeCoordinates,
    excludedCoords?: ICubeCoordinates[]
  ): Map<string, PathSegment> {
    const fields = this._boardService.getFields();

    if (!excludedCoords) {
      excludedCoords = fields
      .filter(f => f.isOccupied())
      .map(f => f.position);
    }

    const allCoords = fields.map(f => f.position);
    return this.createVectorDistanceMap(from, excludedCoords, allCoords);
  }


  public createVectorDistanceMap(
    from: ICubeCoordinates,
    occupiedCoords: ICubeCoordinates[],
    allCoords: ICubeCoordinates[],
  ): Map<string, PathSegment> {
    const vectorAndDistanceEntry: IPathSegment = {
      position: from,
      rotation: 0,
      distanceToOrigin: 0,
      isOrigin: true
    }
    const map = new Map([[CubeCoordsHelper.createKeyFromCoordinates(from), vectorAndDistanceEntry]]);
    this._collectVectorAndDistanceEntries([vectorAndDistanceEntry], occupiedCoords, allCoords, map);
    this._optimizeVectors(map);
    return this._initializeVectorMap(map);
  }


  private _optimizeVectors(vectorMap: Map<string, IPathSegment>): void {
    for (let entry of vectorMap.values()) {
      const adjacentCoords = CubeCoordsHelper.getCircleOfCoordinates(entry.position, 1);
      let vectorTarget = vectorMap.get(
        CubeCoordsHelper.createKeyFromCoordinates(
          CubeCoordsHelper.getAdjancedCoordsBySide(entry.position, entry.rotation)));
      
      if (!vectorTarget) {
        continue;
      }
      
      for (let position of adjacentCoords) {
        const adjancedEntry = vectorMap.get(CubeCoordsHelper.createKeyFromCoordinates(position));
        if (adjancedEntry?.distanceToOrigin < vectorTarget?.distanceToOrigin) {
          vectorTarget = adjancedEntry;
        }
      }
      entry.rotation = CubeCoordsHelper.getAdjancedSide(entry.position, vectorTarget.position);
    }
  }


  private _collectVectorAndDistanceEntries(
    from: IPathSegment[],
    occupiedCoords: ICubeCoordinates[],
    allCoords: ICubeCoordinates[],
    map: Map<string, IPathSegment>,
  ): void {
    const tempMap: Map<string, IPathSegment> = new Map();

    for (let fromEntry of from) {
      const adjacentCoordsToCreate = CubeCoordsHelper.getCircleOfCoordinates(fromEntry.position, 1)
        .filter(c => {
          return !occupiedCoords.find(oc => CubeCoordsHelper.isCoordsEqual(c, oc)) &&
            !map.has(CubeCoordsHelper.createKeyFromCoordinates(c)) &&
            allCoords.find(ac => CubeCoordsHelper.isCoordsEqual(c, ac))
        });
      
      for (let position of adjacentCoordsToCreate) {
        const entry = {
          position: position,
          rotation: CubeCoordsHelper.getAdjancedSide(position, fromEntry.position),
          distanceToOrigin: fromEntry.distanceToOrigin + 1
        }
        tempMap.set(CubeCoordsHelper.createKeyFromCoordinates(entry.position), entry);
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
      const targetCoords = CubeCoordsHelper.getAdjancedCoordsBySide(segment.position, segment.rotation);
      const targetSegment = map.get(CubeCoordsHelper.createKeyFromCoordinates(targetCoords)) as PathSegment;
      segment.successorSegment = targetSegment;
    }

    return map as Map<string, PathSegment>;
  }

}