import { IBoardCoordinates, IBoardObjectRotation } from "../board.interface";
import { IPathSegment } from "../pathfinding/pathfinding.interface";
import { RotationHelper } from "./rotation.helper";

export class CoordsHelper {
 
  public static readonly angles = [
    CoordsHelper.getAdjancedTopCoords,
    CoordsHelper.getAdjancedTopRightCoords,
    CoordsHelper.getAdjancedBottomRightCoords,
    CoordsHelper.getAdjancedBottomCoords,
    CoordsHelper.getAdjancedBottomLeftCoords,
    CoordsHelper.getAdjancedTopLeftCoords
  ];


  public static isCoordsEqual(position: IBoardCoordinates, coords: IBoardCoordinates): boolean {
    return Object.keys(position)
      .every(k => position[k as keyof typeof position] === coords[k as keyof typeof position])
  }


  public static createKeyFromCoordinates(bc: IBoardCoordinates): `${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}` {
    return `${bc.r}${bc.q}${bc.s}`
  }


  public static createHexagonalBoardCoords(diameter: number): IBoardCoordinates[] {
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


  public static getConeOfCoordinates(
    from: IBoardCoordinates,
    side: IBoardObjectRotation,
    distance: number,
    validator?: (coords: IBoardCoordinates) => boolean
  ): IBoardCoordinates[] {
    RotationHelper.validateSideValue(side);

    const initialCoords = CoordsHelper.angles[side](from);
    const resultCoords = new Map<string, IBoardCoordinates>([
      [CoordsHelper.createKeyFromCoordinates(initialCoords), initialCoords]
    ]);
    let sourceCoords: IBoardCoordinates[] = [CoordsHelper.angles[side](from)];
    let n = 1;
    while (n <= distance) {
      let rangeCoords = sourceCoords.flatMap(sc => CoordsHelper.getSemiCircleOfCoordinates(sc, side));
      sourceCoords = [];
      for (let c of rangeCoords) {
        const key = CoordsHelper.createKeyFromCoordinates(c);
        if (resultCoords.has(key)) {
          continue;
        }
        resultCoords.set(CoordsHelper.createKeyFromCoordinates(c), c);
        sourceCoords.push(c);
      }
      n++;
    }
    return Array.from(resultCoords.values()).filter(c => !validator || validator(c));
  }

  public static getSemiCircleOfCoordinates(
    from: IBoardCoordinates,
    side: IBoardObjectRotation,
    validator?: (coords: IBoardCoordinates) => boolean
  ): IBoardCoordinates[] {
    return [
      CoordsHelper.angles[RotationHelper.calculateRotation(-1, side)],
      CoordsHelper.angles[RotationHelper.calculateRotation(1, side)],
      CoordsHelper.angles[side]
    ].map(m => m(from)).filter(c => !validator || validator(c));      
  }


  public static getCircleOfCoordinates(
    cc: IBoardCoordinates,
    radius: number,
    validator?: (coords: IBoardCoordinates) => boolean
  ): IBoardCoordinates[] {
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


  public static getLineOfCoordinates(
    from: IBoardCoordinates,
    side: IBoardObjectRotation,
    distance: number,
    validator?: (coords: IBoardCoordinates) => boolean
  ): IBoardCoordinates[] {
    RotationHelper.validateSideValue(side);
    const method = CoordsHelper.angles[side];

    const coords = [];
    let prevCoords = from;
    while (distance > 0) {
      prevCoords = method(prevCoords);
      if (validator && !validator(prevCoords)) {
        break;
      } 
      coords.push(prevCoords);
      distance--;
    }
    return coords;
  }


  public static getAdjancedTopCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r, q: cc.q + 1, s: cc.s - 1 }
  }


  public static getAdjancedTopRightCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r + 1, q: cc.q, s: cc.s - 1 }
  }


  public static getAdjancedTopLeftCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r - 1, q: cc.q + 1, s: cc.s }
  }


  public static getAdjancedBottomCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r, q: cc.q - 1, s: cc.s + 1 }
  }


  public static getAdjancedBottomLeftCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r - 1, q: cc.q, s: cc.s + 1 }
  }


  public static getAdjancedBottomRightCoords(cc: IBoardCoordinates): IBoardCoordinates {
    return { r: cc.r + 1, q: cc.q - 1, s: cc.s }
  }


  public static sortCoordsByRows(coords: IBoardCoordinates[]): IBoardCoordinates[][] {
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


  public static mirrorCoordsBy(key: string, coords: IBoardCoordinates[]): IBoardCoordinates[] {
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


  public static getDistanceBetweenBoardCoordinates(a: IBoardCoordinates, b: IBoardCoordinates): number {
    const vec = { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
    return (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(vec.s)) / 2;
  }


  public static getRotationTowardsGivenCoordinates(
    ref: IBoardCoordinates,
    target: IBoardCoordinates
  ): IBoardObjectRotation {
    return 0;
  }
  

  public static getAdjancedSide(
    from: IBoardCoordinates,
    to: IBoardCoordinates
  ): IBoardObjectRotation {
    const angles = CoordsHelper.angles;
    const angle = angles.find(a => CoordsHelper.isCoordsEqual(a(from), to));
    if (!angle) {
      throw new Error("Given coords are not adjanced");
    }
    return angles.indexOf(angle) as IBoardObjectRotation;
  }

  static areAdjanced(from: IBoardCoordinates, to: IBoardCoordinates): boolean {
    return CoordsHelper.getCircleOfCoordinates(from, 1).some(c => CoordsHelper.isCoordsEqual(c, to));
  }
 


  public static getAdjancedSides(
    from: IBoardCoordinates,
    to: IBoardCoordinates
  ): IBoardObjectRotation[] {
    const angles = CoordsHelper.angles;
    return angles
      .filter(a => CoordsHelper.isCoordsEqual(a(from), to))
      .map(a => angles.indexOf(a)) as IBoardObjectRotation[]
  }


  public static getAdjancedCoordsBySide(from: IBoardCoordinates, index: number): IBoardCoordinates {
    return CoordsHelper.angles[index](from);
  }
}