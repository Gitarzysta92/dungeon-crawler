import { IBoardObjectRotation, ICubeCoordinates } from "../board.interface";
import { RotationHelper } from "./rotation.helper";

export class CubeCoordsHelper {
 
  public static readonly angles = [
    CubeCoordsHelper.getAdjancedTopCoords,
    CubeCoordsHelper.getAdjancedTopRightCoords,
    CubeCoordsHelper.getAdjancedBottomRightCoords,
    CubeCoordsHelper.getAdjancedBottomCoords,
    CubeCoordsHelper.getAdjancedBottomLeftCoords,
    CubeCoordsHelper.getAdjancedTopLeftCoords
  ];


  public static isCoordsEqual(position: ICubeCoordinates, coords: ICubeCoordinates): boolean {
    return Object.keys(position)
      .every(k => position[k as keyof typeof position] === coords[k as keyof typeof position])
  }


  public static createKeyFromCoordinates(bc: ICubeCoordinates): `${ICubeCoordinates['r']}${ICubeCoordinates['q']}${ICubeCoordinates['s']}` {
    return `${bc.r}${bc.q}${bc.s}`
  }


  public static createHexagonalBoardCoords(diameter: number): ICubeCoordinates[] {
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
    from: ICubeCoordinates,
    side: IBoardObjectRotation,
    distance: number,
    validator?: (coords: ICubeCoordinates) => boolean
  ): ICubeCoordinates[] {
    RotationHelper.validateSideValue(side);

    const initialCoords = CubeCoordsHelper.angles[side](from);
    const resultCoords = new Map<string, ICubeCoordinates>([
      [CubeCoordsHelper.createKeyFromCoordinates(initialCoords), initialCoords]
    ]);
    let sourceCoords: ICubeCoordinates[] = [CubeCoordsHelper.angles[side](from)];
    let n = 1;
    while (n <= distance) {
      let rangeCoords = sourceCoords.flatMap(sc => CubeCoordsHelper.getSemiCircleOfCoordinates(sc, side));
      sourceCoords = [];
      for (let c of rangeCoords) {
        const key = CubeCoordsHelper.createKeyFromCoordinates(c);
        if (resultCoords.has(key)) {
          continue;
        }
        resultCoords.set(CubeCoordsHelper.createKeyFromCoordinates(c), c);
        sourceCoords.push(c);
      }
      n++;
    }
    return Array.from(resultCoords.values()).filter(c => !validator || validator(c));
  }

  public static getSemiCircleOfCoordinates(
    from: ICubeCoordinates,
    side: IBoardObjectRotation,
    validator?: (coords: ICubeCoordinates) => boolean
  ): ICubeCoordinates[] {
    return [
      CubeCoordsHelper.angles[RotationHelper.calculateRotation(-1, side)],
      CubeCoordsHelper.angles[RotationHelper.calculateRotation(1, side)],
      CubeCoordsHelper.angles[side]
    ].map(m => m(from)).filter(c => !validator || validator(c));      
  }


  public static getCircleOfCoordinates(
    cc: ICubeCoordinates,
    radius: number,
    validator?: (coords: ICubeCoordinates) => boolean
  ): ICubeCoordinates[] {
    const coords: ICubeCoordinates[] = [{ r: cc.r - radius, q: cc.q, s: cc.s + radius }];
    let n = 6 * radius;
    let i = radius;

    const angles = [...CubeCoordsHelper.angles];
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
    from: ICubeCoordinates,
    side: IBoardObjectRotation,
    distance: number,
    validator?: (coords: ICubeCoordinates) => boolean
  ): ICubeCoordinates[] {
    RotationHelper.validateSideValue(side);
    const method = CubeCoordsHelper.angles[side];

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


  public static getAdjancedTopCoords(cc: ICubeCoordinates): ICubeCoordinates {
    return { r: cc.r, q: cc.q + 1, s: cc.s - 1 }
  }


  public static getAdjancedTopRightCoords(cc: ICubeCoordinates): ICubeCoordinates {
    return { r: cc.r + 1, q: cc.q, s: cc.s - 1 }
  }


  public static getAdjancedTopLeftCoords(cc: ICubeCoordinates): ICubeCoordinates {
    return { r: cc.r - 1, q: cc.q + 1, s: cc.s }
  }


  public static getAdjancedBottomCoords(cc: ICubeCoordinates): ICubeCoordinates {
    return { r: cc.r, q: cc.q - 1, s: cc.s + 1 }
  }


  public static getAdjancedBottomLeftCoords(cc: ICubeCoordinates): ICubeCoordinates {
    return { r: cc.r - 1, q: cc.q, s: cc.s + 1 }
  }


  public static getAdjancedBottomRightCoords(cc: ICubeCoordinates): ICubeCoordinates {
    return { r: cc.r + 1, q: cc.q - 1, s: cc.s }
  }


  public static sortCoordsByRows(coords: ICubeCoordinates[]): ICubeCoordinates[][] {
    const cCopy = [...coords];
    const sorted = cCopy.sort((a, b) => a.r - b.r);
  
    let currentRow: number | undefined;
    const coordsInRows: ICubeCoordinates[][] = [];
  
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


  public static mirrorCoordsBy(key: string, coords: ICubeCoordinates[]): ICubeCoordinates[] {
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


  public static getDistanceBetweenBoardCoordinates(a: ICubeCoordinates, b: ICubeCoordinates): number {
    const vec = { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
    return (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(vec.s)) / 2;
  }


  public static getRotationTowardsGivenCoordinates(
    ref: ICubeCoordinates,
    target: ICubeCoordinates
  ): IBoardObjectRotation {
    return 0;
  }
  

  public static getAdjancedSide(
    from: ICubeCoordinates,
    to: ICubeCoordinates
  ): IBoardObjectRotation {
    const angles = CubeCoordsHelper.angles;
    const angle = angles.find(a => CubeCoordsHelper.isCoordsEqual(a(from), to));
    if (!angle) {
      throw new Error("Given coords are not adjanced");
    }
    return angles.indexOf(angle) as IBoardObjectRotation;
  }

  static areAdjanced(from: ICubeCoordinates, to: ICubeCoordinates): boolean {
    return CubeCoordsHelper.getCircleOfCoordinates(from, 1).some(c => CubeCoordsHelper.isCoordsEqual(c, to));
  }
 


  public static getAdjancedSides(
    from: ICubeCoordinates,
    to: ICubeCoordinates
  ): IBoardObjectRotation[] {
    const angles = CubeCoordsHelper.angles;
    return angles
      .filter(a => CubeCoordsHelper.isCoordsEqual(a(from), to))
      .map(a => angles.indexOf(a)) as IBoardObjectRotation[]
  }


  public static getAdjancedCoordsBySide(from: ICubeCoordinates, index: number): ICubeCoordinates {
    return CubeCoordsHelper.angles[index](from);
  }
}