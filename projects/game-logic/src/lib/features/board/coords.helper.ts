import { IBoardCoordinates, IBoardObjectRotation } from "./board.interface";

export type Side = 0 | 1 | 2 | 3 | 4 | 5;


export class CoordsHelper {

  static readonly angles = [
    CoordsHelper.getAdjancedTopCoords,
    CoordsHelper.getAdjancedTopRightCoords,
    CoordsHelper.getAdjancedBottomRightCoords,
    CoordsHelper.getAdjancedBottomCoords,
    CoordsHelper.getAdjancedBottomLeftCoords,
    CoordsHelper.getAdjancedTopLeftCoords
  ];

  static isCoordsEqual(position: IBoardCoordinates, coords: IBoardCoordinates): boolean {
    return Object.keys(position)
      .every(k => position[k as keyof typeof position] === coords[k as keyof typeof position])
  }

  static createKeyFromCoordinates(bc: IBoardCoordinates): string {
    return `${bc.r}${bc.q}${bc.s}`
  }

  static createHexagonalBoardCoords(diameter: number): IBoardCoordinates[] {
    const radius = (diameter - 1) / 2;

    const coords = [];
    let offset = 0;
    for (let r = -radius; r <= radius; r++) {
      for (let q = offset; q < diameter - Math.abs(r) - Math.abs(offset); q++) {
        coords.push({ r, q, s: (r + q) * -1 })
      }
      if (offset + radius !== 0)
        offset--
    }
    return coords;
  }

  static getConeOfCoordinates(from: IBoardCoordinates, side: Side, distance: number): IBoardCoordinates[] {
    const angles = CoordsHelper.angles;
    const coords: IBoardCoordinates[] = [];
    let n = 1;
    while (n <= distance) {
      const c = angles[side](from);
      coords.push(c);
      let lc;
      let rc;
      let m = 1;
      while (m <= n) { 
        lc = angles[side - 1](lc ?? from);
        coords.push(lc);
        rc = angles[side + 1](rc ?? from);
        coords.push(rc);
      }
      n++;
    }
    
    return coords;
  }

  static getCircleOfCoordinates(cc: IBoardCoordinates, radius: number): IBoardCoordinates[] {
    const coords: IBoardCoordinates[] = [{ r: cc.r - radius, q: cc.q, s: cc.s + radius }];
    let n = 6 * radius;
    let i = radius;

    const angles = [...CoordsHelper.angles];
    while (n !== 0) {
      if (i === 0) {
        angles.shift();
        i = radius;
      } 
      coords.unshift(angles[0](coords[0]));
      n--;
      i--;
    }
    coords.pop();
    return coords;
  }

  static getLineOfCoordinates(from: IBoardCoordinates, side: Side, distance: number): IBoardCoordinates[] {
    let method;

    switch (side) {
      case 0:
        method = this.getAdjancedTopCoords
        break;
      case 1:
        method = this.getAdjancedTopRightCoords
        break;
      case 2:
        method = this.getAdjancedTopLeftCoords
        break;
      case 3:
        method = this.getAdjancedBottomCoords
        break;
      case 4:
        method = this.getAdjancedBottomLeftCoords
        break;
      case 5:
        method = this.getAdjancedBottomRightCoords
        break;
    }

    const coords = [];
    let prevCoords = from;
    while (distance > 0) {
      prevCoords = method(prevCoords) 
      coords.push(prevCoords);
      distance--;
    }
    return coords;
  }

  static getAdjancedTopCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r, q: cc.q + 1, s: cc.s - 1 }
  }

  static getAdjancedTopRightCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r + 1, q: cc.q, s: cc.s - 1 }
  }

  static getAdjancedTopLeftCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r - 1, q: cc.q + 1, s: cc.s }
  }

  static getAdjancedBottomCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r, q: cc.q - 1, s: cc.s + 1 }
  }

  static getAdjancedBottomLeftCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r - 1, q: cc.q, s: cc.s + 1 }
  }

  static getAdjancedBottomRightCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r + 1, q: cc.q - 1, s: cc.s }
  }

  static sortCoordsByRows(coords: IBoardCoordinates[]): IBoardCoordinates[][] {
    const cCopy = [...coords];
    const sorted = cCopy.sort((a, b) => a.r - b.r);
  
    let currentRow: number | undefined;
    const coordsInRows: IBoardCoordinates[][] = [];
  
    sorted.forEach(c => {
      if (currentRow !== c.r) {
        coordsInRows[coordsInRows.length - 1]?.sort((a, b) => a.q - b.q)
        coordsInRows.push([]);
        currentRow = c.r;
      }
      coordsInRows[coordsInRows.length - 1].push(c);
    });
  
    return coordsInRows;
  }

  static mirrorCoordsBy(key: string, coords: IBoardCoordinates[]): IBoardCoordinates[] {
    return coords.map(c => {
      const cCopy = Object.assign({}, c);
      for (let cKey in cCopy) {
        if (cKey === key)
          continue;
        (cCopy as any)[cKey] *= -1;
      }
      return cCopy;
    })
  }

  static getDistanceBetweenBoardCoordinates(a: IBoardCoordinates, b: IBoardCoordinates): number {
    const vec = { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
    return (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(vec.s)) / 2;
  }

  static getRotationTowardsGivenCoordinates(
    ref: IBoardCoordinates,
    target: IBoardCoordinates
  ): IBoardObjectRotation {
    return 0;
  }
  
  static getAdjancedSide(
    from: IBoardCoordinates,
    to: IBoardCoordinates
  ): Side {
    const angles = CoordsHelper.angles;
    const angle = angles.find(a => CoordsHelper.isCoordsEqual(a(from), to));
    if (!angle) {
      throw new Error("Given coords are not adjanced");
    }
    return angles.indexOf(angle) as Side;
  }

  static getAdjancedCoordsBySide(from: IBoardCoordinates, index: number): IBoardCoordinates {
    return CoordsHelper.angles[index](from);
  }

}