import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { IBoardCoordinates } from "@game-logic/lib/modules/board/board.interface";

export function mapHexagonalCoordsTo3dCoords(c: IBoardCoordinates): IRawVector3 {
  return {
    x: c.q + (c.r) / 2,
    y: 0,
    z: c.r
  }
}
