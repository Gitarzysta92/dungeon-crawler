import { IBoardGridCoordinates, ICoordinateSystem } from "../aspects/coordinate-system/base/coordinate-system";
import { IFieldAttributes, IFieldEdge } from "../aspects/field-attributes/base/field-attributes.interface";
import { IPath, IPathfinding } from "../aspects/pathfinding/base/pathfinding.interface";
import { Field } from "./field";

export class BoardGrid {

  private _fieldGraph: Array<Field> = [];

  constructor(
    public rows: number,
    public columns: number,
    private _coordinateSystem: ICoordinateSystem,
    private _pathfinding: IPathfinding,
    private _fieldAttributes: IFieldAttributes
  ) { }
  
  public set(fieldMap: Array<Field>): void {
    this._fieldGraph = fieldMap;
  }

  public setByCoordinates(c: IBoardGridCoordinates[]): void {
    this._fieldGraph = this._coordinateSystem.createFieldGraph(c, this._fieldAttributes);
  }


  public getField(c: IBoardGridCoordinates): Field {
    const field = this._coordinateSystem.getField(c, this._fieldGraph);
    return this._fieldAttributes.calculate(field);
  }


  public getFields(): Field[] {
    return this._fieldGraph.map(f => this._fieldAttributes.calculate(f))
  }


  public findPath(from: Field, to: Field, exclude?: Field[]): IPath {
    return this._pathfinding.findPath(from, to, exclude, this._fieldGraph);
  }


  public findShortestPath(from: Field, to: Field, exclude?: Field[]): IPath {
    return this._pathfinding.findShortestPath(from, to, exclude, this._fieldGraph);
  }


  public getDistanceGraph(to: Field, exclude: Field[] = []): unknown {
    return this._pathfinding.getDistanceGraph(to, exclude, this._fieldGraph);
  }


  public getBoundaryFieldsClockwise(exclude?: Field[]): Field[] {
    const startingField = this._coordinateSystem.getStartingField(exclude, this._fieldGraph);
    const fieldMap = new Map();
    this._aggregateBoundaryFieldsClockwise(startingField, fieldMap)
    return Array.from(fieldMap.values())
  }


  public getOuterEdgesOfBoundaryFieldsClockwise(exclude?: Field[]): IFieldEdge[] {
    const fields = this.getBoundaryFieldsClockwise(exclude);
    return this._fieldAttributes.extractOuterEdges(fields);
  }


  public setCoordinateSystem(c: ICoordinateSystem) {
    this._coordinateSystem = c;
  }


  public setPathfinding(p: IPathfinding) {
    this._pathfinding = p;
  }


  public setFieldShape(s: IFieldAttributes) {
    this._fieldAttributes = s;
  }

  private _aggregateBoundaryFieldsClockwise(field: Field, map: Map<Field, Field>, prevNeighbour?: Field) {
    const boundaryNeighbours = this._coordinateSystem.getFieldBoundaryNeighbours(field, prevNeighbour, this._fieldGraph);
    if (prevNeighbour && !boundaryNeighbours.includes(prevNeighbour)) {
      throw new Error("Cannot find prev")
    }

    field.isVisited = true;
    for (let n of boundaryNeighbours) {
      map.set(n, n);
    }

    const n = boundaryNeighbours.find(n => !n.isVisited);
    if (!!n) {
      this._aggregateBoundaryFieldsClockwise(n, map, field);
    }
  }

}


  // // reorder
  // while (outerIndexes[0] !== prevNIndex && prevNIndex >= 0) {
  //   outerIndexes.push(outerIndexes.shift());
  // }