import { Field } from "../../../entities/field";
import { IFieldAttributes } from "../../field-attributes/base/field-attributes.interface";

export type IBoardGridCoordinates = unknown;

export interface ICoordinateSystem {
  createFieldGraph(c: IBoardGridCoordinates[], fieldAttributes: IFieldAttributes): Array<Field>;
  getField(c: IBoardGridCoordinates, graph: Array<Field>);
  getFieldBoundaryNeighbours(f: Field, pf: Field, graph: Array<Field>): Array<Field>;
  getStartingField(exclude: Field[], graph: Array<Field>)
}