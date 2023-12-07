import { IBoardCoordinates, IBoardObjectRotation, IVectorAndDistanceEntry } from "./board.interface";

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


  public static getConeOfCoordinates(from: IBoardCoordinates, side: IBoardObjectRotation, distance: number): IBoardCoordinates[] {
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


  public static getCircleOfCoordinates(cc: IBoardCoordinates, radius: number): IBoardCoordinates[] {
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


  public static getLineOfCoordinates(from: IBoardCoordinates, side: IBoardObjectRotation, distance: number): IBoardCoordinates[] {
    const method = CoordsHelper.angles[side];

    const coords = [];
    let prevCoords = from;
    while (distance > 0) {
      prevCoords = method(prevCoords) 
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
    const angleValidators = CoordsHelper.angles;
    return angleValidators
      .filter(a => CoordsHelper.isCoordsEqual(a(from), to))
      .map(a => angleValidators.indexOf(a)) as IBoardObjectRotation[]
  }


  public static getAdjancedCoordsBySide(from: IBoardCoordinates, index: number): IBoardCoordinates {
    return CoordsHelper.angles[index](from);
  }


  public static createVectorAndDistanceMap(
    from: IBoardCoordinates,
    occupiedCoords: IBoardCoordinates[],
    allCoords: IBoardCoordinates[],
  ): Map<string, IVectorAndDistanceEntry> {
    const vectorAndDistanceEntry: IVectorAndDistanceEntry = {
      coords: from,
      vector: 0,
      distanceToOrigin: 0,
      isOrigin: true
    }
    const map = new Map([[CoordsHelper.createKeyFromCoordinates(from), vectorAndDistanceEntry]]);
    this._collectVectorAndDistanceEntries([vectorAndDistanceEntry], occupiedCoords, allCoords, map);
    this._optimizeVectors(map);
    return map;
  }


  private static _optimizeVectors(vectorMap: Map<string, IVectorAndDistanceEntry>): void {
    for (let entry of vectorMap.values()) {
      const adjacentCoords = CoordsHelper.getCircleOfCoordinates(entry.coords, 1);
      let vectorTarget = vectorMap.get(
        CoordsHelper.createKeyFromCoordinates(
          CoordsHelper.getAdjancedCoordsBySide(entry.coords, entry.vector)));
      
      if (!vectorTarget) {
        continue;
      }
      
      for (let coords of adjacentCoords) {
        const adjancedEntry = vectorMap.get(CoordsHelper.createKeyFromCoordinates(coords));
        if (adjancedEntry?.distanceToOrigin < vectorTarget?.distanceToOrigin) {
          vectorTarget = adjancedEntry;
        }
      }
      entry.vector = CoordsHelper.getAdjancedSide(entry.coords, vectorTarget.coords);
    }
  }


  private static _collectVectorAndDistanceEntries(
    from: IVectorAndDistanceEntry[],
    occupiedCoords: IBoardCoordinates[],
    allCoords: IBoardCoordinates[],
    map: Map<string, IVectorAndDistanceEntry>,
  ): void {
    const tempMap: Map<string, IVectorAndDistanceEntry> = new Map();

    for (let fromEntry of from) {
      const adjacentCoordsToCreate = CoordsHelper.getCircleOfCoordinates(fromEntry.coords, 1)
        .filter(c => {
          return !occupiedCoords.find(oc => CoordsHelper.isCoordsEqual(c, oc)) &&
            !map.has(CoordsHelper.createKeyFromCoordinates(c)) &&
            allCoords.find(ac => CoordsHelper.isCoordsEqual(c, ac))
        });
      
      for (let coords of adjacentCoordsToCreate) {
        const entry = {
          coords: coords,
          vector: CoordsHelper.getAdjancedSide(coords, fromEntry.coords),
          distanceToOrigin: fromEntry.distanceToOrigin + 1
        }
        tempMap.set(CoordsHelper.createKeyFromCoordinates(entry.coords), entry);
      }
    }

    for (let tempEntry of tempMap) {
      map.set(tempEntry[0], tempEntry[1]);
    }

    if (from.length > 0) {
      this._collectVectorAndDistanceEntries(
        Array.from(tempMap.values()),
        occupiedCoords,
        allCoords,
        map,
      );
    }
  }



  public static findShortestPathBetweenCoordinates(
    from: IBoardCoordinates,
    to: IBoardCoordinates,
    vectorMap: Map<string, IVectorAndDistanceEntry>
  ): IVectorAndDistanceEntry[] {
    let entry = vectorMap.get(CoordsHelper.createKeyFromCoordinates(from));
    if (!entry) {
      return [];
    }

    if (CoordsHelper.isCoordsEqual(entry.coords, to)) {
      return [entry]
    }

    const adjanced = CoordsHelper.getAdjancedCoordsBySide(from, entry.vector);
    const nested = this.findShortestPathBetweenCoordinates(adjanced, to, vectorMap);
    return [entry, ...nested];
  }


  public static getClosestCoords(
    refCoords: IBoardCoordinates,
    possibleCoords: IBoardCoordinates[]
  ): IBoardCoordinates | undefined {
    let target = { distance: null, coords: null };

    for (let pc of possibleCoords) {
      const distance = CoordsHelper.getDistanceBetweenBoardCoordinates(refCoords, pc);
      if (target.distance === null || target.distance > distance) {
        target.distance = distance
        target.coords = pc;
      }
    }
    return target.coords;
  }

}