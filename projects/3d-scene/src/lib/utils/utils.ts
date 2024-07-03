import { Box3, Float32BufferAttribute, ShapeGeometry, Vector2, Vector3 } from "three";
import { IRawVector2 } from "../extensions/types/raw-vector2";


export function getNormalizedMouseCoordinates(coords: { x: number, y: number }): Vector2 {
  return new Vector2(
    (coords.x / window.innerWidth) * 2 - 1,
    -(coords.y / window.innerHeight) * 2 + 1
  );
}

export function getNormalizedMouseCoordinates2(x: number, y: number, v: Vector2): Vector2 {
  v.x = (x / window.innerWidth) * 2 - 1, 
  v.y = -(y / window.innerHeight) * 2 + 1
  return v;
}


export function mapCoordsTo2d(coords: Vector3): Vector2 {
  return new Vector2(coords.x, coords.y); 
}

export function mapCoordsTo3d(coords: Vector2): Vector3 {
  return new Vector3(coords.x, coords.y, 0);
}


export function scaleVectorPath(vectorPath: IRawVector2[], factor: number = 0.2): IRawVector2[] {
  const innerItems: IRawVector2[] = [];
  for (let item of vectorPath) {
    const index = vectorPath.indexOf(item);
    let prev = vectorPath[index - 1];
    let next = vectorPath[index + 1];
    if (!prev) {
      prev = vectorPath[vectorPath.length - 1];
    }
    if (!next) {
      next = vectorPath[0];
    }
    const q = Math.atan2(next.y - prev.y, next.x - prev.x) + Math.PI * 0.5;
    let x = item.x + Math.cos(q) * factor;
    let y = item.y + Math.sin(q) * factor;
    innerItems.push({x,y})
  }
  return innerItems;
}



export function compareFloatVector(
  a: IRawVector2,
  b: IRawVector2,
  precision: number = 0.1
): boolean {
  return compareFloat(a.x, b.x, precision) && compareFloat(a.y, b.y, precision);
}

export function compareFloat(
  a: number,
  b: number,
  precision = 0.1
): boolean {
  return Math.abs(a - b) <= precision
}

export function recalculateUv(geometry: ShapeGeometry & any) {
  let pos = geometry.attributes.position;
  let b3 = new Box3().setFromBufferAttribute(pos);
  let b3size = new Vector3();
  b3.getSize(b3size);
  let uv = [];
  for(let i = 0; i < pos.count; i++){
    let x = pos.getX(i);
    let y = pos.getY(i);
    let u = (x - b3.min.x) / b3size.x;
    let v = (y - b3.min.y) / b3size.y;
    uv.push(u, v);
  }
  geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
}