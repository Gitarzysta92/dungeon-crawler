import { Field } from "../../../entities/field";
import { IFieldAttributes } from "../../field-attributes/base/field-attributes.interface";
import { ICoordinateSystem } from "../base/coordinate-system";
import { ICubeCoordinates } from "./cube-coordinate-system.interface";



export class CubeField extends Field {
  public coordinates: ICubeCoordinates;
  public neighbours: Field[];
}


export class CubeCoordinateSystem2D implements ICoordinateSystem {

  constructor() { }

  public createFieldGraph(c: ICubeCoordinates[], fieldAttributes: IFieldAttributes): Array<CubeField> {
    return [];
  }

  public getField(c: ICubeCoordinates, graph: CubeField[]): CubeField {
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