import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { HEXAGON_INNER_ANGLE } from "@board-grid/lib/aspects/field-attributes/hexagon/hexagon.constants";
import { HEXAGON_RADIUS } from "../constants/hexagon.constants";

export class HexagonHelper {

  public static createHexagonPoints(cx: number, cy: number, radius: number) {
    const d = [];
    for (let i = 0; i < 6; i++) {
      let x = cx + (radius * Math.cos(HEXAGON_INNER_ANGLE * (i)));
      let y = cy + (radius * Math.sin(HEXAGON_INNER_ANGLE * (i)));
      d.push({ x: x, y: y });
    }
    return d;
  }

  public static calculatePositionInGrid(v: IRawVector3, radius: number): IRawVector3 {
    const offset = HEXAGON_RADIUS / 2;
    const isEven = (Math.abs(v.z) % 2) === 0;
    return {
      x: (v.x + (isEven ? 0 : offset)) * 1.75,
      y: 0,
      z: v.z * 1.51
    }
  }
}