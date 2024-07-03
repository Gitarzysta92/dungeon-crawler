import { Field } from "../../../entities/field";
import { IFieldAttributes } from "../../field-attributes/base/field-attributes.interface";
import { ICoordinateSystem } from "../base/coordinate-system";
import { ICartesianCoordinates2D } from "./cartesian-coordinate-system.interface";


export class CartesianField extends Field {
  public coordinates: ICartesianCoordinates2D;
  public neighbours: Field[];
}


export class CartesianCoordinateSystem2D implements ICoordinateSystem {

  constructor() { }

  public createFieldGraph(c: ICartesianCoordinates2D[], fieldAttributes: IFieldAttributes): Array<CartesianField> {
    return [];
  }

  public getField(c: ICartesianCoordinates2D, graph: CartesianField[]): CartesianField {
    return graph.find(f => f.coordinates)
  }

  public getFieldBoundaryNeighbours(f: Field, pf: Field, graph: Field[]): Field[] {
    throw new Error("Method not implemented.");
  }

  public getStartingField(exclude: Field[], graph: Field[]) {
    throw new Error("Method not implemented.");
  }
  
}










// public createCoordinates(bitmask?: number[]): ICartesianCoordinates2D[] {
//   const cs = [];
//   let y = 0;
//   let x = 0;

//   while (y < this.rows) {
//     while (x < this.columns) {
//       if (!bitmask || !!bitmask[x * y]) {
//         cs.push({ x, y })
//       } else {
//         cs.push(null);
//       }
//       x++;
//     }
//     x = 0;
//     y++;
//   }
//   return cs;
// }

// public getBoundaryFieldsClockwise(): CartesianField[] {
  
// }