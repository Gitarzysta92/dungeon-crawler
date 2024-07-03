import { Field } from "../../../entities/field";


export interface IPathfinding {
  findPath(from: Field, to: Field, exclude: Field[], graph: Field[]): IPath | undefined;
  findShortestPath(from: Field, to: Field, exclude: Field[], graph: Field[]): IPath | undefined;
  getDistanceGraph(to: Field, exclude: Field[], fields: Field[]): unknown;
}


export interface IPath {
  segments: IPathSegment[];
  origin: IPathSegment;
  destination: IPathSegment;
}

export interface IPathSegment {
  distanceToOrigin: number;
  isOrigin?: boolean;
  isDestination?: boolean;
}
