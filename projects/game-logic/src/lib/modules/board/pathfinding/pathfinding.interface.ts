import { IBoardAssignment } from "../entities/board-object/board-object.interface";

export interface IPath {
  segments: IPathSegment[];
  origin: IPathSegment;
  destination: IPathSegment;
}

export interface IPathSegment extends IBoardAssignment {
  distanceToOrigin: number;
  isOrigin?: boolean;
  isDestination?: boolean;
}
