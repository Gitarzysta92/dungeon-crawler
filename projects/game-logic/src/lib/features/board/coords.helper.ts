import { HexSide } from "./board.constants";
import { IBoardCoordinates, IBoardObjectRotation } from "./board.interface";

export class CoordsHelper {

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


  static getConeOfCoordinates(from: IBoardCoordinates, side: HexSide, distance: number): IBoardCoordinates[] {
    const angles = [
      this.getAdjencedTopCoords,
      this.getAdjencedTopRightCoords,
      this.getAdjencedBottomRightCoords,
      this.getAdjencedBottomCoords,
      this.getAdjencedBottomLeftCoords,
      this.getAdjencedTopLeftCoords
    ];

    return [];
  }


  static getCircleOfCoordinates(cc: IBoardCoordinates, radius: number): IBoardCoordinates[] {
    const coords: IBoardCoordinates[] = [{ r: cc.r - radius, q: cc.q, s: cc.s + radius }];
    let n = 6 * radius;
    let i = radius;

    const angles = [
      this.getAdjencedTopCoords,
      this.getAdjencedTopRightCoords,
      this.getAdjencedBottomRightCoords,
      this.getAdjencedBottomCoords,
      this.getAdjencedBottomLeftCoords,
      this.getAdjencedTopLeftCoords
    ];

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

  static getLineOfCoordinates(from: IBoardCoordinates, side: HexSide, distance: number): IBoardCoordinates[] {
    let method;

    switch (side) {
      case HexSide.Top:
        method = this.getAdjencedTopCoords
        break;
      case HexSide.TopRight:
        method = this.getAdjencedTopRightCoords
        break;
      case HexSide.TopLeft:
        method = this.getAdjencedTopLeftCoords
        break;
      case HexSide.Bottom:
        method = this.getAdjencedBottomCoords
        break;
      case HexSide.BottomLeft:
        method = this.getAdjencedBottomLeftCoords
        break;
      case HexSide.BottomRight:
        method = this.getAdjencedBottomRightCoords
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

  static getAdjencedTopCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r, q: cc.q + 1, s: cc.s - 1 }
  }

  static getAdjencedTopRightCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r + 1, q: cc.q, s: cc.s - 1 }
  }

  static getAdjencedTopLeftCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r - 1, q: cc.q + 1, s: cc.s }
  }

  static getAdjencedBottomCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r, q: cc.q - 1, s: cc.s + 1 }
  }

  static getAdjencedBottomLeftCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r - 1, q: cc.q, s: cc.s + 1 }
  }

  static getAdjencedBottomRightCoords(cc: IBoardCoordinates): IBoardCoordinates {
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

  static mapHexSideToBoardObjectRotation(rotation: IBoardObjectRotation): HexSide {
    let result = HexSide.Top;
    
    switch (rotation) {
      case 0:
        result = HexSide.Top;
        break;

      case 1:
        result = HexSide.TopRight
        break;
      
      case 2:
        result = HexSide.BottomRight
        break;
      
      case 3:
        result = HexSide.Bottom
        break;
    
      case 4:
        result = HexSide.BottomLeft
        break;
    
      case 5:
        result = HexSide.TopLeft
        break;
    }
    return result;
  }
  

}