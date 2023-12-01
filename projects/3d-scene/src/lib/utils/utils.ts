import { Vector2, Vector3 } from "three";


export type Bitmap = number[][];
export type Coords2 = { x: number, y: number, source?: Coords2 };

export function generateBitmap(decimals: number[]): Bitmap {
  return decimals.map(x => 
    convertToBinaryWithComplement(x).split('').map(y => parseInt(y)));
}

export function convertToBinaryWithComplement(n: number, complement: number = 0): string {
  return convertToBinary(n).padStart(complement, '0');
}

export function convertToDecimal(binary: string): number {
  return parseInt(binary, 10);
}

export function convertToBinary(n: number): string {
  return ((n) >>> 0).toString(2)
}

export function generate2dCoordinates(bitmap: Bitmap): Coords2[] {
  const matrix: Coords2[] = [];
  bitmap.forEach((bitset, x) => 
    bitset.forEach((bit, y) => {
      if (!!bit)
        matrix.push({ x, y });
    })
  );
  return matrix;
};

export function translateMatrix(matrix: Coords2[], x: number, y: number): Coords2[] {
  return matrix.map(v => ({ x: v.x + x, y: v.y + y, source: v }))
}



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