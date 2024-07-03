import { Field } from "../../../entities/field";


export class DistanceDirectedGraph {
  constructor(
    public segments: PathSegment[],
    public origin: PathSegment,
  ) {}
}


export class Path extends DistanceDirectedGraph {
  constructor(
    public segments: PathSegment[],
    public origin: PathSegment,
    public destination: PathSegment,
  ) {
    super(segments, origin)
  }
}

export class PathSegment extends Field {
  public coordinates: unknown;
  public distanceToOrigin: number | null;
  public isOrigin: boolean = false;
  public successorSegment: PathSegment | null;
  constructor(
    public field: Field,
    public neighbours: PathSegment[]
  ) {
    super(field.index, field.columnIndex, field.rowIndex)
  }
}