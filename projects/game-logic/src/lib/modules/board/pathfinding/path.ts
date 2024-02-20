import { IBoardCoordinates, IBoardObjectRotation } from "../board.interface";
import { IPath, IPathSegment } from "./pathfinding.interface";



export class Path implements IPath {
  segments: IPathSegment[];
  origin: IPathSegment;
  constructor(data: PathSegment[]) {

  }
}



export class PathSegment implements IPathSegment {
  coords: IBoardCoordinates;
  vector: IBoardObjectRotation;
  distanceToOrigin: number;
  isOrigin?: boolean;
  successorSegment: PathSegment;

  get predcessorSegments(): PathSegment[] {
    const predcessors = [];
    for (let segment of this._map.values()) {
      if (segment.successorSegment === this) {
        predcessors.push(segment);
      }
    }
    return predcessors;
  };

  constructor(
    data: IPathSegment,
    private readonly _map: Map<string, PathSegment>
  ) {
    Object.assign(this, data)
  }
}