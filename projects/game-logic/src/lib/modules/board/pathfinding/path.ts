import { IBoardObjectRotation, ICubeCoordinates } from "../board.interface";
import { IPath, IPathSegment } from "./pathfinding.interface";



export class Path implements IPath {
  segments: IPathSegment[];
  origin: IPathSegment;
  destination: IPathSegment;
  constructor(data: PathSegment[]) {}
}



export class PathSegment implements IPathSegment {
  coords: ICubeCoordinates;
  rotation: IBoardObjectRotation;
  distanceToOrigin: number;
  isOrigin?: boolean;
  successorSegment: PathSegment;
  predcessorSegment: PathSegment;

  get predcessorSegments(): PathSegment[] {
    const predcessors = [];
    for (let segment of this._map.values()) {
      if (segment.successorSegment === this) {
        predcessors.push(segment);
      }
    }
    return predcessors;
  };

  position: ICubeCoordinates;

  constructor(
    data: IPathSegment,
    private readonly _map: Map<string, PathSegment>
  ) {
    Object.assign(this, data)
  }
}