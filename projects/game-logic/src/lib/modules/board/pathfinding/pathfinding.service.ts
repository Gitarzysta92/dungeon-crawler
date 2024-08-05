import { ICubeCoordinates } from "../board.interface";
import { CubeCoordsHelper } from "../helpers/coords.helper";
import { RotationHelper } from "../helpers/rotation.helper";
import { PathSegment } from "./path";
import { IPath, IPathSegment } from "./pathfinding.interface";

export class PathfindingService {
  
  constructor() { }
  
  public establishMovementPath(target: ICubeCoordinates, allowedSegments: IPathSegment[]): IPath {
    let origin = allowedSegments.find(s => s.isOrigin);
    if (!origin) {
      throw new Error("Cannot find origin among provide segments");
    }
    let destination = allowedSegments.find(s => CubeCoordsHelper.isCoordsEqual(s.position, target));
    if (!destination) {
      throw new Error("Cannot find destination among provide segments");
    }
    const map = new Map();
    map.set(CubeCoordsHelper.createKeyFromCoordinates(origin.position), origin);
    map.set(CubeCoordsHelper.createKeyFromCoordinates(destination.position), destination);
    for (let segment of allowedSegments) {
      map.set(CubeCoordsHelper.createKeyFromCoordinates(segment.position), segment)
    }
    const movementSegments = this.findShortestPathBetweenCoordinates(destination.position, origin.position, map)
      .reverse().map(s => Object.assign({ ...s }, { rotation: RotationHelper.reverse(s.rotation) }));

    origin = movementSegments.find(s => s.isOrigin);
    if (!origin) {
      throw new Error("Cannot find origin among movement path segments");
    }
    destination = movementSegments.find(s => CubeCoordsHelper.isCoordsEqual(s.position, target));
    if (!destination) {
      throw new Error("Cannot find destination among movement path segments");
    }
    destination.isDestination = true;
    return { segments: movementSegments, origin: origin, destination: destination }
  }


  static getClosestCoords(
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
    coords: ICubeCoordinates[],
    excludedCoords: ICubeCoordinates[]
  ): IPath | undefined {
    const map = this.createVectorDistanceMap(from, excludedCoords, coords);
    const segments = this.findShortestPathBetweenCoordinates(to, from, map);
    if (segments.length <= 0) {
      return;
    }

    const destination = segments.find(s => CubeCoordsHelper.isCoordsEqual(s.position, to))
    destination.isDestination = true;
    return {
      segments: segments.reverse(),
      origin: segments.find(s => s.isOrigin),
      destination: destination
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
      if (targetSegment) {
        targetSegment.predcessorSegment = segment;
      }
    }

    return map as Map<string, PathSegment>;
  }

}