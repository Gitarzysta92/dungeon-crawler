import { Intersection, Vector2, Vector3 } from "three";
import { getNormalizedMouseCoordinates2 as normalizedMouseCoordinates2 } from "../utils/utils";

export type CoordsProvider = (x: number, y: number) => { coords: Vector3 | false, targetObject: any }


export function intersectMouseCoordsOnScenePlane(
  v: Vector3,
  intersect: (v: Vector2) => Intersection[]
): CoordsProvider {
  const mc = new Vector2();
  const r: any = {};
  return (x: number, y: number) => {
    const found = intersect(normalizedMouseCoordinates2(x, y, mc));
    if (found.length === 0) return false;
    let plane = found[0];
    v.x = plane.point.x;
    v.z = plane.point.z;
    r.coords = v;
    r.targetObject = plane;
    return r; 
  }
}

export function projectMouseCoordsOnCameraFace(v: Vector3): CoordsProvider {
  const mc = new Vector2();
  const r: any = {};
  v.z = null!;
  return (x: number, y: number) => {
    normalizedMouseCoordinates2(x, y, mc);
    v.x = mc.x * 5;
    v.y = mc.y * 5;
    r.v = v;
    return r;
  }
}

export function intersectMouseCoordsOnGuiPlane(
  v: Vector3,
  intersect: (v: Vector2) => Intersection[]
): CoordsProvider {
  const mc = new Vector2();
  const r: any = {};
  return (x: number, y: number) => {
    const found = intersect(normalizedMouseCoordinates2(x, y, mc));
    if (found.length === 0) return false;
    let plane = found[0];
    v.x = plane.point.x;
    v.y = plane.point.y;
    v.z = plane.point.z;
    r.coords = v;
    r.targetObject = plane.object;
    return r; 
  }
}