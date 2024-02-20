import { IBoardCoordinates, IBoardObjectRotation } from "../board.interface";

export interface IPath {
  segments: IPathSegment[];
  origin: IPathSegment;
}

export interface IPathSegment {
  coords: IBoardCoordinates;
  vector: IBoardObjectRotation;
  distanceToOrigin: number;
  isOrigin?: boolean;
}
