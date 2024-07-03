import { Field } from "../../../entities/field";
import { IFieldAttributes, IFieldEdge } from "../base/field-attributes.interface";
import { HEXAGON_INNER_ANGLE } from "./hexagon.constants";

export class HexagonField implements IFieldAttributes {
  
  constructor(
    public radius: number
  ) { }
  
  public calculate(f: Field): Field {
    throw new Error("Method not implemented.");
  }

  public extractOuterEdges(fs: Field[]): IFieldEdge[] {
    throw new Error("Method not implemented.");
  }

  private _createHexagonPoints(cx: number, cy: number) {
    const d = [];
    for (let i = 0; i < 6; i++) {
      let x = cx + (this.radius * Math.cos(HEXAGON_INNER_ANGLE * (i)));
      let y = cy + (this.radius * Math.sin(HEXAGON_INNER_ANGLE * (i)));
      d.push({ x: x, y: y });
    }
    return d;
  }
}