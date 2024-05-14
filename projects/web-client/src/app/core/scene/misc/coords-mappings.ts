import { IRawVector3 } from "@3d-scene/lib/extensions/types/raw-vector3";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";

export function mapCubeCoordsTo3dCoords(c: ICubeCoordinates): IRawVector3 {
  return {
    x: c.q + (c.r - (c.r&1)) / 2,
    y: 0,
    z: c.r
  }
}
 
export function map2dCoordsToCubeCoords(c: { x: number, y: number }): ICubeCoordinates {
  const q = c.x - (c.y - (c.y & 1)) / 2;
  const r = c.y;

  return {
    q, r, s: -q -r  
  }
}
