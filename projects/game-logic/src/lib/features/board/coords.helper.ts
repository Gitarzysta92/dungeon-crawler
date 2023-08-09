import { Board } from "./board";
import { TileSide } from "./board.constants";
import { IBoardCoordinates, BoardObjeectRotation } from "./board.interface";

export class CoordsHelper {

  static createKeyFromCoordinates(bc: IBoardCoordinates): string {
    return `${bc.q}${bc.q}${bc.q}`
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


  static getConeOfCoordinates(cc: Board, range: number, r: BoardObjeectRotation = 0): IBoardCoordinates[] {
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

  static getLineOfCoordinates(from: IBoardCoordinates, side: TileSide, board: IBoardCoordinates[]): IBoardCoordinates[] {
    let method;

    switch (side) {
      case TileSide.Top:
        method = this.getAdjencedTopCoords
        break;
      case TileSide.TopRight:
        method = this.getAdjencedTopRightCoords
        break;
      case TileSide.TopLeft:
        method = this.getAdjencedTopLeftCoords
        break;
      case TileSide.Bottom:
        method = this.getAdjencedBottomCoords
        break;
      case TileSide.BottomLeft:
        method = this.getAdjencedBottomLeftCoords
        break;
      case TileSide.BottomRight:
        method = this.getAdjencedBottomRightCoords
        break;
    }

    const coords = [];
    let prevCoords = from;
    while (prevCoords !== null) {
      const coord = method(prevCoords);
      if (board.some(f => f.q === coord.q && f.r === coord.r && f.s === coord.s)) {
        coords.push(coord);
        prevCoords = coord;
      } else {
        prevCoords = null as any;
      }
        
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
  

}