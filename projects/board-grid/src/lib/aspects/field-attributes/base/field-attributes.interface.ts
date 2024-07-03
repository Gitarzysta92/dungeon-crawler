import { Field } from "../../../entities/field";

export interface IFieldEdge {

}

export interface IFieldAttributes {
  calculate(f: Field): Field;
  extractOuterEdges(fs: Field[]): IFieldEdge[]
}