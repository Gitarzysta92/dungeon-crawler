import { Field } from "../../../entities/field";
import { DistanceDirectedGraph, Path, PathSegment } from "../base/path";
import { IPath, IPathfinding } from "../base/pathfinding.interface";

export class AStarPathfinding implements IPathfinding {

  public findPath(from: Field, to: Field, exclude: Field[], fields: Field[]): IPath {
    const graph = this._createDistanceDirectedGraph(to, exclude, fields);
    const origin = graph.segments.find(s => s.isEqual(from));
    const segments = this._aggregatePathSegments(origin)
    const destination = segments.find(s => s.isEqual(to))
    if (!destination) {
      return;
    }
    return new Path(segments, origin, destination);
  }


  public findShortestPath(from: Field, to: Field, exclude: Field[], fields: Field[]): Path | undefined {
    const graph = this._createDistanceDirectedGraph(to, exclude, fields);
    this._optimizeDistanceDirectedGraph(graph);
    const origin = graph.segments.find(s => s.isEqual(from));
    const segments = this._aggregatePathSegments(origin)
    const destination = segments.find(s => s.isEqual(to))
    if (!destination) {
      return;
    }
    return new Path(segments, origin, destination);
  }


  public getDistanceGraph(to: Field, exclude: Field[], fields: Field[]): DistanceDirectedGraph {
    const graph = this._createDistanceDirectedGraph(to, exclude, fields);
    this._optimizeDistanceDirectedGraph(graph);
    return graph;
  }


  private _aggregatePathSegments(from: PathSegment): PathSegment[] {
    if (from.isOrigin) {
      return [];
    }
    return [...this._aggregatePathSegments(from.successorSegment), from]
  }

  private _createDistanceDirectedGraph(
    origin: Field,
    excluded: Field[],
    fields: Field[],
  ): DistanceDirectedGraph {
    const segments: PathSegment[] = [];
    for (let field of fields) {
      const segment = new PathSegment(field, field.neighbours as PathSegment[]);
      segments.push(segment)
    }

    for (let segment of segments) {
      segment.neighbours = segment.neighbours.map(n => segments.find(s => s.isEqual(n)))
    }

    const originSegment = segments.find(s => s.isEqual(origin));
    originSegment.isOrigin = true;
    originSegment.distanceToOrigin = 0;

    this._updateSegmentsForDistanceDirectedGraph(originSegment, excluded)

    return new DistanceDirectedGraph(segments, originSegment)
  }


  private _updateSegmentsForDistanceDirectedGraph(
    origin: PathSegment,
    visited: Field[],
  ): void {
    for (let segment of origin.neighbours) {
      if (visited.some(v => v.isEqual(segment))) {
        continue;
      }
      segment.distanceToOrigin = origin.distanceToOrigin + 1;
      segment.successorSegment = origin;
      visited.push(segment);
      this._updateSegmentsForDistanceDirectedGraph(segment, visited);
    } 
  }


  private _optimizeDistanceDirectedGraph(graph: DistanceDirectedGraph): void {
    for (let segment of graph.segments) {
      for (let n of segment.neighbours) {
        if (n.distanceToOrigin < segment.successorSegment.distanceToOrigin) {
          segment.successorSegment = n;
        }
      }
    }
  }

}